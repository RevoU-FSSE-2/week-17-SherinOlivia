import { Request, Response } from 'express';
import { DBLocal } from '../config/dbConnection';
import { errorHandling } from './errorHandling';
import { RowDataPacket } from 'mysql2';

const createNewOrder = async (req: Request, res: Response) => {
    try {
        const {role, id} = (req as any).user
        const { product_name, order_qty } =  req.body;
        if (role == "staff" || role == "admin") {
            const { custId, product_name, order_qty } =  req.body;
            const [newOrder] = await DBLocal.promise().query(`INSERT INTO w17.orders (custId, product_name, order_qty, total, status, order_datetime, isDeleted)
            VALUES (?, ?, ?, (SELECT price FROM w17.products WHERE name = ?) * ?, ?, ?, ?)`,
            [custId, product_name, order_qty, product_name, order_qty, 'pending', new Date(), '0']) as RowDataPacket[];
            
            const [createdOrder] = await DBLocal.promise().query(`SELECT * FROM w17.orders WHERE id = ?`,
            [newOrder.insertId]) as RowDataPacket[];
            
            return res.status(200).json(errorHandling(createdOrder[0], null));
        } else {
            const [newOrder] = await DBLocal.promise().query(`INSERT INTO w17.orders (custId, product_name, order_qty, total, status, order_datetime, isDeleted)
            VALUES (?, ?, ?, (SELECT price FROM w17.products WHERE name = ?) * ?, ?, ?, ?)`,
            [id, product_name, order_qty, product_name, order_qty, 'pending', new Date(), '0']) as RowDataPacket[];
            
           const [createdOrder] = await DBLocal.promise().query(`SELECT * FROM w17.orders WHERE id = ?`,
            [newOrder.insertId]) as RowDataPacket[];
            
            return res.status(200).json(errorHandling(createdOrder[0], null));
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json(errorHandling(null, "Order Request Failed..!! Internal Error!"));
    }
}

const updateOrderStatus = async (req: Request, res: Response) => {
    const id = req.params.orderId
    const {status} = req.body

    try {
        const getOrder = await DBLocal.promise().query(`SELECT * FROM w17.orders WHERE id = ? AND isDeleted = ?`,
        [id, '0']) as RowDataPacket[]

        if (getOrder[0].length > 0) {
            if (getOrder[0][0].status === "cancelled") {
                return res.status(400).json(errorHandling(null, "Order already cancelled...! Please make new Order!"));
            return

            } else {
                await DBLocal.promise().query(`UPDATE w17.orders SET status = ? WHERE id = ?`,
                [status, id])
    
                const updatedOrder = await DBLocal.promise().query(`SELECT * FROM w17.orders WHERE id = ?`,
                [id]) as RowDataPacket[]
                return res.status(200).json(errorHandling(updatedOrder[0][0], null)); 
            }
        } else {
            return res.status(400).json(errorHandling(null, "Order doesn't exist...!!"));
        }
    } catch (error) {
        console.error(error)
        return res.status(500).json(errorHandling(null, "Order Status Update Failed..!! Internal Error!"));
    }
}

// get all orders (cust can only see their own)
const getAllOrders = async (req: Request, res: Response) => {
    try {

        const { role, id } = (req as any).user;
        if (role === "cust") {
            const getOrders = await DBLocal.promise().query(`
                SELECT o.id, o.status, o.custId, u.name, u.address, o.product_name, o.order_qty, o.total, o.order_datetime FROM  w17.orders as o LEFT JOIN w17.users as u ON o.custId = u.id
                WHERE o.CustId = ? AND o.isDeleted = ?`,[id, '0']) as RowDataPacket[];

            if (getOrders[0].length > 0) {
                return res.status(200).json(errorHandling({
                    message: "Order data retrieved Successfully",
                    data: getOrders[0]}, null));
            } else {
                return res.status(400).json(errorHandling(null, "Order doesn't exist...!!"));
            }

        } else if (role == "staff" || role == "admin") {
            const getOrders = await DBLocal.promise().query(`
            SELECT o.id, o.status, o.custId, u.name, u.address, o.product_name, o.order_qty, o.total, o.order_datetime FROM  w17.orders as o LEFT JOIN w17.users as u ON o.custId = u.id WHERE o.isDeleted = ?`, ['0']) as RowDataPacket[];

            if (getOrders[0].length > 0) {
                res.status(200).json(errorHandling({
                    message: "Order data retrieved Successfully",
                    data: getOrders[0]}, null));
            } else {
                return res.status(400).json(errorHandling(null, "Order doesn't exist...!!"));
            }
        } else {
            return res.status(400).json(errorHandling(null, "Unauthorized Access...!! Contact Staff!"));
        }

    } catch (error) {
        console.error(error)
        return res.status(500).json(errorHandling(null, "Failed to retreive order data..!! Internal Error!"));
    }
}

// get orders by cust id ===> staff & admin only!!
const getAllCustOrders = async (req: Request, res: Response) => {
    try {
        const userId = req.params.custId
        const getCustOrders = await DBLocal.promise().query(`
        SELECT o.id, o.status, o.custId, u.name, u.address, o.product_name, o.order_qty, o.total, o.order_datetime FROM w17.orders as o LEFT JOIN w17.users as u ON o.custId = u.id
        WHERE o.CustId = ? AND isDeleted = ?`,[userId, '0']) as RowDataPacket[];

        return res.status(200).json(errorHandling({
            message: "Cust orders retrieved Successfully",
            data: getCustOrders[0]}, null));
    } catch (error) {
        console.error(error)
        return res.status(500).json(errorHandling(null, "Failed to retreive cust orders..!! Internal Error!"));
    }
}

// soft delete order

const deleteOrder = async (req: Request, res: Response) => {
    try {
        const orderId = req.params.orderId
        const {id, role} = (req as any).user
        const checkOrder = await DBLocal.promise().query(`
        SELECT o.id, o.status, o.custId, u.name, u.address, o.product_name, o.order_qty, o.total, o.order_datetime FROM w17.orders as o LEFT JOIN w17.users as u ON o.custId = u.id
        WHERE o.id = ?`, [orderId]) as RowDataPacket[];

        if (role == "cust") {
            if (checkOrder[0].length > 0 && checkOrder[0][0].custId == id) {

                await DBLocal.promise().query(
                    `UPDATE w17.orders SET isDeleted = ? WHERE w17.orders.id = ? AND w17.orders.custId = ?`,
                    ['1', orderId, id]);
                
                return res.status(200).json(errorHandling("Order data Successfully deleted", null));
    
            } else {
                return res.status(400).json(errorHandling(null, "No Order Found..!!"));
            }
        } else {
            if (checkOrder[0].length > 0) {
                await DBLocal.promise().query(
                    `UPDATE w17.orders SET isDeleted = ? WHERE w17.orders.id = ? AND w17.orders.custId = ?`,
                    ['1', orderId, id]);
                
                return res.status(200).json(errorHandling("Order data Successfully deleted", null));
    
            } else {
                return res.status(400).json(errorHandling(null, "No Order Found..!!"));
            }
        } 
    } catch (error) {
        console.error(error)
        return res.status(500).json(errorHandling(null, "Failed to remove order..!! Internal Error!"));
    }
}

// get order history ==> admin
const getOrderHistory = async (req: Request, res: Response) => {
    try {
        const [orderHistory] = await DBLocal.promise().query(`
        SELECT o.id, o.status, o.custId, u.name, u.address, o.product_name, 
        o.order_qty, o.total, o.order_datetime FROM w17.orders as o 
        LEFT JOIN w17.users as u ON o.custId = u.id`) as RowDataPacket[];

        return res.status(200).json(errorHandling(orderHistory, null));
    } catch (error) {
        console.error(error)
        return res.status(500).json(errorHandling(null, "Failed to retreive orders history...!! Internal Error!"));
    }
}

//  get order status

// const getOrderStatus = async (req: Request, res: Response) => {
//     try {
//         const {role, id} = (req as any).user
//         const {status} = req.body     
//         console.log(role, "getorderstatusrolee")
//         if (role !== "staff" && role !== "admin") {
//             if (status === "") {
//                 const getPendingOrder = await DB.promise().query(`SELECT * FROM railway.orders WHERE railway.orders.custId = ? AND status = ?`, [id, "pending"]) as RowDataPacket[];
//                 console.log(getPendingOrder)
//                res.status(200).json(errorHandling(getPendingOrder[0][0], null));
           
//             } else if (status === "completed") {
//                 const getCompletedOrder = await DB.promise().query(`SELECT * FROM railway.orders WHERE railway.orders.custId = ? AND railway.orders.status = ?`, [id, "completed"]) as RowDataPacket[];
//                  console.log(getCompletedOrder)
//                 res.status(200).json(errorHandling(getCompletedOrder[0][0], null));
            
//             } else if (status === "cancelled") {
//                 const getCancelledOrder = await DB.promise().query(`SELECT * FROM railway.orders WHERE railway.orders.custId = ? AND railway.orders.status = ?`, [id, "cancelled"]) as RowDataPacket[];
                
//                 res.status(200).json(errorHandling(getCancelledOrder[0][0], null));
//             } else {
//                 res.status(400).json(errorHandling(null, "All orders still pending...!!"));
//                 return
//             } 
//         } else {
//             if (status === "completed") {
//                 const getCompletedOrder = await DB.promise().query(`SELECT * FROM railway.orders WHERE railway.orders.status = ?`, ["completed"]) as RowDataPacket[];
//                 console.log(getCompletedOrder)
//                 res.status(200).json(errorHandling(getCompletedOrder, null));
//             } else if (status === "cancelled") {
//                 const getCancelledOrder = await DB.promise().query(`SELECT * FROM railway.orders WHERE railway.orders.status = ?`, ["cancelled"]) as RowDataPacket[];
                
//                 res.status(200).json(errorHandling(getCancelledOrder, null));
//             } else {
//                 res.status(400).json(errorHandling(null, "All orders still pending...!!"));
//                 return
//             } 
//         }

//     } catch (error) {
//         console.error(error)
//         res.status(500).json(errorHandling(null, "Failed to retreive cust orders...!! Internal Error!"));
//     }
// }


export { createNewOrder, updateOrderStatus, getAllOrders, getAllCustOrders, deleteOrder, getOrderHistory }

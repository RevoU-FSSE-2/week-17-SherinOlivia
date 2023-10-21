"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOrderHistory = exports.deleteOrder = exports.getAllCustOrders = exports.getAllOrders = exports.updateOrderStatus = exports.createNewOrder = void 0;
const dbConnection_1 = require("../config/dbConnection");
const errorHandling_1 = require("./errorHandling");
const createNewOrder = async (req, res) => {
    try {
        const { role, id } = req.user;
        const { product_name, order_qty } = req.body;
        if (role == "staff" || role == "admin") {
            const { custId, product_name, order_qty } = req.body;
            const [newOrder] = await dbConnection_1.DB.promise().query(`INSERT INTO railway.orders (custId, product_name, order_qty, total, status, order_datetime, isDeleted)
            VALUES (?, ?, ?, (SELECT price FROM railway.products WHERE name = ?) * ?, ?, ?, ?)`, [custId, product_name, order_qty, product_name, order_qty, 'pending', new Date(), '0']);
            const [createdOrder] = await dbConnection_1.DB.promise().query(`SELECT * FROM railway.orders WHERE id = ?`, [newOrder.insertId]);
            return res.status(200).json((0, errorHandling_1.errorHandling)(createdOrder[0], null));
        }
        else {
            const [newOrder] = await dbConnection_1.DB.promise().query(`INSERT INTO railway.orders (custId, product_name, order_qty, total, status, order_datetime, isDeleted)
            VALUES (?, ?, ?, (SELECT price FROM railway.products WHERE name = ?) * ?, ?, ?, ?)`, [id, product_name, order_qty, product_name, order_qty, 'pending', new Date(), '0']);
            const [createdOrder] = await dbConnection_1.DB.promise().query(`SELECT * FROM railway.orders WHERE id = ?`, [newOrder.insertId]);
            return res.status(200).json((0, errorHandling_1.errorHandling)(createdOrder[0], null));
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, "Order Request Failed..!! Internal Error!"));
    }
};
exports.createNewOrder = createNewOrder;
const updateOrderStatus = async (req, res) => {
    const id = req.params.orderId;
    const { status } = req.body;
    try {
        const getOrder = await dbConnection_1.DB.promise().query(`SELECT * FROM railway.orders WHERE id = ? AND isDeleted = ?`, [id, '0']);
        if (getOrder[0].length > 0) {
            if (getOrder[0][0].status === "cancelled") {
                return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Order already cancelled...! Please make new Order!"));
                return;
            }
            else {
                await dbConnection_1.DB.promise().query(`UPDATE railway.orders SET status = ? WHERE id = ?`, [status, id]);
                const updatedOrder = await dbConnection_1.DB.promise().query(`SELECT * FROM railway.orders WHERE id = ?`, [id]);
                return res.status(200).json((0, errorHandling_1.errorHandling)(updatedOrder[0][0], null));
            }
        }
        else {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Order doesn't exist...!!"));
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, "Order Status Update Failed..!! Internal Error!"));
    }
};
exports.updateOrderStatus = updateOrderStatus;
// get all orders (cust can only see their own)
const getAllOrders = async (req, res) => {
    try {
        const { role, id } = req.user;
        if (role === "cust") {
            const getOrders = await dbConnection_1.DB.promise().query(`
                SELECT o.id, o.status, o.custId, u.name, u.address, o.product_name, o.order_qty, o.total, o.order_datetime FROM  railway.orders as o LEFT JOIN railway.users as u ON o.custId = u.id
                WHERE o.CustId = ? AND o.isDeleted = ?`, [id, '0']);
            if (getOrders[0].length > 0) {
                return res.status(200).json((0, errorHandling_1.errorHandling)({
                    message: "Order data retrieved Successfully",
                    data: getOrders[0]
                }, null));
            }
            else {
                return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Order doesn't exist...!!"));
            }
        }
        else if (role == "staff" || role == "admin") {
            const getOrders = await dbConnection_1.DB.promise().query(`
            SELECT o.id, o.status, o.custId, u.name, u.address, o.product_name, o.order_qty, o.total, o.order_datetime FROM  railway.orders as o LEFT JOIN railway.users as u ON o.custId = u.id WHERE o.isDeleted = ?`, ['0']);
            if (getOrders[0].length > 0) {
                res.status(200).json((0, errorHandling_1.errorHandling)({
                    message: "Order data retrieved Successfully",
                    data: getOrders[0]
                }, null));
            }
            else {
                return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Order doesn't exist...!!"));
            }
        }
        else {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Unauthorized Access...!! Contact Staff!"));
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, "Failed to retreive order data..!! Internal Error!"));
    }
};
exports.getAllOrders = getAllOrders;
// get orders by cust id ===> staff & admin only!!
const getAllCustOrders = async (req, res) => {
    try {
        const userId = req.params.custId;
        const getCustOrders = await dbConnection_1.DB.promise().query(`
        SELECT o.id, o.status, o.custId, u.name, u.address, o.product_name, o.order_qty, o.total, o.order_datetime FROM railway.orders as o LEFT JOIN railway.users as u ON o.custId = u.id
        WHERE o.CustId = ? AND isDeleted = ?`, [userId, '0']);
        return res.status(200).json((0, errorHandling_1.errorHandling)({
            message: "Cust orders retrieved Successfully",
            data: getCustOrders[0]
        }, null));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, "Failed to retreive cust orders..!! Internal Error!"));
    }
};
exports.getAllCustOrders = getAllCustOrders;
// soft delete order
const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.orderId;
        const { id, role } = req.user;
        const checkOrder = await dbConnection_1.DB.promise().query(`
        SELECT o.id, o.status, o.custId, u.name, u.address, o.product_name, o.order_qty, o.total, o.order_datetime FROM railway.orders as o LEFT JOIN railway.users as u ON o.custId = u.id
        WHERE o.id = ?`, [orderId]);
        if (role == "cust") {
            if (checkOrder[0].length > 0 && checkOrder[0][0].custId == id) {
                await dbConnection_1.DB.promise().query(`UPDATE railway.orders SET isDeleted = ? WHERE railway.orders.id = ? AND railway.orders.custId = ?`, ['1', orderId, id]);
                return res.status(200).json((0, errorHandling_1.errorHandling)("Order data Successfully deleted", null));
            }
            else {
                return res.status(400).json((0, errorHandling_1.errorHandling)(null, "No Order Found..!!"));
            }
        }
        else {
            if (checkOrder[0].length > 0) {
                await dbConnection_1.DB.promise().query(`UPDATE railway.orders SET isDeleted = ? WHERE railway.orders.id = ? AND railway.orders.custId = ?`, ['1', orderId, id]);
                return res.status(200).json((0, errorHandling_1.errorHandling)("Order data Successfully deleted", null));
            }
            else {
                return res.status(400).json((0, errorHandling_1.errorHandling)(null, "No Order Found..!!"));
            }
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, "Failed to remove order..!! Internal Error!"));
    }
};
exports.deleteOrder = deleteOrder;
const getOrderHistory = async (req, res) => {
    try {
        const [orderHistory] = await dbConnection_1.DB.promise().query(`
        SELECT o.id, o.status, o.custId, u.name, u.address, o.product_name, 
        o.order_qty, o.total, o.order_datetime FROM railway.orders as o 
        LEFT JOIN railway.users as u ON o.custId = u.id`);
        return res.status(200).json((0, errorHandling_1.errorHandling)(orderHistory, null));
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, "Failed to retreive orders history...!! Internal Error!"));
    }
};
exports.getOrderHistory = getOrderHistory;

import express from 'express'
const orderrouter = express.Router()
import { createNewOrder, updateOrderStatus, getAllOrders, getAllCustOrders, deleteOrder, getOrderHistory } from '../controller/ordersController';
import authorMiddleware from '../middleware/authorizationMiddleware'

orderrouter.post('/new', createNewOrder);
orderrouter.patch('/update/:orderId', authorMiddleware(['staff','admin']), updateOrderStatus);
orderrouter.delete('/delete/:orderId', deleteOrder);
orderrouter.get('/history', authorMiddleware(['admin']), getOrderHistory);
orderrouter.get('/:custId', authorMiddleware(['staff','admin']), getAllCustOrders);
orderrouter.get('/', getAllOrders);

export default orderrouter
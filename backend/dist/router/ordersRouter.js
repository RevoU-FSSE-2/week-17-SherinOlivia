"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const orderrouter = express_1.default.Router();
const ordersController_1 = require("../controller/ordersController");
const authorizationMiddleware_1 = __importDefault(require("../middleware/authorizationMiddleware"));
orderrouter.post('/new', ordersController_1.createNewOrder);
orderrouter.patch('/update/:orderId', (0, authorizationMiddleware_1.default)(['staff', 'admin']), ordersController_1.updateOrderStatus);
orderrouter.delete('/delete/:orderId', ordersController_1.deleteOrder);
orderrouter.get('/history', (0, authorizationMiddleware_1.default)(['admin']), ordersController_1.getOrderHistory);
orderrouter.get('/:custId', (0, authorizationMiddleware_1.default)(['staff', 'admin']), ordersController_1.getAllCustOrders);
orderrouter.get('/', ordersController_1.getAllOrders);
exports.default = orderrouter;

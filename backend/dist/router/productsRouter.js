"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const productrouter = express_1.default.Router();
const productsController_1 = require("../controller/productsController");
const authenticationMiddleware_1 = __importDefault(require("../middleware/authenticationMiddleware"));
const authorizationMiddleware_1 = __importDefault(require("../middleware/authorizationMiddleware"));
productrouter.post('/new', authenticationMiddleware_1.default, (0, authorizationMiddleware_1.default)(['staff', 'admin']), productsController_1.createNewProduct);
productrouter.patch('/update/:id', authenticationMiddleware_1.default, (0, authorizationMiddleware_1.default)(['staff', 'admin']), productsController_1.updateProduct);
productrouter.get('/:id', productsController_1.getOneProductId);
productrouter.get('/', productsController_1.getAllProduct);
exports.default = productrouter;

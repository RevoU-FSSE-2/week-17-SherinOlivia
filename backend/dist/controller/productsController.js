"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOneProductId = exports.getAllProduct = exports.updateProduct = exports.createNewProduct = void 0;
const dbConnection_1 = require("../config/dbConnection");
const errorHandling_1 = require("./errorHandling");
const createNewProduct = async (req, res) => {
    try {
        const { name, qty, price } = req.body;
        const [existingProduct] = await dbConnection_1.DB.promise().query(`SELECT * FROM railway.products WHERE name = ?`, [name]);
        if (existingProduct.length === 0) {
            await dbConnection_1.DB.promise().query(`INSERT INTO railway.products (name, qty, price) VALUES (?, ?, ?)`, [name, qty, price]);
            const [newProduct] = await dbConnection_1.DB.promise().query(`SELECT * FROM railway.products WHERE name = ?`, [name]);
            return res.status(200).json((0, errorHandling_1.errorHandling)(newProduct, null));
        }
        else {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Product already exist...!!"));
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, "Can't create new product...!! Internal Error!"));
    }
};
exports.createNewProduct = createNewProduct;
// Update Qty & Price
const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const { qty, price } = req.body;
        const [existingProduct] = await dbConnection_1.DB.promise().query(`SELECT * FROM railway.products WHERE id = ?`, [id]);
        if (existingProduct.length === 0) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Product doesn't exist...!!"));
        }
        else {
            await dbConnection_1.DB.promise().query(`UPDATE railway.products SET qty = ?, price = ? WHERE id = ?`, [qty, price, id]);
            const updatedProduct = await dbConnection_1.DB.promise().query(`SELECT * FROM railway.products WHERE id = ?`, [id]);
            return res.status(200).json((0, errorHandling_1.errorHandling)(updatedProduct[0][0], null));
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, "Can't Update Product...!! Internal Error!"));
    }
};
exports.updateProduct = updateProduct;
//  get all Product Data
const getAllProduct = async (req, res) => {
    try {
        const getAllProduct = await dbConnection_1.DB.promise().query(`SELECT * FROM railway.products`);
        if (getAllProduct.length === 0) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Product doesn't exist...!!"));
        }
        else {
            return res.status(200).json((0, errorHandling_1.errorHandling)(getAllProduct[0], null));
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, "Can't Get All Product Data...!! Internal Error!"));
    }
};
exports.getAllProduct = getAllProduct;
// get product by id
const getOneProductId = async (req, res) => {
    try {
        const id = req.params.id;
        const [getOneProduct] = await dbConnection_1.DB.promise().query(`SELECT * FROM railway.products WHERE id = ?`, [id]);
        if (getOneProduct.length === 0) {
            return res.status(400).json((0, errorHandling_1.errorHandling)(null, "Product doesn't exist...!!"));
        }
        else {
            return res.status(200).json((0, errorHandling_1.errorHandling)(getOneProduct[0], null));
        }
    }
    catch (error) {
        console.error(error);
        return res.status(500).json((0, errorHandling_1.errorHandling)(null, "Can't Get Product Data...!! Internal Error!"));
    }
};
exports.getOneProductId = getOneProductId;

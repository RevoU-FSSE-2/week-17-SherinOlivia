import express from 'express'
const productrouter = express.Router()
import {createNewProduct, updateProduct, getAllProduct, getOneProductId } from '../controller/productsController';
import authenMiddleware from '../middleware/authenticationMiddleware'
import authorMiddleware from '../middleware/authorizationMiddleware'

productrouter.post('/new',authenMiddleware, authorMiddleware(['staff','admin']), createNewProduct);
productrouter.patch('/update/:id',authenMiddleware, authorMiddleware(['staff','admin']), updateProduct);
productrouter.get('/:id', getOneProductId);
productrouter.get('/', getAllProduct);

export default productrouter
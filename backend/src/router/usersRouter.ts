import express from 'express'
const userrouter = express.Router()
import authenMiddleware from '../middleware/authenticationMiddleware'
import authorMiddleware from '../middleware/authorizationMiddleware'
import { registerUser, loginUser, getAllUser, getAllCust, updateUser, logoutUser, resetPasswordRequest, resetPassword, userProfile, getOneUser, registerUserByAdmin, refreshTokenRequest } from '../controller/usersController';

userrouter.post('/register', registerUser);
userrouter.post('/admin/register', authenMiddleware, authorMiddleware(['admin']), registerUserByAdmin);
userrouter.post('/login', loginUser);
userrouter.post('/refresh', authenMiddleware, refreshTokenRequest);
userrouter.post('/logout', logoutUser);
userrouter.post('/resetpassword/request', resetPasswordRequest)
userrouter.post('/resetpassword', resetPassword)
userrouter.get('/cust', authenMiddleware, authorMiddleware(['staff','admin']), getAllCust);
userrouter.get('/profile/:id', authenMiddleware, authorMiddleware(['cust','staff','admin']), getOneUser);
userrouter.get('/profile', authenMiddleware, authorMiddleware(['cust','staff','admin']), userProfile);
userrouter.patch('/update/:id', authenMiddleware, authorMiddleware(['cust','staff','admin']), updateUser);
userrouter.get('/', authenMiddleware, authorMiddleware(['admin']), getAllUser);

export default userrouter
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
// import 'dotenv/config'
const dbConnection_1 = require("./dbConnection");
const insertAdmin = async (req, res) => {
    try {
        const [adminCheck] = await dbConnection_1.DB.promise().query(`SELECT * FROM railway.users WHERE role = 'admin'`);
        if (Object.keys(adminCheck).length === 0) {
            const adminUsername = process.env.ADMIN_USERNAME || "adminRoo";
            const adminEmail = process.env.ADMIN_EMAIL || "adminr00@gmail.com";
            const adminPass = process.env.ADMIN_PASS || "R00isADMIN";
            const hashedPass = await bcrypt_1.default.hash(adminPass, 10);
            await dbConnection_1.DB.promise().query(`INSERT INTO railway.users (username, email, password, role) VALUES ('${adminUsername}','${adminEmail}', '${hashedPass}', 'admin')`);
            console.log("Admin Account successfully created! Welcome!");
        }
        else {
            console.log("Reminder: Admin already exists");
            return;
        }
    }
    catch (error) {
        console.error("Errorr!! Can't input Admin data", error);
    }
};
exports.default = insertAdmin;

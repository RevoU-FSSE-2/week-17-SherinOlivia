"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DB = void 0;
// import * as mysql from 'mysql2'
const mysql = require("mysql2");
const dbConfig_1 = require("./dbConfig");
// import 'dotenv/config'
// railway
exports.DB = mysql.createConnection({
    host: dbConfig_1.DBConfig.HOST,
    user: dbConfig_1.DBConfig.USER,
    password: dbConfig_1.DBConfig.PASSWORD,
    database: dbConfig_1.DBConfig.DATABASE,
    port: +dbConfig_1.DBConfig.PORT
});
// local
// export const DBLocal = mysql.createConnection({
//     host: DBConfigLocal.HOST,
//     user: DBConfigLocal.USER,
//     password: DBConfigLocal.PASSWORD,
//     database: DBConfigLocal.DATABASE,
// })

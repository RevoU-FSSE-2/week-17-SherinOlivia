"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.week_17_sherinolivia = void 0;
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const dbConnection_1 = require("./config/dbConnection");
const adminConfig_1 = __importDefault(require("./config/adminConfig"));
const mainRouter_1 = __importDefault(require("./router/mainRouter"));
const middleware_1 = __importDefault(require("./middleware"));
const functions = __importStar(require("firebase-functions"));
const app = (0, express_1.default)();
const port = process.env.PORT;
// middleware
(0, middleware_1.default)(app);
// DB Connection (Railway)
// DB.connect( function () {
//     if (DB) {
//         console.log("Railway Connection Succeed");
//     } else {
//         console.log("Railway Connection Failed");
//     }
// }),
// DB Connection (Local)
dbConnection_1.DBLocal.connect(function () {
    if (dbConnection_1.DBLocal) {
        console.log("Localhost Connection Succeed");
    }
    else {
        console.log("Localhost Connection Failed");
    }
});
// insert Super User / Admin account to Database.. (One time Use)
(0, adminConfig_1.default)();
// router
app.use(mainRouter_1.default);
app.listen(port, () => {
    console.log(`Server is running on port:${port}`);
});
exports.week_17_sherinolivia = functions.https.onRequest(app);

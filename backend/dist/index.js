"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
// import 'dotenv/config';
const dbConnection_1 = require("./config/dbConnection");
const adminConfig_1 = __importDefault(require("./config/adminConfig"));
const mainRouter_1 = __importDefault(require("./router/mainRouter"));
const middleware_1 = __importDefault(require("./middleware"));
// import * as functions from 'firebase-functions';
const http_1 = __importDefault(require("http"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
let port;
// middleware
(0, middleware_1.default)(app);
// DB Connection (Railway)
dbConnection_1.DB.connect(function () {
    if (dbConnection_1.DB) {
        console.log("Railway Connection Succeed");
    }
    else {
        console.log("Railway Connection Failed");
    }
}),
    // DB Connection (Local)
    // DBLocal.connect( function () {
    //     if (DBLocal) {
    //         console.log("Localhost Connection Succeed");
    //     } else {
    //         console.log("Localhost Connection Failed");
    //     }
    // })
    // insert Super User / Admin account to Database.. (One time Use)
    (0, adminConfig_1.default)();
// router
app.use(mainRouter_1.default);
server.listen(0, () => {
    const address = server.address();
    if (address && typeof address !== 'string') {
        port = address.port || 5555;
        console.log(`Server is running on port:${port}`);
    }
    else {
        console.error("Server address is not available.");
    }
});
// export const week_17_sherinolivia = functions.https.onRequest(app)

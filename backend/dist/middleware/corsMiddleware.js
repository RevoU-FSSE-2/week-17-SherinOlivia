"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const XOrigin = [
    "http://localhost:5173",
];
const YOrigin = [
    "Y",
];
const corsOptionsDelegate = (req, callback) => {
    const clientXOrigin = XOrigin.includes(req.header("Origin"));
    const clientYOrigin = YOrigin.includes(req.header("Origin"));
    if (clientXOrigin) {
        callback(null, {
            origin: true,
            methods: "GET, POST, PUT, PATCH, DELETE",
        });
    }
    else if (clientYOrigin) {
        callback(null, {
            origin: true,
            methods: "GET, POST",
        });
    }
    else {
        callback(new Error("CORS Unauthorized Access..!"));
    }
};
const corsMiddleware = (app) => {
    app.use((0, cors_1.default)(corsOptionsDelegate));
};
exports.default = corsMiddleware;

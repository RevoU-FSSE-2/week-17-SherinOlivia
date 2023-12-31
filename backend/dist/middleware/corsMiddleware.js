"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const XOrigin = [
    "http://localhost:5173", "https://week-17-sherinolivia.web.app", "https://w17sh-fe.roozone.site", "https://w17sh-frontend-img-cifhetjmdq-uw.a.run.app"
];
const YOrigin = [
    "https://week-17-sherinolivia.firebaseapp.com"
];
const corsOptionsDelegate = (req, callback) => {
    const clientXOrigin = XOrigin.includes(req.header("Origin"));
    const clientYOrigin = YOrigin.includes(req.header("Origin"));
    const requestOrigin = req.header("Origin");
    console.log("Request Origin: ", requestOrigin);
    try {
        if (clientXOrigin) {
            callback(null, {
                origin: true,
                methods: "GET, POST, PUT, PATCH, DELETE",
                credentials: true,
            });
        }
        else if (clientYOrigin) {
            callback(null, {
                origin: true,
                methods: "GET, POST",
                credentials: true,
            });
        }
        else {
            callback(new Error("CORS Unauthorized Access..!"));
        }
    }
    catch (error) {
        console.error("Error..:", error);
    }
};
const corsMiddleware = (app) => {
    app.use((0, cors_1.default)(corsOptionsDelegate));
};
exports.default = corsMiddleware;

import cors, { CorsOptions } from "cors";
import { Application, Request } from "express";

const XOrigin = [
  "http://localhost:5173",
];
const YOrigin = [
  "Y",
];

const corsOptionsDelegate = (req: any, 
    callback: (err: Error | null, options?: CorsOptions) => void) => {
  const clientXOrigin = XOrigin.includes(req.header("Origin"));
  const clientYOrigin = YOrigin.includes(req.header("Origin"));

  if (clientXOrigin) {
    callback(null, {
      origin: true,
      methods: "GET, POST, PUT, PATCH, DELETE",
      credentials: true,
    });
  } else if (clientYOrigin) {
    callback(null, {
      origin: true,
      methods: "GET, POST",
      credentials: true,
    });
  } else {
    callback(new Error("CORS Unauthorized Access..!"));
  }
};

const corsMiddleware = (app: Application) => {
  app.use(cors(corsOptionsDelegate));
};

export default corsMiddleware;
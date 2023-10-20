import cors, { CorsOptions } from "cors";
import { Application, Request } from "express";

const XOrigin = [
  "http://localhost:5173","http://localhost:5555","https://week-17-sherinolivia.web.app"
];
const YOrigin = [
  "http://localhost:5555","https://week-17-sherinolivia.firebaseapp.com/",
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
    console.error("Error..:", Error)
  }
};

const corsMiddleware = (app: Application) => {
  app.use(cors(corsOptionsDelegate));
};

export default corsMiddleware;
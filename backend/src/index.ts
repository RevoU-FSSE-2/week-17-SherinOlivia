import express, {Express} from 'express';
// import 'dotenv/config';
import { DB } from './config/dbConnection';
import insertAdmin from './config/adminConfig';
import router from './router/mainRouter';
import appMiddleware from './middleware';
// import * as functions from 'firebase-functions';
import http, { Server } from 'http'

const app: Express = express()
const server: Server = http.createServer(app)
let port: number;

// middleware
appMiddleware(app)

// DB Connection (Railway)
DB.connect( function () {
    if (DB) {
        console.log("Railway Connection Succeed");
    } else {
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
insertAdmin();

// router
app.use(router)


server.listen(0, () => {
    const address = server.address();
    if(address && typeof address !== 'string'){
        port = address.port || 5555;
        console.log(`Server is running on port:${port}`)
    } else {
        console.error("Server address is not available.")
    }
})

// export const week_17_sherinolivia = functions.https.onRequest(app)

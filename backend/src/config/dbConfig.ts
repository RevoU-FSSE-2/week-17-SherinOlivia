
// railway
export const DBConfig = {
    URL: process.env.SQL_URL || "mysql://root:NrFLilwZNHuFhD4lTWen@containers-us-west-48.railway.app:5612/railway",
    HOST: process.env.SQL_HOST || "containers-us-west-48.railway.app",
    USER: process.env.SQL_USERNAME || "root",
    PASSWORD: process.env.SQL_PASSWORD || "NrFLilwZNHuFhD4lTWen",
    DATABASE: process.env.SQL_DATABASE || "railway",
    PORT: process.env.SQL_PORT || 5612
}


// local
// export const DBConfigLocal = {
//     HOST: process.env.SQL_HOSTLOCAL,
//     USER: process.env.SQL_USERNAMELOCAL,
//     PASSWORD: process.env.SQL_PASSWORDLOCAL,
//     DATABASE: process.env.SQL_DATABASELOCAL,
// }

import express from "express";
import colors from "colors";
import SwaggerUi from "swagger-ui-express";
import swaggerSpec, { swaggerUiOptions } from "./config/swagger";
import router from "./router";
import db from "./config/db";

//Conectar a la base de datos
export async function connectDB() {
    try {
        await db.authenticate();
        db.sync();
    } catch (error) {
        console.log(error)
        console.log(colors.red("Hubo un error al conectar a la BD"));
    }
}
connectDB();

//Instancia de express
const server = express();

//Leer datos de formularios
server.use(express.json());

server.use('/api/products', router);

//Docs
server.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;
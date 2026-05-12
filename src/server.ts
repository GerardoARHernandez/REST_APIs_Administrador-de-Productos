import express from "express";
import colors from "colors";
import cors, { CorsOptions } from 'cors';
import morgan from "morgan";
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

//Permitir conexiones
const corsOptions : CorsOptions = {
    origin: function(origin, callback){
        if (origin === process.env.FRONTEND_URL, process.env.API_URL) {
            callback(null, true)
        }else{
            callback(new Error('Error de CORS'))
        }
    }
}

server.use(cors(corsOptions));

//Leer datos de formularios
server.use(express.json());

server.use(morgan('dev'))
server.use('/api/products', router);

//Docs
server.use("/docs", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec, swaggerUiOptions));

export default server;
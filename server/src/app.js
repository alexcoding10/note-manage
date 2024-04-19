import express from "express";
import cors from "cors";
import morgan from "morgan";
import router from './routes/router.js';
const app = express();

//Middleware
app.use(morgan("dev"));
app.use(cors());
app.use(express.json());


// Rutas
app.use('/', router);


export default app;

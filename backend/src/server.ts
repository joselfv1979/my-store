import * as dotenv from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import helmet from 'helmet';
import morgan from "morgan";
import usersRouter from "./routes/userRoutes"; // variables que almacenan los módulos de los endpoint enrutados
import productRouter from "./routes/productRoutes";
import { errorHandler } from "./middlewares/errorHandler";
import * as MySQLConnector from "./utils/database";

dotenv.config();

const app = express();

// create database pool
//MySQLConnector.init();

app.use(morgan("dev"));
// adding set of security middlewares
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// parse incoming request body and append data to `req.body`
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// enable all CORS request 
app.use(cors());

// Serve static files
// app.use(
//    // process.env.PUBLIC_PATH as string,
//    './../public/images',
//     express.static(path.join(__dirname, process.env.UPLOADS_DIR as string))
// );
app.use("/static/images", express.static(path.join(__dirname, "..", "public", "images")));

// Routes
app.use('/users', usersRouter);  
app.use('/products', productRouter);

// Error handler middleware
app.use(errorHandler);

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
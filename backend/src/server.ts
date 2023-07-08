import { config } from "dotenv";
import express from "express";
import cors from "cors";
import path from "path";
import helmet from 'helmet';
import morgan from "morgan";
import usersRouter from "./routes/userRoutes"; // variables que almacenan los módulos de los endpoint enrutados
import productRouter from "./routes/productRoutes";
import { errorHandler } from "./middlewares/errorHandler";

config();

const app = express();

// adding morgan to log HTTP requests
app.use(morgan("dev"));

// adding set of security middlewares
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));

// parse incoming request body and append data to `req.body`
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// enable all CORS request 
app.use(cors());

const publicPath = process.env.PUBLIC_PATH;
const uploadDir = process.env.UPLOADS_DIR;

// Serve static files
app.use(`/${publicPath}`, express.static(path.join(__dirname, `../${uploadDir}`)));

// Routes
app.use('/users', usersRouter);  
app.use('/products', productRouter);

// Error handler middleware
app.use(errorHandler);

const port = process.env.PORT || 8000;

// start the server
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})

export default server;
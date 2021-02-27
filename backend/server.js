require('dotenv').config();

const express = require('express');
const path = require('path');
const cors = require('cors'); // librería para configurar CORS

const bodyParser = require('body-parser'); // librería de parseo de datos a json
const fileUpload = require('express-fileupload');

const userRouter = require('./routes/users'); // variables que almacenan los módulos de los endpoint enrutados
const productRouter = require('./routes/products');

const app = express();

app.use(bodyParser.json()); // middleware de parseo
app.use(bodyParser.urlencoded({ extended: true }));

// Multipart parsing middleware
app.use(fileUpload());

app.use(cors()); // middleware de habilitación de CORS

// Serve static files
app.use(
    process.env.PUBLIC_PATH,
    express.static(path.join(__dirname, process.env.UPLOADS_DIR))
);

app.use('/users', userRouter);  // middlewares de enrutamiento
app.use('/products', productRouter);

app.use((error, req, res, next) => {
    
    const statusCode = error.httpCode || 500;

    if(statusCode === 500) error.message = 'error in the operation, try it again later';

    console.error(error.message, error.stack);
    res.status(statusCode).json({ message: error.message });

    return;
});

// Not found middleware
// app.use((req, res) => {
//     res.status(404).send({ status: 'error', message: 'Not found' });
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
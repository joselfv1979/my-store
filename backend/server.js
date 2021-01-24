const bodyParser = require('body-parser'); // librería de parseo de datos a json
const cors = require('cors'); // librería para configurar CORS

const express = require('express');

const userRouter = require('./routes/users'); // variables que almacenan los módulos de los endpoint enrutados
const productRouter = require('./routes/products');

const app = express();

app.use(bodyParser.json()); // middleware de parseo
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // middleware de habilitación de CORS

app.use('/users', userRouter);  // middlewares de enrutamiento
app.use('/products', productRouter);

app.use((error, req, res, next) => {
    res
        .status(error.httpCode || 500)
        .send({ status: 'error', message: error.message })
});

// Not found middleware
// app.use((req, res) => {
//     res.status(404).send({ status: 'error', message: 'Not found' });
// });

const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})
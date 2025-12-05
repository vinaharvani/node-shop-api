require('dotenv').config();
const express = require('express');
const app = express();
const morgan = require('morgan');                                      
const mongoose = require('mongoose');
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/user');

mongoose.connect(`mongodb+srv://${process.env.MONGO_ATLAS_USER}:${process.env.MONGO_ATLAS_PW}@node-rest-shop.ycuth7s.mongodb.net/?appName=node-rest-shop`)

const bodyParser = require('body-parser');

app.use(morgan('dev'));                          //  logging details about incoming HTTP requests to your application
app.use('/uploads',express.static('uploads')) // to make folder publicaly available
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*') // this header set is for allow the access of api to any client
    res.header('Accesss-Control-Allow-Headers', 
                'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
    }
    next();
})

app.use('/user', userRoutes);
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;  //  we get this 404 error because we didn't find the fitting route. that is defination of 404 error
    next(error);
})

app.use((error, req, res, next) => {   // this error will handle all error , which is forwarded and anywhere else from the application
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;
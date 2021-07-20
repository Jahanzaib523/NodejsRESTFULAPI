const express = require('express');
const morgan = require('morgan');
const bodyParse = require('body-parser');
const app = express();

const ProductRoutes = require('./API/Routes/products');
const OrderRoutes = require('./API/Routes/orders');
const bodyParser = require('body-parser');

//Morgan shows the log content in the console.
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParse.json());

//Handling the CORS errors
app.use((req, res, next) =>{
   res.header('Access-Control-Allow-Origin', '192.168.252.37');
   res.header('Access-Control-Allow-Origin', 'Origin, X-Requested-With, Authroization, Content-Type, Accept, ');
   res.header('Access-Control-Allow-Origin', '*');
   
   if(req.method === 'OPTIONS')
   {
     res.header('Access-Control-Allow-Origin', 'PUT, POST, PATCH, DELETE, GET');
     return res.status(200).json({});
   } 
});

//Routes which are handling requests.
app.use('/products', ProductRoutes);
app.use('/orders', OrderRoutes);

//Error Handling
app.use((req, res, next) => {
    const error = new Error('Error Occured!');
    error.status = 404;
    next(error);
}); 

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
     error: {
       message: error.message
     }
  });
});

module.exports = app;
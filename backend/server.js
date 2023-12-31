import express from 'express';
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from './Config/db.js';
import authRoute from './Routes/authRoute.js'
import productRoute from './Routes/productRoute.js'
import categoryRoute from './Routes/categoryRoute.js'
import cors from 'cors';

//Configure env 
dotenv.config();

//database configure
connectDB();
//Rest Object
const app = express();

//MiddleWares
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// static
app.use(express.static("dist"));

//routes
app.use('/api/v1/auth',authRoute);
app.use('/api/v1/category',categoryRoute);
app.use('/api/v1/products',productRoute);

//Rest API
app.use("/*", function (request, response) {
    response.sendFile(path.resolve(__dirname, "dist", "index.html"));
  });

//PORT
const Port = process.env.PORT || 1009;

//run listen
app.listen(Port,()=>{
    console.log(`Server is running on ${process.env.DEV_MODE} mode on Port ${Port}`);
});
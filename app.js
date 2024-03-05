require('dotenv').config();
require('./Config/dbConnect').dbConnect();
const express=require('express');
const cookieParser=require("cookie-parser");
const authRouter=require('./Routes/authRoutes')
const todoRoute=require('./Routes/todoRoute');
const app=express();

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.use("/",authRouter);
app.use("/todo",todoRoute);


module.exports=app
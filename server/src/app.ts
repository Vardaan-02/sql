import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import {Response, Request} from "express";
import dotenv from "dotenv";
import { startConsumer } from './config/rabbitmq.config.js';
import { isAuthorized } from './middlewares/auth.middleware.js';
dotenv.config();

const app = express();
// startConsumer();
const PORT = process.env.PORT || 8000;
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended: true}));;

app.use(cors({
    origin: ["*", "http://localhost:3000","http://localhost:3001","http://localhost:3002"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

app.get("/", (req: Request, res: Response)=>{
    res.send("server is running");
})

import auth from "./routes/auth.routes.js";
app.use("/auth", auth);
import { verifyEmail } from './controllers/otp/verify-email.controller.js';
app.get('/verify-email', verifyEmail);
import otp from "./routes/otp.routes.js";
app.use("/otp", otp);
import user from "./routes/user.routes.js";
app.use("/user", isAuthorized, user);
import supplier from "./routes/supplier.routes.js";
app.use("/", supplier);
import product from "./routes/product.routes.js";
app.use("/", product);
import purchaseOrder from "./routes/purchaseOrder.routes.js";
app.use("/", purchaseOrder);
import saleOrder from "./routes/saleOrder.routes.js";
app.use("/", saleOrder);
import stockTransaction from "./routes/stockTransaction.routes.js";
app.use("/", stockTransaction);
import dashboard from "./routes/dashboard.routes.js"
app.use("/", dashboard);

app.get("/protected-route", isAuthorized, (req, res)=>{
    res.send("This is a protected route");
    return;
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${process.env.PORT}`);
});
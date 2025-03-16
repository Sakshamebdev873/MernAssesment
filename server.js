import cookieParser from "cookie-parser";
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url"; 
const app = express();
import "express-async-errors";
dotenv.config();
// Router
import AdminRouter from "./Routes/AdminRouter.js";
import GuestRouter from './Routes/GuestUser.js'
app.use(express.json());
app.use(cookieParser())
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/api/v1", AdminRouter);
app.use('/api/v1',GuestRouter)
// app.use("/", (req, res) => {
//   res.send("Hello World!.....");
// });
app.use(express.static(path.resolve(__dirname, './public')));
app.get('*',(req,res)=>{
res.sendFile(path.resolve(__dirname,'./public','index.html'))
})
app.use(morgan('dev'))
const port = process.env.PORT || 5400;
const start = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on ${port}....`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();

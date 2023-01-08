import  express from "express";
import mongoose from "mongoose";
import router from "./routes/user-routes.js";
import blogRouter from "./routes/blog-routes.js";
import cors from 'cors';
import path from 'path';
import dotenv from 'dotenv';

const app = express();
dotenv.config().parsed;

app.use(cors());
app.use(express.json()) // in place of bodyparser 
app.use("/api/user", router); //http://localhost:5000/api/user/login 
app.use("/api/blog", blogRouter)

const __dirname = path.resolve();

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGODB, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log("connected to mongodb")
    } catch (error) {
        console.log(error.message)
    }
}


// Server Production assets
if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/dist")))
    app.get("*", (req, res) => res.sendFile(path.join(__dirname, "frontend/dist/index.html")))
}

const port = process.env.PORT || 5000;
app.listen(port, () => {
    connect()
    console.log(`serve at ${port}`);
});
import express from "express";
import cors from "cors";
import config from "./config";
import productsRouter from "./routers/products";
// import mongoDb from "./mongoDb";
import mongoose from "mongoose";
import mongoDb from "./mongoDb";





const app = express();
const port = 8000;

app.use(cors(config.corsOptions));
app.use(express.json());

app.use("products", productsRouter);


const run = async()=>{
    // await mongoDb.connect()
    await mongoose.connect("mongodb://localhost/products");

    app.listen(port, ()=>{
        console.log(`Server running on port ${port}`);
    })

    process.on('exit', ()=>{
        // mongoDb.disconnect();
        mongoDb.disconnect();
    })
}

run().catch(console.error);
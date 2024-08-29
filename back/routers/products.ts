import express from 'express';
import mongoDb from "../mongoDb";
import {ObjectId} from "mongodb";
import {ProductMutation} from "../types";
import MongoDb from "../mongoDb";
import Product from "../models/Product";
import mongoose from "mongoose";

const productsRouter = express.Router();

productsRouter.get("/", async(req, res, next)=>{
    try{

        //mongoDb
        // const db = mongoDb.getDb();
        // const products = await db.collection("products").find().toArray();

        //Mongoose
        const products = await Product.find()
        return res.send(products);
    }catch(error){
        next(error);
    }

})

productsRouter.get("/:id", async(req, res, next)=>{
    try{
        //MongoDb
        // const id = req.params.id;
        // const db = mongoDb.getDb();
        // const product = await db.collection("products").findOne({_id:new ObjectId(id)})

        //Mongoose
        const product = await Product.findById(req.params.id)

        if(product === null){
            return res.status(404).send({error:"Product not found"})
        }

        return res.send(product);
    }catch(error){
        next(error);
    }
})

productsRouter.post("/", async (req, res, next)=>{
    console.log(req.body.title);
    try {
        const ProductMutation:ProductMutation = {
            title:req.body.title,
            description:req.body.description,
        }

        console.log(ProductMutation);

        //MongoDB
        // const db = MongoDb.getDb();
        // const result = await db.collection('products').insertOne(product);

        const product = new Product(ProductMutation);
        await product.save();

        return res.send(product);
    }catch(error){

        if(error instanceof mongoose.Error.ValidationError){
            return res.status(400).send(error);
        }
        next(error);

    }
})

export default productsRouter
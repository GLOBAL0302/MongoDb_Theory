import express from 'express';
import mongoDb from "../mongoDb";
import {ObjectId} from "mongodb";
import {ProductMutation} from "../types";
import MongoDb from "../mongoDb";

const productsRouter = express.Router();

productsRouter.get("/", async(req, res, next)=>{
    try{
        const db = mongoDb.getDb();
        const products = await db.collection("products").find().toArray();

        return res.send(products)
    }catch(error){
        next(error);
    }

})

productsRouter.get("/:id", async(req, res, next)=>{
    try{
        const id = req.params.id;
        const db = mongoDb.getDb();
        const product = await db.collection("products").findOne({_id:new ObjectId(id)})

        if(product === null){
            return res.status(404).send({error:"Product not found"})
        }

        return res.send(product);
    }catch(error){
        next(error);
    }
})

productsRouter.post("/", async (req, res, next)=>{
    try {
        if(!req.body.title || !req.body.price || req.body.category){
            return res.status(404).send({error:"Product's title or category not found"});
        }

        const product:ProductMutation = {
            category : new ObjectId(req.body.category),
            title:req.body.title,
            description:req.body.description,
        }

        const db = MongoDb.getDb();
        const result = await db.collection('products').insertOne(product);

        return res.send(result.insertedId);
    }catch(error){
        next(error);
    }
})

export default productsRouter
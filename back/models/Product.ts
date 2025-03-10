import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },

})

const Product = mongoose.model("Product",ProductSchema);

export default Product;
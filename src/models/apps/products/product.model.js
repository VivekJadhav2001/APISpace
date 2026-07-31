import mongoose from "mongoose";


const productSchema = new mongoose.Schema({

    brand:{
        type: String,
        required:true
    },
    product_name:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    color:{
        type:String,
        required:true
    },
    size:{
        type:String,
        enum:["small","large","medium"],
        required:true
    },
    material:{
        type:String,
        required:true
    },
    season:{
        type:String,
        required:true
    },
    style:{
        type:String,
        required:true
    },
    release_date:{
        type:Date,
        required:true
    }


},{timestamps:true})

productSchema.index({ category: 1 });
productSchema.index({ size: 1 });
productSchema.index({ material: 1 });
productSchema.index({ price: 1 });

export const Product = mongoose.model("Product",productSchema)
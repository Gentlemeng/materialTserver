const mongoose = require("mongoose")
const Schema = mongoose.Schema

//创建产品详情Schema
const productDetailSchema = new Schema({
    ID:{type:String,unique:true},
    DETAIL:{type:Array},
})

mongoose.model("Product_detail",productDetailSchema)

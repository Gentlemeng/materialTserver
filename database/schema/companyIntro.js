const mongoose = require('mongoose')
const Schema = mongoose.Schema

let ObjectId = Schema.Types.ObjectId

//创建公司介绍Schema
const introSchema = new Schema({
    address:{
        unique:true,
        type:Array
    },
    sellRange:{
        unique:true,
        type:Array
    },
    promise:{
        unique:true,
        type:Array
    }
})

//发布模型
mongoose.model('companyIntro',introSchema)
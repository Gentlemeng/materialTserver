const mongoose = require('mongoose')

const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

let categorySubSchema = new Schema({
    ID:{type:String,unique:true},
    CATEGORY_ID:String,
    IMAGE:{type:String},
    SUB_NAME:String,
    TYPE:Number,
    ISLEAF:Boolean
})

mongoose.model('Category_sub',categorySubSchema)
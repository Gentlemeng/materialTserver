//定义 category schema
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
let ObjectId = Schema.Types.ObjectId;

const categorySchema = new Schema({
    ID:{unique:true,type:String},
    CATEGORY_NAME:{unique:true,type:String},
    IMAGE:{type:String},
    TYPE:{type:Number},
    ISLEAF:{type:Boolean}
},{
    collection:'Category'
})

mongoose.model('Category',categorySchema);
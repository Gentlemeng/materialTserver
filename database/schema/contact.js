const mongoose = require('mongoose')
let Schema = mongoose.Schema

let contactSchema = new Schema({
    type:{
        unique:true,
        type:String
    },
    value:{
        unique:true,
        type:String
    }
})

mongoose.model('contact',contactSchema)

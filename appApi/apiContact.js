const mongoose = require('mongoose')
const Router = require('koa-router')
let router = new Router()

router.get('/contact',async(ctx)=>{
    try{
        let Contact = mongoose.model('contact')
        let result = await Contact.find().exec()
        ctx.body = {code:200,data:result}
    }catch(err){

    }
})
module.exports = router
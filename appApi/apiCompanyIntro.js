const Router = require ('koa-router')
let router = new Router()
router.get('/companyIntro',async(ctx)=>{
    ctx.body="这是公司介绍页"
})
module.exports=router;
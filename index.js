const Koa = require('koa')
const app = new Koa()
const mongoose = require('mongoose')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const Router = require ('koa-router')
let router = new Router()
app.use(bodyParser())
app.use(cors())
//引入数据连接
const {connect,initSchema} = require('./database/init.js')
let companyIntro =require('./appApi/apiCompanyIntro.js')
let category =require('./appApi/insterProduct.js')
//立即执行函数
;(async()=>{
    // debugger;
    await connect()
    initSchema()
    // const CompanyIntro = mongoose.model('companyIntro')
    // let oneIntro = new CompanyIntro({address:['1','2'],sellRange:['1','2'],promise:['1','2']})
    // oneIntro.save().then(()=>{
    //     console.log("插入成功")
    // })
})()
//装载子路由
router.use('/material',companyIntro.routes(),category.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[server] starting at port 3000')
})

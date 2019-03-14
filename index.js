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
let contact =require('./appApi/apiContact.js')
let product =require('./appApi/apiProduct.js')
//立即执行函数
;(async()=>{
    // debugger;
    await connect()
    initSchema()
    // const Contact = mongoose.model('contact')
    // const contactArr = [
    //     {
    //         type: '公司名称',
    //         value: '邯郸市壮达物资有限公司'
    //     }, {
    //         type: '公司地址',
    //         value: '河北省邯郸市丛台区丛台西路25号鹿诚商务大厦C单元13层C1303'
    //     }, {
    //         type: '公司电话',
    //         value: '0310-3120336'
    //     }, {
    //         type: '联系人',
    //         value: '安经理'
    //     },{
    //         type: '手机号码',
    //         value: '13831000156'
    //     }
    // ]
    // contactArr.forEach(item=>{
    //     let oneIntro = new Contact({
    //         type:item.type,
    //         value:item.value
    //     })
    //     oneIntro.save().then(()=>{
    //         console.log("插入成功")
    //     })
    // })
})()
//装载子路由
router.use('/material',companyIntro.routes(),contact.routes(),product.routes())
//加载路由中间件
app.use(router.routes())
app.use(router.allowedMethods())

app.use(async(ctx)=>{
    ctx.body = '<h1>hello Koa2</h1>'
})

app.listen(3000,()=>{
    console.log('[server] starting at port 3000')
})

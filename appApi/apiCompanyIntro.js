const mongoose = require("mongoose")

const Router = require ('koa-router')
let router = new Router()

router.get("/insertCompanyIntro",async(ctx)=>{
    const CompanyIntro = mongoose.model("companyIntro")
    let companIntro = new CompanyIntro({
        "address" : [ "邯郸市壮达物资有限公司位于历史文化名城赵国古都邯郸。历史文化底蕴丰厚，有“成语之都”之美誉。衔晋冀鲁豫四省交际中心，交通发达，为公司发展奠定了坚实的空间基础。"],
        "sellRange":["我公司经营：8-30kg轻轨，38-60kg重轨，38-120kg起重轨，各种型号工字钢，矿用工字钢，U型钢，六棱钢，槽钢，扁钢，角钢，道钉，道夹板，鱼尾螺栓，锚杆，螺杆，锚网，穿墙丝，山型件，建筑配件，定做各种异形件以及建筑类木方，木胶板等。"],
        "promise":["公司自成立以来，始终坚持“优惠一切归客户”的原则，以最低的价格提供的产品，始终秉承“诚信合作，互利共赢”的理念，以的团队追求更好的服务。并且成立了公司专用的物流车队，到货及时，极大方便了客户。", 
        "壮达深信：每一个产品就是一条广告，以一流的产品、完善的售后服务来赢得用户的信任，壮达竭诚希望与新老客户合作与沟通，与客户同谋发展，共享新经济的繁荣。"]
    })
    companIntro.save().then(()=>{
        console.log("插入成功")
    }).catch(err=>{
        console.log('插入失败')
    })
})

router.get('/companyIntro',async(ctx)=>{
    // ctx.body="这是公司介绍页"
    try {
        let CompanyIntro = mongoose.model("companyIntro")
        let result = await CompanyIntro.find().exec()
        ctx.body = {code:200,data:result}
    } catch (err) {
        ctx.body = {code:500,data:err}
    }
})
module.exports=router;
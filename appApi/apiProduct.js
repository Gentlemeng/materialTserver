const mongoose = require('mongoose') //数据库操作
const fs = require('fs') //文件操作
const Router = require ('koa-router')
let router = new Router()


//将商品大类插入数据库
router.get('/insertAllCategory',async(ctx)=>{
    fs.readFile('./data_json/category.json','utf8',(err,data)=>{
        if(!err){
            data = JSON.parse(data);
            let saveCount = 0;
            const Category = mongoose.model('Category')
            data.RECORDS.map((value,index)=>{
                let newCategory = new Category(value);
                newCategory.save().then(()=>{
                    saveCount++;
                    console.log('成功'+saveCount)
                }).catch(err=>{
                    console.log('失败'+err);
                })
            })   
        }else{
            console.log(err);
        }
    })
    ctx.body='开始导入数据'
})
//将商品小类插入数据库
router.get('/insertAllCategorySub',async(ctx)=>{
    fs.readFile('./data_json/category_sub.json','utf8',(err,data)=>{
        if(!err){
            data = JSON.parse(data);
            let saveCount = 0;
            const CategorySub = mongoose.model('Category_sub');
            data.RECORDS.map((value,index)=>{
                let newCategorySub = new CategorySub(value);
                newCategorySub.save().then(()=>{
                    saveCount++;
                    console.log('成功'+saveCount);
                }).catch(err=>{
                    console.log('失败'+err);
                })
            })
        }else{
            console.log(err);
        }
    })
    ctx.body='开始导入数据'
})
//商品大类
router.get('/category',async(ctx)=>{
    try{
        let Category = mongoose.model('Category')
        let result = await Category.find().exec()
        ctx.body = {code:200,data:result}
    }catch(err){
        ctx.body = {code:500,data:err}
    }
})
//根据商品大类查找子类
router.post('/category_sub',async(ctx)=>{
    try{
        let CategorySub = mongoose.model('Category_sub')
        let categoryId = ctx.request.body.categoryId
        //分页功能
        let pageNum = ctx.request.body.pageNum
        let pageSize = ctx.request.body.pageSize||8
        let start = (pageNum-1)*pageSize
        // console.log(ctx.request.body);
        // debugger
        let allRsult = await CategorySub.find({CATEGORY_ID:categoryId}).exec()
        let result = await CategorySub.find({CATEGORY_ID:categoryId}).skip(start).limit(pageSize).exec()
        let count = allRsult.length
        // ctx.body = {code:200,data:{result:result,count:count}}
        ctx.body = {code:200,data:result,count:count}

    }catch(err){
        ctx.body = {code:500,data:err}
    }
})

module.exports = router
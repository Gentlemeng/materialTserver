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
            const Category = mongoose.model('Category');
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

module.exports = router
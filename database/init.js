const mongoose = require('mongoose')

const db = 'mongodb://localhost/materialT'

const glob = require('glob')
const {resolve} = require('path')
// mongoose.Promise =  global.Promise

exports.connect = ()=>{

    //连接数据库
    mongoose.connect(db,{useNewUrlParser:true,useCreateIndex: true})

    let maxConnectTimes = 0
    return new Promise((resolve,reject)=>{

        //增加数据库连接的时间监听 和重连次数
        mongoose.connection.on('disconnected',()=>{
            console.log('******数据库断开******')
            if(maxConnectTimes<=3){
                //进行重连
                mongoose.connect(db)    
                maxConnectTimes++
            }else{
                reject()
                throw new Error('重连数据失败，程序无法搞定，请人为处理。')
            }
            
        })

        //数据库出现错误的时候
        mongoose.connection.on('error',()=>{
            console.log('******数据库错误******')
            if(maxConnectTimes<=3){
                //进行重连
                mongoose.connect(db)    
                maxConnectTimes++
            }else{
                reject()
                throw new Error('重连数据失败，程序无法搞定，请人为处理。')
            }
        })

        //连接打开的时候
        mongoose.connection.once('open',()=>{
            console.log('MongoDB Connected successfully!')
            resolve();
        })
    })
}
exports.initSchema=()=>{
    // 使用了glob.sync同步引入所有的schema文件，然后用forEach的方法require（引入）进来
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}
var mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/nodedemo',function(err){
    if(err){
        console.log('faile')
    }else{
        var mySchema = new mongoose.Schema({title:String,author:String,summary:String})
        var myModel = mongoose.model('Blogs',mySchema)
        var models = {
            title: 'title1',
            author: 'jason',
            summary: '以上实例会启动一个名为rs0的MongoDB实例，其端口号为27017。启动后打开命令提示框并连接上mongoDB服务。在Mongo客户端使用命令rs.initiate()来启动一个新的副本集。'
        }
        var doc1 = new myModel(models)
        doc1.save(function(){
            console.log('save success')
        })
        //console.log(doc1.title)
    }
})
setTimeout(function(){
    mongoose.disconnect(function(){
        console.log('断开连接')
    })
},2000)
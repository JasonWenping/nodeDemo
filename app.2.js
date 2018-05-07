var express =  require('express')
var path = require('path')
var mongoose = require('mongoose')
var port = process.env.PORT || 3000
var app = express()
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(serveStatic('bower_components'))
app.use(bodyParser.urlencoded({extended: true}))
app.listen(port)

//连接本地mongodb数据库
mongoose.connect('mongodb://localhost/nodedemo')

//Schema 模式
var articleSchema = {title:String,author:String,summary:String}
//实例化一个Schema对象mySchemas
var mySchemas = new mongoose.Schema(articleSchema)
//Model 模型
var myModel = mongoose.model('blogs',mySchemas)

//配置路由
app.get('/', function(req , res) {
    myModel.find({}).exec(function(err,doc){
        res.render('index',{
        title:'Home page',
        articles:doc
        })
        console.log(doc)
    })
})

app.get('/detail/:id', function(req , res) {
    var aid = req.params.id
    myModel.findOne({_id:aid}).exec(function(err ,doc){
        res.render('detail', {
            title:'Details  page',
            articles:doc
        })
    })
})

app.get('/manage/add', function(req,res){
    res.render('add',{
        title:'addArticle'
    })
})

app.get('/manage/list', function(req,res){
    res.render('list',{
        title:'listArticle',
        articles:[
            {
                _id: 1, 
                _title:'Express 中间件',
                _author:'Jason Yan',
                _summary: 'body-parser是一个HTTP请求体解析中间件',
                _date: '2011-03-26'
            },
            {
                _id: 2, 
                _title:'Express 中间件',
                _author:'Jason Yan',
                _summary: 'body-parser是一个HTTP请求体解析中间件',
                _date: '2011-03-26'
            },
            {
                _id: 3, 
                _title:'Express 中间件',
                _author:'Jason Yan',
                _summary: 'body-parser是一个HTTP请求体解析中间件',
                _date: '2011-03-26'
            },
            {
                _id: 4, 
                _title:'Express 中间件',
                _author:'Jason Yan',
                _summary: 'body-parser是一个HTTP请求体解析中间件',
                _date: '2011-03-26'
            },
            {
                _id: 5, 
                _title:'Express 中间件',
                _author:'Jason Yan',
                _summary: 'body-parser是一个HTTP请求体解析中间件',
                _date: '2011-03-26'
            },
            {
                _id: 6, 
                _title:'Express 中间件',
                _author:'Jason Yan',
                _summary: 'body-parser是一个HTTP请求体解析中间件',
                _date: '2011-03-26'
            }
        ]
    })
})

console.log('node start on port: ' + port)

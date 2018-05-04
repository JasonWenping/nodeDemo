var express =  require('express')
var path = require('path')
var mongoose = require('mongoose')
var port = process.env.PORT || 3000
var app = express()
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var Blogs = require('./models/blogs')

mongoose.connect('mongodb://localhost/nodedemo')

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(serveStatic('bower_components'))
app.use(bodyParser.urlencoded({extended: true}))
app.listen(port)

//配置路由
app.get('/', function(req , res) {
    Blogs.fetch(function(err , blogs){
        if(err){
            console.log(err)
        }
        res.render('index',{
            title:'Home page',
            articles:blogs
        })
    })
})

app.get('/detail/:id', function(req , res) {
    res.render('detail', {
        title:'Details  page',
        id: 2,
        articles:[
            {
                aId: 1, 
                title:'Express 中间件----body-parser？',
                author:'Jason Yan',
                content: 'body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。',
                date: '2011-03-24'
            },
            {
                aId: 2, 
                title:'前端学习的技巧？',
                author:'Jason Yan',
                content: 'body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。',
                date: '2011-03-26'
            },
            {
                aId: 3, 
                title:'推荐书目-帮你快速上手项目',
                author:'Jason Yan',
                content: 'body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。body-parser是一个HTTP请求体解析中间件，使用这个模块可以解析JSON、Raw、文本、URL-encoded格式的请求体，Express框架中就是使用这个模块做为请求体解析中间件。',
                date: '2011-03-28'
            }
        ]
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

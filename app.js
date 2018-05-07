var express =  require('express')
var path = require('path')
var mongoose = require('mongoose')
var port = process.env.PORT || 3000
var app = express()
var serveStatic = require('serve-static')
var bodyParser = require('body-parser')
var Blogs = require('./models/blogs')
var _ = require('underscore')

mongoose.connect('mongodb://localhost/nodedemo')

app.set('views','./views/pages')
app.set('view engine','jade')
app.use(serveStatic('bower_components'))
app.use(bodyParser.urlencoded({extended: true}))
app.listen(port)

console.log('node start on port: ' + port)

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
    var aid = req.params.id
    Blogs.findById(aid,function(err ,doc){
        res.render('detail', {
            title:'Details  page',
            articles:doc
        })
    })
})

// app.get('/manage/add', function(req,res){
//     res.render('add',{
//         title:'addArticle'
//     })
// })

app.get('/manage/update/:id', function(req , res){
    var id = req.params.id;
    Blogs.findById(id,function(err,doc){
        res.render('add',{
            articles:doc
        })
    })
})

// app.get('/manage/list', function(req,res){
//     var id= req.query.id;
//     Blogs.remove({_id:id},function(err,doc){
//         if(err){
//             console.log('删除失败')
//         }
//         console.log('删除成功')
//         console.log(doc)
//     });
// })
app.post('/manage/add/new', function(req , res){
    //console.log(req.body);
    var id = req.body._id
    var aritcleObj = req.body
    var _article
    if(id != undefined){
        console.log(id)
        Blogs.findById(id,function(err,doc){
            if(err){
                console.log(err)
            }
            _article = _.extend(doc , aritcleObj);
            _article.save(function(err,doc){
                if(err){
                    console.log(err)
                }
                res.redirect('/detail/'+ doc._id)
            })
        })
    }else{
        //console.log(aritcleObj)
        _article=new Blogs({
            title: aritcleObj.title,
            category: aritcleObj.category,
            author: aritcleObj.author,
            summary: aritcleObj.summary,
            content: aritcleObj.content
        })
        _article.save(function(err,doc){
            if(err){
                console.log(err)
            }
            res.redirect('/detail/'+ doc._id)
        })
    }
})

app.get('/manage/add' , function(req ,res){
    res.render('add',{
        title:'addArticle',
        articles:{
            title: '',
            category: '',
            author: '',
            summary: '',
            content: ''
        }
    })
})

app.get('/manage/list', function(req,res){
    Blogs.fetch(function(err , doc){
        res.render('list',{
            title:'listArticle',
            articles:doc
        })
    })
})


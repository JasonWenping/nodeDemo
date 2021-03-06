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
app.use(express.static('public'))
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
    var aid = req.params.id;
    Blogs.findById(aid,function(err ,doc){
        res.render('detail', {
            title:'Details  page',
            article:doc
        })
    })
})

// app.get('/linklist',function(req,res){
//     Blogs.fetch(function(err,doc){
//         console.log(doc)
//         res.render('linklist',{
//             title: 'Link List',
//             articles: doc
//         })
//     })
// })

app.get('/manage/update/:id', function(req , res){
    var id = req.params.id;
    Blogs.findById(id,function(err,doc){
        res.render('add',{
            category: ['前端框架','经验分享','心灵鸡汤','乱码七糟'],
            articles:doc
        })
    })
})

app.delete('/manage/list', function(req,res){
    var id= req.query.id;
    Blogs.remove({_id:id},function(err,doc){
        if(err){
            console.log('删除失败')
        }
        else{
            res.json({success:1})
        }
    });
})

app.post('/manage/add/new', function(req , res){
    console.log(req.body);
    var _id = req.body.id
    console.log(_id)
    var aritcleObj = req.body
    var _article
    if(_id != 'undefined'){
        //console.log(id)
        Blogs.findById(_id,function(err,doc){
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
        category: ['前端框架','经验分享','心灵鸡汤','乱码七糟'],
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


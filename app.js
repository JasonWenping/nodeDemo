var express =  require('express')
var port = process.env.PORT || 3000
var app = express()

app.set('views','./views')
app.set('view engine','jade')
app.listen(port)

//配置路由
app.get('/', function(req , res) {
    res.render('index',{
        title:'Home page'
    })
})

app.get('/detail/:id', function(req , res) {
    res.render('detail', {
        title:'Details  page'
    })
})

console.log('node start on port: ' + port)

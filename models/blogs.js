var mongoose = require('mongoose')
var BlogSchema = require('../schemas/blogs')
var Blogs = mongoose.model('Blogs',BlogSchema)

module.exports = Blogs
var mongoose = require('mongoose')

var BlogSchema = new mongoose.Schema({
    title: String,
    author: String,
    catagory: String,
    summary: String,
    content: String,
    meta: {
        addAt:{
            type:Date,
            default:Date.now()
        },
        updateAt:{
            type: Date,
            default: Date.now()
        }
    }
})
BlogSchema.pre('save', function(next){
    if(this.isNew){
        this.meta.addAt = this.meta.updateAt = Date.now()
    }else{
        this.updateAt = Date.now()
    }
    next()
})

BlogSchema.statics = {
    fetch: function(cb){
        return this
            .find({})
            .sort('meta.updateAt')
            .exec(cb)
    },
    findById: function(id,cb){
        return this
            .findOne({_id:id})
            .exec(cb)
    }    
}

module.exports = BlogSchema
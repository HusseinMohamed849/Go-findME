const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    description:{
        type:String,
        required: true,
    }, name:{
        type:String,
    }, age:{
        type:String,
        required: true,
    }
    ,date:{
        type: String,
        lastActiveAt: Date,
        required: false,
    }, typeofperson :{
        type:String,
        required: true,
    }, city :{
        type:String,
        required: true,
        trim: true,
    }, region :{
        type:String,
        required: true,
        trim: true,
    }, gender :{
        type:String,
        required:true
    }, owner:{
        // type:mongoose.Schema.Types.ObjectID,
        type:String,
        required:false,
        ref:'User'
    }
    , image:{
        type:String,
    }
}, {
    timestamps: true
})

const Post =  mongoose.model('Post',postSchema)
module.exports = Post
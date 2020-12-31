const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const videoSchema = mongoose.Schema({
    
    writer: {
        type:Schema.Types.ObjectId, //이렇게 작성하는 이유는 User.js 에서 유저에 관한 모든 정보를 긁어 올 수가 있다.
        ref:'User'
    },
    title:{
        type:String,
        maxlength: 50
    },
    description :{
        type: String,
    },
    privacy:{
        type:Number
    },
    filePath:{
        type: String
    },
    category:{
        type: String
    },
    views:{
        type: Number,
        default:0
    },
    duration:{
        type: String
    },
    thumbnail:{
        type: String
    }

},{timestamps: true})

 
const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }
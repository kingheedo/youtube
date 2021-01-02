const express = require('express');
const router = express.Router();

const {Like} = require('../models/Like')
const {Dislike} = require('../models/Dislike')

// ============================================
//                  Like
// ============================================
router.post("/getLikes", (req, res) => {
    let variable ={}

    if(req.body.videoId){
        variable ={videoId: req.body.videoId}
    }else{
        variable={commentId:req.body.commentId}
    }
    Like.find(variable)
    .exec((err, likes)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, likes})
    })
});
router.post("/getDislikes", (req, res) => {
    let variable ={}

    if(req.body.videoId){
        variable ={videoId: req.body.videoId}
    }else{
        variable={commentId:req.body.commentId}
    }
    Dislike.find(variable)
    .exec((err, dislike)=>{
        if(err) return res.status(400).send(err)
        res.status(200).json({success:true, dislike})
    })
});

router.post("/upLike", (req, res) => {
    let variable ={}

    if(req.body.videoId){
        variable ={videoId: req.body.videoId,userId:req.body.userId}
    }else{
        variable={commentId:req.body.commentId,userId:req.body.userId}
    }
    
    // Like collection 에다가 클릭정보를 넣어줄거에요.

    const like = new Like(variable)
    like.save((err, likeResult)=>{
        if(err) return res.json({success:false,err})

    // 만약에 DisLike에 이미 클릭이 되어있다면 DisLike을 1 줄여준다.
        Dislike.findOneAndDelete(variable)
        .exec((err,dislikeResult)=>{
            if(err) return res.status(400).json({success:false},err)
            res.status(200).json({success:true})
        })

    })

});
router.post("/unLike", (req, res) => {
    let variable ={}

    if(req.body.videoId){
        variable ={videoId: req.body.videoId,userId:req.body.userId}
    }else{
        variable={commentId:req.body.commentId,userId:req.body.userId}
    }
   
    Like.findOneAndDelete(variable)
    .exec((err, result)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true})
    })
});

router.post("/unDislike", (req, res) => {
    let variable ={}

    if(req.body.videoId){
        variable ={videoId: req.body.videoId,userId:req.body.userId}
    }else{
        variable={commentId:req.body.commentId,userId:req.body.userId}
    }
   
    Dislike.findOneAndDelete(variable)
    .exec((err, result)=>{
        if(err) return res.status(400).json({success:false,err})
        res.status(200).json({success:true})
    })
});

router.post("/upDislike", (req, res) => {
    let variable ={}

    if(req.body.videoId){
        variable ={videoId: req.body.videoId,userId:req.body.userId}
    }else{
        variable={commentId:req.body.commentId,userId:req.body.userId}
    }
    
    // DisLike collection 에다가 클릭정보를 넣어줄거에요.

    const dislike = new Dislike(variable)
    dislike.save((err, likeResult)=>{
        if(err) return res.json({success:false,err})

    // 만약에 Like에 이미 클릭이 되어있다면 Like 1 줄여준다.
        Dislike.findOneAndDelete(variable)
        .exec((err,likeResult)=>{
            if(err) return res.status(400).json({success:false},err)
            res.status(200).json({success:true})
        })

    })

});
module.exports = router;
const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const User = require('../models/user')
const Post = require('../models/post')

const requireLogin = require('../middleware/requireLogin')

router.get('/users',requireLogin,(req,res)=>{
    User.find().limit(5)
    .then(users=>{
     // const users = user.slice(0, 5)
        res.json({users})
    })
    .catch(err=>{
        console.log(err)
    })
})
router.get('/user/:id',requireLogin,(req,res)=>{
    User.findOne({_id:req.params.id})
    .then(user=>{
        Post.find({postedBy:req.params.id})
        .populate("postedBy", "_id name")
        .exec((err,posts)=>{
            if(err){
                return res.status(422).json({error:err})
            }
            res.json({user,posts})
        })
    })
    .catch(err=>{
        return res.status(404).json({error:"User not found"})
    })
})

router.put('/follow',requireLogin,(req,res)=>{
   
    User.findByIdAndUpdate(req.body.followId,{
        $push:{
            followers:req.user._id
        }
       
    }, {
        new:true
    },(err,result)=>{
        
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $push:{
                following:req.body.followId
            }
        },{
            new:true
        })
        .select("-password")
        .then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    })
    
})
router.put('/unfollow',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{
            followers:req.user._id
        }
       
    }, {
        new:true
    },(err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }
        User.findByIdAndUpdate(req.user._id,{
            $pull:{
                following:req.body.unfollowId
            }
        },{
            new:true
        })
        .select("-password")
        .then(result=>{
            res.json(result)
        }).catch(err=>{
            return res.status(422).json({error:err})
        })
    })
    
})

router.put('/updatephoto',requireLogin,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
        $set:{photo:req.body.imgUrl}
    },{new:true},
    (err,result)=>{
        if(err){
            return res.status(422).json({error:'could not update photo'})
        }
        res.json(result)
    })
})

router.post('/search-users',(req,res)=>{
    let userPattern = new RegExp("^"+req.body.query)
    User.find({email:{$regex:userPattern}})
    .select("id email")
    .then(user=>{
        res.json({user})
    })
    .catch(err=>{
        console.log(err)
    })
})


module.exports = router
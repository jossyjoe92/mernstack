const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const BusinessPost = require('../models/businessPost')
const requireLogin = require('../middleware/requireLogin')

//get products or services
router.get('/businesscategory/:category', requireLogin,(req, res) => {
    BusinessPost.find({category:req.params.category})
    .populate('postedBy',"_id name")
    .populate('business',"_id name photo")
    .populate('comments.postedBy',"_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
  });

  //get products or services by sub-categories
  router.get('/businesssubcategory/:subcategory', requireLogin,(req, res) => {
    BusinessPost.find({subCategory:req.params.subcategory})
    .populate('postedBy',"_id name")
    .populate('business',"_id name photo")
    .populate('comments.postedBy',"_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
  });

  //get my subscribed products or services categories
  router.get('/mysubscribedproductpost/:category', requireLogin,(req, res) => {
    BusinessPost.find({postedBy:{$in:req.user.businessSubscribed},category:req.params.category})
    .populate('postedBy',"_id name")
    .populate('business',"_id name photo")
    .populate('comments.postedBy',"_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
  });
   //get my subscribed products or services sub-categories
   router.get('/mysubscribedproductpost/:subcategory', requireLogin,(req, res) => {
    BusinessPost.find({postedBy:{$in:req.user.businessSubscribed},category:req.params.subcategory})
    .populate('postedBy',"_id name")
    .populate('business',"_id name photo")
    .populate('comments.postedBy',"_id name")
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
  });


  //post product or service
router.post('/createbusinesspost',requireLogin,(req,res)=>{

    const {title,category,subCategory,price,description,imgUrl,business} = req.body
    if(!title||!description||!imgUrl||!category||!subCategory){
        return res.status(422).json({error:'Please add all the required fields'})
    }
    //req.user.password = undefined
const businessPost = new BusinessPost({
        title,
        description,
        price,
        category,
        subCategory,
        photo:imgUrl,
        business,
        postedBy:req.user

    })
    businessPost.save()
    .then(result=>{
        res.json({businessPost:result})
    })
    .catch(err=>{
        console.log(err)
    })
})

router.get('/businesspost/:id',requireLogin,(req,res)=>{
    BusinessPost.findOne({_id:req.params.id})
    .populate('postedBy',"_id name photo email")
    .populate('comments.postedBy',"_id name photo")
    .populate('business', "_id email name photo address")
    .then(post=>{
        res.json({post})
    })
    .catch(err=>{
        console.log(err)
    })
})

//all post made by a business
router.get('/allbusinesspost/:Id', requireLogin,(req, res) => {
    BusinessPost.find({business:req.params.Id})
    .then(posts=>{
        res.json({posts})
    })
    .catch(err=>{
        console.log(err)
    })
  });

module.exports = router
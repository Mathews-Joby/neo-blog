const router = require('express').Router();
let Post = require('../models/Post.js');
const User = require('../models/User.js');

router.delete('/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);
        if (post.author === req.body.author) {
            try {
                await post.delete();
                res.status(200).json("successfully deleted the post.");
            } catch (error) {
                res.status(500).json(error);
            }
        } else {
            res.status(401).json("you can only delete your posts.");
        }
    } catch (error) {
        res.status(500).json(error);
    }
});


router.post("/create", async (req, res) => {
    const newPost = new Post(req.body);
    try {
        // const author = req.body.username;
        // const title = req.body.title;
        // const description = req.body.content;
        // const img = req.body.img;
        // const views = req.body.views;
        // const categories = req.body.categories;

        // const post = new post({
        //     author: author,
        //     title: title,
        //     description: description,
        //     img: img,
        //     categories: categories,
        //     views: views
        // });

        const Posted = await newPost.save();
        res.status(200).json(Posted);
        
    } catch (error) {
        res.status(400).json(error);
    }
})

router.get('/:id', async (req, res) => {
    try{
        const post = await Post.findById(req.params.id);

        res.status(200).json(post);
    } catch (error) {
        res.status(500).json(error);
    }
});
//hi

router.get('/', async (req, res) => {
    const author = req.query.user;
    const catName = req.query.cat;
    try{
        let posts;
        let userData;
        if(author){
            posts = await Post.find({author}).sort({createdAt: -1});
        } else if(catName){
            posts = await Post.find({categories:{
                $in: [catName]
            } }).sort({createdAt: -1})
        } else{
            posts = await Post.find().sort({createdAt: -1});
        }
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json(error);
    }
});

router.put("/:id", async (req, res) => {
    Post.findById(req.params.id)
     try {
        const post = await Post.findById(req.params.id);
        try {
            if(post.author === req.body.author){
                try {
                    const updatedPost = await Post.findByIdAndUpdate(req.params.id, {
                        $set: req.body
                    }, {new: true});
                    res.status(200).json(updatedPost);
                } catch (error){
                    res.status(500).json(error);
                }
            } else {
                res.status(101).json("you can only update your post");
            }
        } catch (error) {

        }
     } catch (error) {
        res.status(500).json(error)
     }
})

module.exports = router;


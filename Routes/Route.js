const express = require('express');
const userRoute = express();
const {Blog,Post,User} = require('../model/UserModel');

userRoute.post('/user',async(req,res)=>{ 
    try {
        const {name,email}=req.body;
        console.log(name,email)
        const findExistUser=await User.findOne({email:email});
        if(findExistUser){
            res.status(400).json('User Exist')
        }
        const SaveUser=await User.create({name,email});
        await SaveUser.save();
        res.status(201).json({msg:"User Created",data:SaveUser})
    } catch (error) {
        console.log(error.message)
        res.status(400).json({msg:"Wrong Something"})
        
    }
    
})

// For Post
userRoute.post('/post', async (req, res) => {
    try {
        const { title, content, user } = req.body;

        // Create and save the new post
        const SavePost = await Post.create({ title, content, user });

        // Associate the post with the user
        const findUser = await User.findById({ _id: user });
        if (findUser) {
            findUser.posts.push(SavePost._id);
            await findUser.save();
        }

        // Respond with the created post
        res.status(201).json({
            msg: "Post Created",
            data: SavePost
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ msg: "Something went wrong" });
    }
});

// Blog User
userRoute.post('/blog', async (req, res) => {
    try {
        const { title, description, user , posts} = req.body;

        // Create and save the new post
        const SaveBlog = await Blog.create({ title, description, user,posts });

        // Associate the post with the user
        const findUser = await User.findById({ _id: user });
        if (findUser) {
            findUser.blogs.push(SaveBlog._id);
            await findUser.save();
        }

        // Respond with the created post
        res.status(201).json({
            msg: "Blog Created",
            data: SaveBlog
        });
    } catch (error) {
        console.log(error.message);
        res.status(400).json({ msg: "Something went wrong" });
    }
});

userRoute.get('/data',async(req,res)=>{
    const {userID}=req.body;
    const userData=await User.findById(userID).populate({
        path:'posts',
        match:{title:'Acting',} 
    }) 
    res.status(200).json({msg:"data Fetched",data:userData}) 
})


module.exports = { userRoute }
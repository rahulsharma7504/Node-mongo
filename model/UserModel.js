const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    createdAt: { type: Date, default: Date.now },
    posts: [{
      type:mongoose.Schema.Types.ObjectId,
      ref:'Post'
    }],

    blogs:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"Blog"
    }] 
});


const PostSchema = new mongoose.Schema({
   title: { type: String, required: true },
   content: { type: String, required: true },
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now }
});

 
const BlogSchema = new mongoose.Schema({  
   title: { type: String, required: true },
   description: { type: String, required: true },
   user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
   posts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Post' }],
   createdAt: { type: Date, default: Date.now },
   updatedAt: { type: Date, default: Date.now } 
});

const Blog = mongoose.model('Blog', BlogSchema);
const User = mongoose.model('User', UserSchema);
const Post = mongoose.model('Post', PostSchema);




module.exports = {
   User,
   Post,
   Blog
};

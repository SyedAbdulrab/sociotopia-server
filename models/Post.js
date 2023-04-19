import mongoose from "mongoose";


const postSchema = mongoose.Schema({
    userId: {type:String, required:true},
    description:{
        type:String,
        required:true
    },
    firstName: {
        type:String,
        required:true
    },
    lastName: {
        type:String,
        required:true
    },
    location:String,
    description:String,
    picturePath:String,
    userPicturePath: String,
    likes : { // more performance oriented if you have a huge amount of likes, here it will be O(1) but for an array of object ids it will be O(n)
        type: Map,
        of: Boolean,
    },
    comments:{
        type: Array,
        default:[],
    }
},
{timestamps:true}
)

const Post = mongoose.model("Post",postSchema);

export default Post;
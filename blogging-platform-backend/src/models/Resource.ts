import mongoose,{Schema,Document} from "mongoose"
import {IUser} from "./User";



export interface IBlog extends Document{
    title:"string";
    content:string;
    author: IUser["_id"];
}

const BlogSchema = new Schema<IBlog>(
    {
        title :{
            type:String,
            required:true,
            trim:true,
        },
        content:{
         type:String,
         required:true,
        },
        author:{
            type:mongoose.Schema.Types.ObjectId,
            ref: "User",
            required:true,
        },
    },
    {
        timestamps:true,
    }
)

const Blog = mongoose.model<IBlog>("Blog",BlogSchema);
export default Blog;
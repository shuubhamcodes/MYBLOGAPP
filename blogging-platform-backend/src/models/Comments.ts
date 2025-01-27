import mongoose ,{Schema,Document,ObjectId} from "mongoose";
import {IUser} from "./User"
import { IBlog } from "./Resource";



export interface IComment extends Document{
    content:string;
    author: IUser["_id"];
    blog: IBlog["_id"];
    createdAt: Date;
    updatedAt: Date;
}

const CommentSchema = new Schema<IComment>({
    content:{
     type:String,
     required:true,
     trim:true,
     minlength:1,
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required: true,
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Blog",
        required:true
    },
},
    {
        timestamps:true,
    }


)

const comment = mongoose.model<IComment>("Comment", CommentSchema);
export default comment
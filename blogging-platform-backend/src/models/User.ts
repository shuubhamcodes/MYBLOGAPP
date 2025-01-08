import mongoose, { ObjectId, Schema } from "mongoose"
import bcrypt from "bcryptjs"

export interface IUser extends Document {
    _id:ObjectId;
    username:string;
    email:string;
    password:string;
    comparePassword:(candidatePassword:string)=>Promise<boolean>;
}
const UserSchema = new Schema<IUser>({
    username:{
        type:String,
        require:true,
        unique:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,

    },
    password:{
        type:String,
        required:true,
        minLength:6,
    }
},
{
    timestamps:true,
}

);


UserSchema.pre("save", async function (next) {
    const user = this as IUser; // Explicitly cast `this` as IUser
    if (!this.isModified || !this.isModified("password")) {
      return next();
    }
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    next();
})


UserSchema.methods.comparePassword = async function(candidatePassword:string){
    return bcrypt.compare(candidatePassword, this.password);
}

const User = mongoose.model<IUser>("User",UserSchema);
export default User;
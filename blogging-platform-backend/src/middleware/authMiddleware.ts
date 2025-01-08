import{Request,Response,NextFunction} from"express"
import jwt from "jsonwebtoken";

export const authMiddleware=(req:Request, res:Response ,next: NextFunction)=>{
    const token = req.header("Authorization")?.replace("Bearer","")
    if(!token){
        return res.status(401).json({error:"unauthorized"})
    }


try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as{id:"string"};
    req.user ={id:decoded.id};
    next();

}catch(err){
    return res.status(401).json({error:"Invalid token"})
}
}
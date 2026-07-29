import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;




export const Middleware= (req: Request, res: Response, next: NextFunction) => {

  const Token = req.headers["authorization"];
  

  if (!Token) {
    return res.status(401).json({ success: false, message: "Access token required" });
  }

  try {
    const decoded = jwt.verify(Token,JWT_SECRET as string) 
    if ( !decoded){
        return res.status(400).json({
            message : "Invalid jwt " 
        })
    }
    //@ts-ignore
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid or expired token" });
  }
};
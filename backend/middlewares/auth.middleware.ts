import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";



interface JwtPayload {
  userId: string;
}

export function middleware(req: Request,res: Response,next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized"
    });
  }
    
  try {
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET as string) as JwtPayload;

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(403).json({
      message: "Invalid token"
    });
  }
}
import { Request, Response } from "express"
import { signinSchema } from "../../schemas/userInputValidation"
import bcrypt from "bcrypt" ;
import  jwt  from "jsonwebtoken"
import { prisma } from "../../database/prisma/db";





export const signinController = async (req: Request, res: Response) => {


 
    const inputData = signinSchema.safeParse(req.body);
    if (!inputData.success) {
        return res.status(400).json({
            message: "signin input validation failed"
        })
    }

      try {
        const { email, password} = inputData.data;


    const emailDb = await  prisma.user.findFirst ({
        where : {
             email : email
        }
    })

       if ( !emailDb){
        return res.status(400).json({
            message : "try another email this not exist in our database "
        })
       }

        const hashedPassword = await bcrypt.compare(password , emailDb.password)
       if ( !hashedPassword){
        return res.status(400).json({
            message : "Password did not match  "
        })
       }

       
       const token  = jwt.sign({
        userId : emailDb.id
         }, 
        process.env.JWT_SECRET as string)


        return res.status(200).json({
            token : token ,
            message:"User successfully logged in",
            id : emailDb.id,
            username:emailDb.username,
            email: emailDb.email
        })

    } catch (error) {
        console.log(error, "error comes in signInPage");
    }


}
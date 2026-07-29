import { Request, Response } from "express"
import bcrypt from "bcrypt"
import { signupSchema } from "../../schemas/userInputValidation";
import { prisma } from "../../database/prisma/db";



export const signupController = async (req: Request, res: Response) => {

    const inputData = signupSchema.safeParse(req.body);

    if (inputData.error) {
        return res.status(400).json({
            message: "signin input validation failed"
        })
    }

    try {
        const { username , email , password} = inputData.data;

        const hashedPassword = await bcrypt.hash(password, 10);

        const emailDb = await prisma.user.findFirst({
            where : {
                email : email
            }
        })

        if (emailDb){
            return res.status(400).json({
                message: "This email already registered"
            })
        }
        let db = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                email : email
            }
        })

        return res.status(200).json({
            message: `Congratulations to signup ${db.username} ` ,
            username : db.username ,
            email : db.email
              
    })
    } catch (error) {
        console.log(error, "error comes in signupPage");

    }


}
import { prisma } from "../../database/prisma/db";
import { createRoomSchema } from "../../schemas/roomInputValidation"
import { Request , Response } from "express";


export const createRoomController = async (req:Request , res:Response)=>{

    const inputValidion = createRoomSchema.safeParse(req.body);
    if (!inputValidion.success) {
        return res.status(400).json({
            message:" inputValidion while createing Room "
        })
    }
    
    const userId = req.userId;
    if (!userId) {
    return res.status(401).json({
    message: "Unauthorized"
   })
}
   try {
    const roomDb = await prisma.room.create({
        data : {
            slug : inputValidion.data.name,
            adminId : userId
        }
    })
    res.status(200).json({
    roomId: roomDb.id,
    roomName: roomDb.slug,
    message: "created room successfully"
     })
   } catch (error) {
       res.status(403).json({
      message: "Romm name should be unique"
   })
   }
}
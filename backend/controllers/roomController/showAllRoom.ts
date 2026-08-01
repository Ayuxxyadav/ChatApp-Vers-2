import { prisma } from "../../database/prisma/db";
import { createRoomSchema } from "../../schemas/roomInputValidation"
import { Request , Response } from "express";


export const showAllRoomController = async (req:Request , res:Response)=>{

    const userId = req.userId;
    if (!userId) {
    return res.status(401).json({
    message: "Unauthorized"
   })
}
   try {
    const roomDb = await prisma.room.findMany({
        where : {
            adminId : userId
        },
        orderBy :{
            createdAt : "desc"
        },
        take:50,
    })

    if (!roomDb) {
      return res.status(404).json({ message: "No rooms found" });
    }
    res.status(200).json({
    allRooms : roomDb,
    message: "fetched all  room successfully"
     })
   } catch (error) {
       res.status(403).json({
      message: "Problem occur in fetching all list of room "
   })
   }
}
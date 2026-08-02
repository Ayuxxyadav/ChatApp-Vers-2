import { WebSocketServer , WebSocket } from "ws";
import Redis from "ioredis";
import jwt from "jsonwebtoken"

import { prisma } from "../database/prisma/db";

interface User{
  userId : string ,
  rooms:string[],
  ws : WebSocket 
}

const users:User[] = [] ;

const membersCount = new Map<string , number >();

function checkToḱen(token:string){
  try {
       const decoded = jwt.verify(token,process.env.JWT_SECRET as string)
      if (typeof decoded == "string"){
        return null ;
      } 
      if (!decoded  || !decoded.userId){
        return null ;
      }
   return decoded.userId ;
   }catch (error) {
    console.log(error+"Token unauthenticated");
   } 
}


export function startWebSocketServer() {
 
  const pub = new Redis();
  const sub = new Redis();
  const wss = new WebSocketServer({port:8080});

  pub.on("error",(err)=>console.error("Redish pub error :"+ err));
  sub.on("error",(error)=>console.error("Redish err on sub :"+ error));

  async function subscribeToRoom(roomId:string){
    const count = membersCount.get(roomId) || 0 ;
    
    if ( count === 0 ){
     await sub.subscribe(`room:${roomId}`)
    }else{
      membersCount.set(roomId, count+1);
    }
  }
   async function unsubscribeToRoom(roomId:string) {
    const count = membersCount.get(roomId) || 0
    if ( count <= 1){
      membersCount.delete(roomId);
      await sub.unsubscribe(`room:${roomId}`)
    }else{
       membersCount.set(roomId,count-1);
    }
   }


   sub.on("message", (message)=>{
    const data = JSON.parse(message);
    users.forEach(user => {
      if(user.rooms.includes(data.roomId)){
        user.ws.send(JSON.stringify(data));
      }
    })
   })


   wss.on("connection",(ws, request)=>{
    const url = request.url;
    if ( !url){
      ws.close();
      return ;
    }
    const searchParams = new URLSearchParams(url.split('?')[1]);
    const token = searchParams.get("token") || "";
    const userId = checkToḱen(token);

    if (userId == null){
          ws.close();
          return ;
    }

    users.push({userId:userId,ws ,rooms:[]});
     
   
    ws.on('message', async function message(data) {
      let parsedData:any;
      try {
       parsedData = JSON.parse(data as unknown as string)
      } catch (error) {
        console.log("meesage data is not parsed or empty "+error);
        return ;
      }
      if (parsedData.type == "join_room"){
        const roomId = String(parsedData.roomId);
        const user = users.find(x =>x.ws==ws);
        if(!user)return ;
        if(!user.rooms.includes(roomId)){
          user.rooms.push(roomId);
        }
        await subscribeToRoom(roomId);
      }

      if ( parsedData.type =="leave_room"){
        let parsedData : any ;
        try {
          const roomId = String(parsedData.roomId );
          const user = users.find(x=>x.ws == ws);
          if(!user){
            console.log("user not found type leave_room");
            return ;
          }
          user.rooms = user.rooms.filter(x=>x !==roomId);
          await unsubscribeToRoom(roomId);
        } catch (error) {
          console.log("error occurs in while leaving room "+error);
        }
      }
      
      if ( parsedData.type == 'chat'){
        const roomId = String(parsedData.roomId);
        try {
          await prisma.chat.create({
            data : {
              roomId : roomId,
              message : parsedData.message,
              userId :userId
            }
          })
          console.log("db successfully saved the chats");
          
        } catch (error) {
          console.log("error occurs while saving the chats in db");
          return ;
        }
        await pub.publish(`roomId${roomId}`,JSON.stringify({
          type : "chat",
          message : parsedData.message,
          roomId
        }))
        console.log("message published via pub ");
        
      }

    })
     ws.on("close",()=>{
      const index = users.findIndex(u => u.ws===ws);
      if ( index !== -1) {
        const user = users[index];
         user?.rooms.forEach(roomId=>unsubscribeToRoom(roomId)) 
       users.splice(index, 1);
      }
     })
     ws.send("pong");
  })
   console.log("connected to websocket 8080 port ");
   
}



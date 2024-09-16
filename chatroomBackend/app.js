const express = require("express");
const { createServer } = require("http");
const { userInfo } = require("os");
const socketIo=require('socket.io')
const app = express();
const httpServer = createServer(app);
const io=socketIo(httpServer,{
    cors:{
        origin:'*'
    }
})
let count=0
let members=[]
io.on("connection", (socket) => {
    count++
    console.log(`有前端介入了`);
    socket.on('join',(userInfo) => {
    let findone=members.findIndex(item=>item.name===userInfo.name)
    console.log('打印已存在的index',findone);
    if(findone!==-1){
        members[findone].uid=socket.id
    }else{
       userInfo.uid=socket.id
        members.push(userInfo)
 
    }
       console.log('打印members长度',members.length);
       
        socket.broadcast.emit("welcome",members);
        socket.emit("myself",members);
    });

    socket.on('message', (msg) => {
        // console.log('打印服务器返回的消息', msg)
        socket.broadcast.emit("backMsg",msg);

      })

  socket.on('sendPrivate', sendform=>{
    console.log('打印oto的sendform',sendform); 
    // const targetSocket = io.sockets.get(sendform.id)
    console.log('打印私聊时候的人数',members.length);
    
    socket.to(sendform.id).emit('backPrivateMsg',sendform)
    // console.log('打印target',targetSocket);
    

   })
   

      socket.on("disconnect", () => {

        console.log('有老哥离开了ta叫做:',socket);
        count--
        let findone=members.findIndex(item=>item.uid===socket.id)
        console.log('打印已经退出的index',findone);
        members.splice(findone,1)
        console.log('打印断开删除后的数组长度',members.length);

        socket.broadcast.emit("welcome",members);
        
      });
});
httpServer.listen(3008,()=>{
    console.log('启动服务器127.0.0.1:3008成功');
    
});

app.listen(3000,()=>{
    console.log('启动服务器3000端口成功');
    
})
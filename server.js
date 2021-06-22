const express=require('express');
const app=express();
const http=require('http');
const socketio=require('socket.io');
const path=require('path');
const server = http.createServer(app);
const formatMsg=require('./utils/formatMsg.js')

const {userJoin,getUser,leaveUser,getRoomuser}=require('./utils/users.js')
const io=socketio(server);


//static methods
app.use(express.static(path.join(__dirname,"public")))

//connecting to client
io.on("connection",socket=>{
    console.log("Connection established")
    socket.on("joinRoom",({userName,roomName})=>{
        const user=userJoin(socket.id,userName,roomName);
        socket.join(user.roomName);
        socket.emit("message",formatMsg("Chit-Chatter(Admin)","Welcome to the Room"))

        //client joined
        socket.broadcast.to(user.roomName).emit("message",formatMsg("Chit-Chatter(Admin)",`${user.userName} joined the room`))

    })

    
    
    //listening message
    socket.on("chatMessage",message=>{
        const user=getUser(socket.id);

        io.to(user.roomName).emit("message",formatMsg(`${user.userName}`,message))
    })

    //client disconnected
    socket.on("disconnect",()=>{
        const user=leaveUser(socket.id);
        if(user){
            io.to(user.roomName).emit("message",formatMsg("Chit-Chatter(Admin)",`${user.userName} Disconnected from the room`))
        }
        
    })

})

app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"public/HomePage.html"))
})
app.get("/chatRoom",(req, res)=>{
    res.sendFile(path.join(__dirname,"public/chatRoom.html"))
})







const PORT =3000||process.env.PORT
server.listen(PORT,() => {
    console.log(`listening on port${PORT}`);
})


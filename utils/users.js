const users=[];

//join user to chatApp

function userJoin(id,userName,roomName){
    const user={id,userName,roomName}

    users.push(user);
    return user;
}


function getUser(id){
    return users.find(user => user.id === id);
}

function leaveUser(id){
    const index=users.findIndex(user => user.id === id);
    if(index!==-1){
        return users.splice(index,1)[0];
    }
}

function getRoomuser(roomName){
    return users.filter(user=> user.roomName === roomName)
}
module.exports={userJoin,getUser,leaveUser,getRoomuser}
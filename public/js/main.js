const socket = io();
const form = document.getElementById("chatForm");
const chatMessage = document.querySelector(".msger-chat")

const { userName, roomName } = Qs.parse(location.search, {
    ignoreQueryPrefix: true
})

// console.log(userName)
// //joinChat

socket.emit("joinRoom", { userName, roomName })

socket.on("message", message => {
    // console.log(message);
    outputMessage(message);

    //scroll
    chatMessage.scrollTop = chatMessage.scrollHeight;

})

form.addEventListener("submit", e => {
    e.preventDefault();

    const message = e.target.elements.msg.value;
    socket.emit("chatMessage", message);
    e.target.elements.msg.value = "";
    e.target.elements.msg.focus();
})

function outputMessage(message) {
    // console.log(message);
    // console.log(message.username.localeCompare(userName));
    let num = message.username.localeCompare(userName)
    let num1= message.username.localeCompare("Chit-Chatter(Admin)")
    const div = document.createElement("div");
    if (num == 0) {
        console.log("IN if statement");
        div.classList.add("msg", "right-msg");
        div.innerHTML = `<div
class="msg-img"
style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)"
></div>

<div class="msg-bubble">
<div class="msg-info">
<div class="msg-info-name">${message.username}</div>
<div class="msg-info-time">${message.time}</div>
</div>

<div class="msg-text">
${message.text}
</div>
</div>`;
        chatMessage.appendChild(div);
    }
    else if(num1==0){
        console.log("IN admin  statement");
        div.classList.add("msg", "center-msg");
        div.innerHTML=`<div class="msg center-msg">
                            <div class="msg-bubble">
                                <div class="msg-text">
                                    ${message.text}
                                </div>
                            </div>
                        </div>
        `
        chatMessage.appendChild(div);
    }
    else {
        div.classList.add("msg", "left-msg");
        div.innerHTML = `<div
class="msg-img"
style="background-image: url(https://image.flaticon.com/icons/svg/145/145867.svg)"
></div>

<div class="msg-bubble">
<div class="msg-info">
<div class="msg-info-name">${message.username}</div>
<div class="msg-info-time">${message.time}</div>
</div>

<div class="msg-text">
${message.text}
</div>
</div>`;
        chatMessage.appendChild(div);

    }


}

//adding room ID in header

const div = document.createElement("div");
div.classList.add("msger-header-title");
div.innerHTML = `<div class="msger-header-title"> <h2 id="heading">RoomID:${roomName}</h2>
               </div>`
document.querySelector(".msger-header").appendChild(div);
const div1 = document.createElement("div");

div1.classList.add("msger-header-options");
div1.innerHTML=`<div class="msger-header-\options">
                    <span> <a href="HomePage.html" class="msger-leave-btn">Leave Room</a></span>
               </div>`
document.querySelector(".msger-header").appendChild(div1);

const socket = io(); 
const welcome = document.getElementById("welcome")
const room = document.getElementById("room")
const form = welcome.querySelector("form")

room.hidden = true
let roomName;

function addMessage(message){
    const ul = room.querySelector("ul")
    const li = document.createElement("li")
    li.innerText = message
    ul.appendChild(li)
}

function handleMessageSubmit(event){
    event.preventDefault()
    const input = room.querySelector("#msg input")
    const value = input.value
    socket.emit("new_message", input.value, roomName, () =>{
        addMessage(`You: ${value}`)
    })
    input.value = ""
}

function handleNickNameSubmit(event){
    event.preventDefault()
    const input = room.querySelector("#name input")
    socket.emit("nickname", input.value)
}

function showRoom(){
    welcome.hidden = true
    room.hidden = false
    const h3 = room.querySelector("h3");
    h3.innerText= `Room ${roomName}`
    const msgForm = room.querySelector("#msg")
    const nameForm = room.querySelector("#name")
    msgForm.addEventListener("submit", handleMessageSubmit)
    nameForm.addEventListener("submit", handleNickNameSubmit)
}

function handleRoomSubmit(event){
    event.preventDefault();
    const input = form.querySelector("input") // querySelector: 첫번째로 일치하는 요소를 준다. 
    socket.emit("enter_room", input.value, showRoom);
    roomName = input.value 
    input.value = ""
}
form.addEventListener("submit", handleRoomSubmit);

socket.on("welcome", (user) => {
    addMessage(`${user} joined!`)
})
socket.on("bye",(left)=>{
    addMessage(`${left} left!`)
})
socket.on("new_message", addMessage);

socket.on("room_change", (rooms)=> {
    const roomList = welcome.querySelector("ul")
    roomList.innerHTML = "";
    if(rooms.length === 0) return // painting시 목록이 비어있으면 아무것도 안한다.
    rooms.forEach((room)=>{
        const li = document.createElement("li")
        li.innerText = room;
        roomList.append(li);
    })
});
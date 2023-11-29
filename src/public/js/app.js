const messageList = document.querySelector('ul')
const messageForm = document.querySelector('form')


const socket = new WebSocket(`ws://${window.location.host}`) // http://localhost:3000
socket.addEventListener("open", ()=>{ console.log("Connected to Server ✅"); })
socket.addEventListener("message", (message)=>{ console.log(`New message: ${message.data}`); })
socket.addEventListener("close", ()=>{ console.log("Disconnected to Server ❌");})
// socket.addEventListener("message", (message)=>{ console.log(`Just got this: ${message.data} from the server`); })
// setTimeout(()=> { socket.send("Hello ~ 👋🏻 from the Browser")}, 5000)


// 프론트에서는 브라우저의 이벤트 리스너로부터 받은 글자를 뽑아서 백엔드로 보내준다.
// 백엔드에서 받아서 다시 프론트에 보낸다. 프론트는 받은 글자를 콘솔창에 찍는다.
// 한 개의 서버가 서로 다른 두 브라우저로 메시지를 받고 있고 그 메시지에 답장을 하고 있다.
// 현재는 서로 다른 브라우저가 메시지를 주고받지 못한다. 
messageForm.addEventListener("submit", (event)=> {
    event.preventDefault()
    const input = messageForm.querySelector('input');
    socket.send(input.value)
    input.value = "";
})

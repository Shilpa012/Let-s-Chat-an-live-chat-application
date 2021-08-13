const socket = io('http://localhost:3000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('message');
const messageContainer = document.querySelector('.container');
const tone=new Audio('tone.mp3');

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.appendChild(messageElement);
    if(position==='left'){
        tone.play();
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault(); //preventdefault() stop reloading the page
    const message = messageInput.value;
    append(`you :${message}`, 'right');
    socket.emit('send-message', message);
    messageInput.value = "";
})
const name = prompt("Enter your name to join the chat");
socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} joined the chat`, 'right');
})

socket.on('receive-message', data => {
    append(`${data.name} : ${data.message}`, 'left');
})

socket.on('left', name => {
    append(`${name} left the chat`, 'left');
})
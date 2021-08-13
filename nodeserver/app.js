//This is our node server which will handle socket.io connections

const io = require("socket.io")(3000);
const users = {};

io.on('connection', socket => {
    socket.on('new-user-joined', name => {// nwe-user-joined is an event 
        users[socket.id] = name;
        console.log('new user', name);
        socket.broadcast.emit('user-joined', name); //broadcast. emit() give notification to other people

    })
    socket.on('send-message', message => {
        socket.broadcast.emit('receive-message', { message: message, name: users[socket.id] });
    })

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    })
})





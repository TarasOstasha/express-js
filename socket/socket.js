const Chat = require('../models/chat');

module.exports = (socket)=>{
    console.log('socket connection');
    //socket.broadcast.emit('news', { 1 : 1 });
    socket.on('client-msg', (msg)=>{
      console.log(msg);
      const new_message = new Chat({
        text: msg,
        date: new Date(),
        role: 'client',
        img: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg'
      })
      new_message.save();
      socket.emit('message-finish',  new_message );

    })

    socket.on('command', async (command)=>{
        console.log('command', command)
        if(command == 'get-all-messages') socket.emit('all-messages', await Chat.find({}))
    })
  }
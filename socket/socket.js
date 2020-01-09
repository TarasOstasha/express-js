const Chat = require('../models/chat');
const Session = require('../models/session');

module.exports = (socket)=>{
    console.log('socket connection');
    //socket.broadcast.emit('news', { 1 : 1 });
    socket.on('create', function (room) {
        socket.join(room);
    });
    socket.on('client-msg', (msg)=>{
      console.log(msg);
      const new_message = new Chat({
        text: msg.msg,
        session: msg.session,
        date: new Date(),
        role: 'client',
        img: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg'
      })
      new_message.save();
      socket.emit('message-finish',  new_message );

    })

    socket.on('manager-msg', (msg)=>{
        //console.log(msg);
        const new_message = new Chat({
            text: msg.msg,
            session: msg.session,
            date: new Date(),
            role: 'manager',
            img: 'https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg'
        })
        new_message.save();
        socket.emit('message-finish',  new_message );
    })


    socket.on('get-all-messages', async(session)=>{
        //console.log('get-all-messages')
        socket.emit('all-messages', await Chat.find({ session: session }))
    })

    socket.on('get-all-session', async()=>{
       // console.log('get-all-session')
        socket.emit('all-session', await Session.find({}))
    })
  }




  //read about room web socket
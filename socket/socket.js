const Chat = require('../models/chat');
const Session = require('../models/session');
const http = require('http');

/**
 * Create socket server.
 */
var serverIo = http.createServer();
var io = require('socket.io')(serverIo);
//var socket = io('http://localhost:4200', {transports: ['websocket', 'polling', 'flashsocket']});

//io.set('origins', 'http://localhost:4200');
io.on('connection', (socket) => {
  console.log('socket connection');
  //socket.broadcast.emit('news', { 1 : 1 });
  socket.on('create', function (room) {
    socket.join(room);
  });
  socket.on('first-client-msg', async (msg)=>{
    createClientMsg(msg);
    console.log('1', msg)
    await Session.findOneAndUpdate({ fingerPrint: msg.session }, { userName: msg.userName });
  })
  socket.on('client-msg', (msg) => {
    createClientMsg(msg);
  })

  socket.on('manager-msg', (msg) => {
    //console.log(msg);
    const new_message = new Chat({
      text: msg.msg,
      session: msg.session,
      date: new Date(),
      role: 'manager',
      img: 'https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg',
      isReadManager: true
    })
    new_message.save();
    socket.emit('message-finish', new_message);
    socket.to(msg.session).emit('message-finish', new_message)
  })


  socket.on('get-all-messages', async (session) => {
    //console.log('get-all-messages', session)
    socket.join(session);
    socket.emit('all-messages', await Chat.find({ session: session }))
  })

  socket.on('get-all-session', async () => {
    // console.log('get-all-session')
    socket.emit('all-session', await Session.find({}))
  })

  socket.on('remove-session', async (fingerPrint) => {
    await Session.findOneAndRemove({ fingerPrint });
    socket.emit('refresh-session-list');
  })

  socket.on('mark-as-red', async (msgIdList, session, role)=>{
    console.log('1', session)

    const promises = msgIdList.map( async (_id)=> await Chat.findByIdAndUpdate(
      { _id }, 
      (role == 'client') ? { isReadClient: true } : (role == 'manager') ? { isReadManager: true } : {} 
    ) );
    await Promise.all(promises);
    //socket.emit('all-messages', await Chat.find({ session: session }));
    socket.to(session).emit('all-messages', await Chat.find({ session }) );

  })

  socket.on('clear-messages', async (session)=>{
    console.log('1234')
    await Chat.deleteMany({ session })
    socket.emit('all-messages', await Chat.find({ session }));
  })

  socket.on('typing', (session, role)=>{
    console.log('typing', session, role)
    socket.to(session).emit('typing-from-back', role );
    //socket.emit('typing-from-back', role );
  })

  function createClientMsg(msg) {
    console.log('message from client', msg);
    const new_message = new Chat({
      userName: msg.userName,
      text: msg.msg,
      session: msg.session,
      date: new Date(),
      role: 'client',
      img: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg',
      isReadClient: true
    })
    new_message.save();
    socket.emit('message-finish', new_message);
    socket.to(msg.session).emit('message-finish', new_message)
    console.log('new_message', new_message)
  }

});

serverIo.listen(3001);

module.exports = {};




//error when you open in another pc
//messages not uncount when you read msg



  //read about room web socket
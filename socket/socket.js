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
  socket.on('client-msg', (msg) => {
    console.log('message from client', msg);
    const new_message = new Chat({
      text: msg.msg,
      session: msg.session,
      date: new Date(),
      role: 'client',
      img: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg'
    })
    new_message.save();
    socket.emit('message-finish', new_message);
    socket.to(msg.session).emit('message-finish', new_message)
    console.log('new_message', msg)
  })

  socket.on('manager-msg', (msg) => {
    //console.log(msg);
    const new_message = new Chat({
      text: msg.msg,
      session: msg.session,
      date: new Date(),
      role: 'manager',
      img: 'https://i.pinimg.com/originals/ac/b9/90/acb990190ca1ddbb9b20db303375bb58.jpg'
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

  socket.on('mark-as-red', async (msgIdList, session)=>{
    console.log('1', session)
    const promises = msgIdList.map( async (_id)=> await Chat.findByIdAndUpdate({ _id }, { isRed: true }) );
    await Promise.all(promises);
    socket.emit('all-messages', await Chat.find({ session: session }));
  })


});

serverIo.listen(3001);

module.exports = {};







  //read about room web socket
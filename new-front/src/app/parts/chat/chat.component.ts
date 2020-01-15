import { Component, OnInit, ViewChild, ElementRef, ChangeDetectorRef } from '@angular/core';
import { StorageService } from '../../services/storage.service';

declare const socket;
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.less']
})
export class ChatComponent implements OnInit {
  @ViewChild('scrollMe') private myScrollContainer: ElementRef;

  chatMessages = [
    {
      img: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg',
      text: 'Hi, how are you samim?',
      date: '8:40 AM, Today',
      role: 'client',
    },
    {
      img: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg',
      text: 'Hi, how are you samim?',
      date: '8:40 AM, Today',
      role: 'manager',
    }

  ]
  currentMsg: String;
  oldMsgLength: Number;

  constructor( private storage: StorageService, private cdr: ChangeDetectorRef ) { }
  collapsed: boolean = true;


  ngOnInit() {
    this.goToRoom();
    this.scrollToBottom();
    this.getAllMessages();

    socket.on('reload-msg-list', this.getAllMessages());

    socket.on('message-finish', (new_message)=>{
      console.log(new_message);
      this.cdr.detectChanges(); // force rebinding
      this.chatMessages.push( new_message );
      console.log(this.chatMessages)
    })
    socket.on('all-messages', (allMessages)=>{
      this.chatMessages = allMessages;
      this.cdr.detectChanges(); // force rebinding
      //this.chatMessages.push(...allMessages);
      console.log('allMessages chat - ', allMessages)
    })
    console.log(this.usDate(new Date()))
  }


  usDate(date) {
    if(typeof date == 'string') { date = new Date(date) }

    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var min = date.getMinutes();
    var hour = date.getHours();
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();

    //return day + ' ' + monthNames[monthIndex] + ' ' + year;

    return hour + ':'  + min + ' | ' + day + ' ' + monthNames[monthIndex] + ' ' + year;

  }

  sendMsgEnter(event) {
    if(event.keyCode == 13){ this.sendMsg() }
  }

  async sendMsg() {
    const message = {
      msg: this.currentMsg,
      session: await this.storage.getItem('session')
    }
    console.log();
    socket.emit('client-msg', message);
    this.currentMsg = ''
  }

  async getAllMessages() {
    if(!await this.storage.getItem('session')) return 
    socket.emit('get-all-messages', await this.storage.getItem('session'))
    //socket.emit('get-all-messages', fingerPrint)
  }

  // scroll to bottom chat
  scrollToBottom(): void {
    try {
        console.log(this.myScrollContainer.nativeElement.scrollTop, this.myScrollContainer.nativeElement.scrollHeight)
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
  }

  collapse() {
    this.collapsed = !this.collapsed
  }

  async goToRoom() {
    socket.emit('create', await this.storage.getItem('session'))
  }

  async redMsg() {
    socket.emit('mark-as-red', this.checkNewMsg(), await this.storage.getItem('session') )
    console.log(this.checkNewMsg())

  }

  checkNewMsg() {
    const unRedMsg = [];
    console.log('1 - ', this.chatMessages)
    this.chatMessages.map((msg: any)=>{
      if(!msg.isRed) unRedMsg.push(msg._id);
       console.log('2 - ', msg.isRed)

    })
    console.log('3 - ', unRedMsg);
    return unRedMsg;
  }

}


//чому в нас 2 старих а не нові повідомлення
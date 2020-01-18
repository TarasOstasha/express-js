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
    // {
    //   img: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg',
    //   text: 'Hi, how are you samim?',
    //   date: '8:40 AM, Today',
    //   role: 'client',
    // },
    // {
    //   img: 'https://static.turbosquid.com/Preview/001292/481/WV/_D.jpg',
    //   text: 'Hi, how are you samim?',
    //   date: '8:40 AM, Today',
    //   role: 'manager',
    // }

  ]
  currentMsg: String;
  oldMsgLength: Number;

  constructor(private storage: StorageService, private cdr: ChangeDetectorRef) { }
  collapsed: boolean = true;
  flagName: boolean = false;
  oponentTyping: boolean = false;

  ngOnInit() {
    this.goToRoom();
    this.scrollToBottom();
    this.getAllMessages();

    socket.on('reload-msg-list', this.getAllMessages());

    socket.on('message-finish', (new_message) => {
      console.log(new_message);
      this.cdr.detectChanges(); // force rebinding
      this.chatMessages.push(new_message);
      console.log(this.chatMessages)
    })
    socket.on('all-messages', (allMessages) => {
      this.chatMessages = allMessages;
      this.cdr.detectChanges(); // force rebinding
      //this.chatMessages.push(...allMessages);
      console.log('allMessages chat - ', allMessages)
    })
    console.log(this.usDate(new Date()))

    socket.on('typing-from-back', (role)=>{
      console.log('typing from back')
      this.oponentTyping = true;
      setTimeout(()=> this.oponentTyping = false, 1000 );
      this.cdr.detectChanges(); // force rebinding
    })
  }


  usDate(date) {
    if (typeof date == 'string') { date = new Date(date) }

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

    return hour + ':' + min + ' | ' + day + ' ' + monthNames[monthIndex] + ' ' + year;

  }

  async typing(event) {
    if (event.keyCode == 13) { this.sendMsg() }
    else socket.emit('typing', await this.storage.getItem('session'), 'client');
    
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
    if (!await this.storage.getItem('session')) return
    socket.emit('get-all-messages', await this.storage.getItem('session'))
    //socket.emit('get-all-messages', fingerPrint)
  }

  // scroll to bottom chat
  scrollToBottom(): void {
    try {
      console.log(this.myScrollContainer.nativeElement.scrollTop, this.myScrollContainer.nativeElement.scrollHeight)
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  collapse() {
    this.collapsed = !this.collapsed
  }

  async goToRoom() {
    socket.emit('create', await this.storage.getItem('session'))
  }

  async readMsg() {
    socket.emit('mark-as-red', this.checkNewMsg(), await this.storage.getItem('session'), 'client')
    console.log(this.checkNewMsg())

  }

  checkNewMsg() {
    const unRedMsg = [];
    // console.log('1 - ', this.chatMessages)
    this.chatMessages.map((msg: any) => {
      if (!msg.isRead) unRedMsg.push(msg._id);
      // console.log('2 - ', msg.isRed)

    })
    // console.log('3 - ', unRedMsg);
    return unRedMsg;
  }



  async togglePreview(event) {
    const userName = event.target.value;
    if (event.keyCode == 13) {
      const message = {
        userName: userName,
        msg: 'Client Name: ' + userName,
        session: await this.storage.getItem('session')
      }
      //this.flagName = !this.flagName;
      socket.emit('first-client-msg', message);
    }
  }

  async clearMsg() {
    socket.emit('clear-messages', await this.storage.getItem('session'))
  }

  // async session() {
  //   return await this.storage.getItem('session');  // in progress
  // }

}


//move data from input to backend and DB
//put name into html another component(manager)
//if name already used -> hide block name initialization
//stop scroll 
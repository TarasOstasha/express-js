import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
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

  constructor( private storage: StorageService ) { }

  ngOnInit() {
    this.scrollToBottom();
    this.getAllMessages();
    socket.on('message-finish', (new_message)=>{
      console.log(new_message);
      this.chatMessages.push( new_message );
      console.log(this.chatMessages)
    })
    socket.on('all-messages', (allMessages)=>{
      this.chatMessages.push(...allMessages);
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
    
    socket.emit('command', { 
      session: await this.storage.getItem('session'), 
      command: 'get-all-messages'
    })
  }

  // scroll to bottom chat
  scrollToBottom(): void {
    try {
        console.log(this.myScrollContainer.nativeElement.scrollTop, this.myScrollContainer.nativeElement.scrollHeight)
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

}

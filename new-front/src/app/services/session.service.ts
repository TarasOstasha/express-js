import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private api: ApiService) { }

  //3 set user
  setUser(fromServer) {
    if(fromServer.user) localStorage.setItem('user', JSON.stringify(fromServer.user));
    else console.log('set user aborted because not exist');
  }
  getUser() {
    return new Promise((res, rej) => {
      const json = localStorage.getItem('user');
      console.log(json, undefined, typeof(json));
      // undefined
      if(json == 'undefined') this.removeUser() ; 
      // ...
      if (json && json !== 'undefined') {
        console.log('json', json)
        res(JSON.parse(json));
      }

      this.api.getSessionInfo().subscribe((fromServer: any) => {
        if (fromServer.user) { this.setUser(fromServer); res(fromServer)} //if session
        else { //if no session
            res('fakeUser or message about you are not logged')
        }
        
      },
        (err) => rej(err));
    })

  }
  removeUser() {
    localStorage.removeItem('user'); //check if it is correct writing
  }
  //2 request to server get user if session keep
  // async getUserFromServer() : Promise<void>{
  //   this.api.getSessionInfo().subscribe((fromServer: any)=>{
  //     if(!fromServer.user) {
  //       console.log('session false')
  //       return 'no ssesion';
  //     }else {
  //       console.log(fromServer, 'session user')
  //       return 'from server';
  //     }
  //   },(err)=>{
  //     console.log(err)
  //   })
  // }

}

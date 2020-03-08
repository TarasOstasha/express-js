import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class SessionService {

  constructor(private api: ApiService) { }

  //3 set user
  setUser(fromServer) {
    if (fromServer.user) localStorage.setItem('user', JSON.stringify(fromServer.user));
    else console.log('set user aborted because not exist');
  }

  async getUser() {
    try {
      //if user exist -> return user
      const json = localStorage.getItem('user');
      if (json == 'undefined') this.removeUser(); // clean garbage
      if (json && json !== 'undefined') return JSON.parse(json); // if json exist

      //if not exist user -> get user from back
      const fromServer: any = await this.api.getSessionInfo();
      console.log(' session - from server user ', fromServer )
      if (fromServer.user) { //if session 
      console.log(' session - if user ')
        this.setUser(fromServer);
        return fromServer.user
      } else return ('no session') //if no session

    } catch (error) {
      throw error;
    }
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

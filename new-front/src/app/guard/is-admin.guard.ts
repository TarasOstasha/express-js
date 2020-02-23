import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import appState from '../app-state';
import { Router } from '@angular/router';
import { SessionService } from '../services/session.service';

@Injectable({
  providedIn: 'root'
})

export class IsAdminGuard implements CanActivate {
  appState: any = appState;

  constructor(private router: Router, private session: SessionService,) {

  }


  async canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ) {
    const user: any = await this.session.getUser();
    if (user.role == 'admin') {
      console.log('guard admin')
      return true;
    }
    else {
      console.log(user.role, 'guard user')
      this.router.navigate(['/auth']);
      
      return
    }
  }


}

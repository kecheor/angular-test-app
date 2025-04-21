import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserQuery } from '../state/auth/user.query';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private userQuery: UserQuery, private router: Router) {}

  canActivate() {
    if(this.userQuery.isAuthenticated)
        return true;

    this.router.navigate(['/login']);
    return false;
  }
}

@Injectable({
    providedIn: 'root'
  })
  export class LoginGuard implements CanActivate {
    constructor(private userQuery: UserQuery, private router: Router) {}
  
    canActivate() {
      if(!this.userQuery.isAuthenticated)
          return true;
  
      this.router.navigate(['/']);
      return false;
    }
  }
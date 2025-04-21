import { Component } from '@angular/core';
import { UserQuery } from '../state/user.query';
import { UserService } from '../state/user.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-current-user',
  imports: [AsyncPipe],
  templateUrl: './current.component.html',
  styleUrl: './current.component.css'
})
export class CurrentUserComponent {
  constructor(private userQuery: UserQuery, private userService: UserService) {}

  get currentUser() {
    return this.userQuery.currentUser$;
  }

  logout() {
    this.userService.logout();
  }
}

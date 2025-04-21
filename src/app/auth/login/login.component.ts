import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../state/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, AsyncPipe]
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  errorMessage: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  ngOnInit() {
    this.errorMessage.subscribe({
      next: (errorMessage) => {
        console.log('login error', { errorMessage });
      }
    });
  }

  onInputChange() {
    this.errorMessage.next(null);
  }

  onSubmit(form: NgForm) {
    this.userService
      .login(form.value.email, form.value.password)
      .pipe(first())
      .subscribe({
        next: () => {
          form.reset();
          this.router.navigate(['/notes']);
        },
        error: (error: Error) => {
          const message = error.toString();
          console.error('Message', message);
          this.errorMessage.next(message);
        }
      });
  }
}

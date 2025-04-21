import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../../state/auth/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [NgIf, FormsModule]
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  errorMessage: string | null =null;

  onInputChange() {
    this.errorMessage = null;
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
        error: (error) => {
          this.errorMessage = error;
        }
      });
  }
}

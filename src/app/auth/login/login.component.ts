import { Component } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../state/user.service';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [FormsModule, ReactiveFormsModule]
})
export class LoginComponent {
  constructor(private userService: UserService, private router: Router) {}

  errorMessage: string | null = null;

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required])
  });

  ngOnInit() {
    this.form.valueChanges
      .subscribe({
        next: () => {
          this.errorMessage = null;
        }
      });
  }

  onSubmit() {
    if (this.form.invalid) {
      return;
    }
    this.userService
      .login(this.form.value.email || '', this.form.value.password || '')
      .pipe(first())
      .subscribe({
        next: () => {
          this.form.reset();
          this.router.navigate(['/notes']);
        },
        error: (error: Error) => {
          this.errorMessage = error?.toString() || 'Login failed!';
        }
      });
  }
}

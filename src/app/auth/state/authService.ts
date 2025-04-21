import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { of, throwError } from "rxjs";
import { catchError, delay, switchMap, tap } from "rxjs/operators";

@Injectable({providedIn: 'root'})
export class AuthService {
  
    constructor(private http: HttpClient) {}

  login(email: string, password: string) {
 //   if (password.length < 6) {
//      return throwError(() => new Error('Password must be at least 6 characters long'));
//    }

    return this.http.post<{token: string}>('/auth/login', { email, password })
        .pipe(
            switchMap(response => !!response ? of(response) : throwError(() => new Error('Login failed'))),
            switchMap(response => of(response.token))
        );
  }
}

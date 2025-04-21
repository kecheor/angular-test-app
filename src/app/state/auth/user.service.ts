import { UserStore } from "./user.store";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { AuthService } from "./authService";
import { map, tap } from "rxjs/operators";
import { Observable } from "rxjs";

@Injectable({ providedIn: "root" })
export class UserService {
  constructor(private userStore: UserStore, private authService: AuthService) {}

  login(email: string, password: string): Observable<User> {
   return this.authService.login(email, password)
    .pipe(
        map((token: string) => ({
            email,
            token
        } as User)),
        tap((user: User) => this.userStore.addActiveUser(user)),
        tap(() => console.log(this.userStore)),
        tap((user: User) => console.log("User logged in:", user.email))
    );
  }

  logout() {
    this.userStore.reset();
  }
}


import { Injectable, Query } from "@angular/core";
import { UserStore, UserState } from "./user.store";
import { QueryEntity } from "@datorama/akita";
import { map, Observable } from "rxjs";
import { User } from "./user.model";


@Injectable({
    providedIn: 'root'
  })
  export class UserQuery extends QueryEntity<UserState> {
   currentUser$ = this.selectActive(user => user.email);
   isAuthenticated$ = this.select(state => !!state.active);
   token$: Observable<string | undefined> = this.selectActive(user => user.token);
  
    constructor(store: UserStore) {
      super(store);
    }

    get isAuthenticated() {
      return this.hasActive();
    }
  }
  
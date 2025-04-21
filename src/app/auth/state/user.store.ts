import { User } from './user.model';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Injectable } from '@angular/core';
import { persistState } from '@datorama/akita';

export interface UserState extends EntityState<User, string>, ActiveState {}

const initialState: UserState = {
  active: null,
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'user', idKey: 'email', resettable: true })
export class UserStore extends EntityStore<UserState> {
  constructor() {
    super(initialState);
  }

  addActiveUser(user: User) {
    this.add(user);
    this.setActive(user.email);
  }
}

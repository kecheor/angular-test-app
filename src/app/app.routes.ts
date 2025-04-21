import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { NotesComponent } from './notes/notes.component';
import { AuthGuard, LoginGuard } from './auth/auth.guard';
export const routes: Routes = [
  { 
    path: 'login', 
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'notes', 
    component: NotesComponent,
    canActivate: [AuthGuard]
  },
  { 
    path: '**', 
    redirectTo: 'login' 
  }
];

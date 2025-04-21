import { NotesStore } from "./notes.store";
import { INote, NoteStatus } from "./notes.model";
import { Injectable } from "@angular/core";
import { guid } from "@datorama/akita";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { UserQuery } from "../../auth/state/user.query";
import { map, switchMap } from "rxjs/operators";
import { tap } from "rxjs/operators";
import { Observable } from "rxjs";
@Injectable({ providedIn: "root" })
export class NotesService {
  constructor(private notesStore: NotesStore, private http: HttpClient, private userQuery: UserQuery) { }

  private isErrorResponse(obj: HttpResponse<any>): obj is HttpResponse<{ error: string }> {
    return obj.status !== 200
      && typeof obj.body === 'object' 
      && obj.body !== null 
      && 'error' in obj.body 
      && typeof obj.body.error === 'string';
  }

  
  private post(url: string, token: string | undefined, body: any) {
    if (!token) {
      throw new Error('User is not authenticated');
    }
    return this.http.post<HttpResponse<INote | { error: string }>>(
      '/notes', 
      body, 
      { headers: { Authorization: `Bearer ${token}` },  observe: 'response' })
    .pipe(
      tap((response) => { console.log(response); }),
      map((response) => {
        if (this.isErrorResponse(response)) {
          throw new Error(response.body?.error ?? 'Unknown error');
        }
        return "ok!";
      })
    );
  }

  add(title: string, content: string) {
    return this.userQuery.token$.pipe(
      switchMap((token) => {
        return this.post('/notes', token, { title, content });
      }),
      tap(() => {
        const note = { id: guid(), title, content, createdAt: new Date(), status: NoteStatus.Active } as INote;
        this.notesStore.add(note);
      }
      ));
  }

  updateContent(note: INote, title: string, content: string) {
    return this.userQuery.token$.pipe(
      switchMap((token) => {
        return this.post('/notes', token, { title, content });
      }),
      tap(() => {
        this.notesStore.update(note.id, { id: note.id, title, content });
        this.notesStore.setActive(null);
      }
    ));
  }

  delete(note: INote) {
    return this.userQuery.token$.pipe(
      switchMap((token) => {
        return this.post('/notes', token, {id: note.id });
      }),
      tap(() => {
        this.notesStore.remove(note.id);
      }
    ));
   
  }

  toggleStatusFilter(showCompleted: boolean) {
    this.notesStore.update({
      filter: {
        showStatus: showCompleted ? null : NoteStatus.Active
      }
    });
  }

  toggleNoteStatus(note: INote) {
    const getNewStatus = (oldStatus: NoteStatus) => {
      switch (oldStatus) {
        case NoteStatus.Active:
          return NoteStatus.Completed;
        case NoteStatus.Completed:
          return NoteStatus.Active;
        default:
          return NoteStatus.Active;
      }
    }
    const getCompletedDate = (status: NoteStatus) => {
      if (status === NoteStatus.Completed) {
        return new Date();
      } else {
        return null;
      }
    }
    const newStatus = getNewStatus(note.status);
    const completedAt = getCompletedDate(newStatus);

    return this.userQuery.token$.pipe(
      switchMap((token) => {
        return this.post('/notes', token, {id: note.id });
      }),
      tap(() => {
        this.notesStore.update(note.id, { status: newStatus, completedAt });
      }
    ));
  }

  setActive(note: INote) {
    this.notesStore.setActive(note.id);
  }

  cancelActive() {
    this.notesStore.setActive(null);
  }
}
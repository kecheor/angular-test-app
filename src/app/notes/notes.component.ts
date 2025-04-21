import { Component, ViewEncapsulation } from '@angular/core';
import { NotesQuery } from '../state/notes/notes.query';
import { AsyncPipe } from '@angular/common';
import { NoteComponent } from './components/note/note.component';
import { EditNoteComponent } from './components/edit/edit.component';
import { NotesService } from '../state/notes/notes.service';
import { INote, Note } from '../state/notes/notes.model';
import { NoteStatus } from '../state/notes/notes.model';
import { map } from 'rxjs/operators';
import { UserQuery } from '../state/auth/user.query';
@Component({
  selector: 'app-notes',
  imports: [AsyncPipe, NoteComponent, EditNoteComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
  //encapsulation: ViewEncapsulation.None
})
export class NotesComponent {

  constructor(private notesQuery: NotesQuery, private notesService: NotesService, private userQuery: UserQuery) {}

  get currentUser() {
    return this.userQuery.currentUser$;
  }

  get notes() {
    return this.notesQuery.filtered$;
  }

  get activeNoteId(): string | undefined {
    let result: string | undefined;
    this.notesQuery.activeNoteId$.subscribe(id => {
      result = id;
    });
    return result;
  }

  get completedFilter() {
    return this.notesQuery.statusFilter$.pipe(
      map((status: NoteStatus | null) => status === null)
    );
  }

  toggleCompletedFilter(event: Event) {
    const showCompleted = (event.target as HTMLInputElement).checked ?? false;
    this.notesService.toggleStatusFilter(showCompleted);
  }

  addNote(newNote: { title: string, content: string }) {
    this.notesService.add(newNote.title, newNote.content);
  }

  updateNote(note: INote, update: { title: string, content: string }) {
    this.notesService.update(note.withContent(update.title, update.content));
  }

  toggleNoteEdit(note: INote | null) {
    note ? this.notesService.setActive(note) : this.notesService.cancelActive();
  }

  toggleNoteStatus(note: INote) {
    // this.notesService.toggleNoteStatus(note);
    const newStatus = () => {
      switch(note.status) {
        case NoteStatus.Active:
          return NoteStatus.Completed;
        case NoteStatus.Completed:
          return NoteStatus.Active;
        default:
          return NoteStatus.Active;
      }
    } 
    const updated = note.withStatus(newStatus());
    this.notesService.update(updated);
    console.log(note, updated);
  }
}

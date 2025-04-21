import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NotesQuery } from './state/notes.query';
import { AsyncPipe } from '@angular/common';
import { NoteComponent } from './components/note/note.component';
import { EditNoteComponent } from './components/edit/edit.component';
import { NotesService } from './state/notes.service';
import { INote } from './state/notes.model';
import { NoteStatus } from './state/notes.model';
import { delay, map, tap } from 'rxjs/operators';
import { CurrentUserComponent } from '../auth/current/current.component';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { guid } from '@datorama/akita';
@Component({
  selector: 'app-notes',
  imports: [AsyncPipe, NoteComponent, EditNoteComponent, CurrentUserComponent],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
  //encapsulation: ViewEncapsulation.None
})
export class NotesComponent {

  constructor(private notesQuery: NotesQuery, private notesService: NotesService) { }

  @ViewChild('newNote') newNote!: EditNoteComponent;

  error$: BehaviorSubject<string | null>= new BehaviorSubject<string | null>(null);
  private showError(message: string) {
    this.error$.next(message);
    setTimeout(() => {
      this.error$.next(null);
    }, 3000);
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
    this.notesService.add(newNote.title, newNote.content).subscribe({
      next: () => {this.newNote.title = "", this.newNote.content = ""},
      error: (error) => this.showError(error)
    });
  }

  updateNote(note: INote, update: { title: string, content: string }) {
    this.notesService.updateContent(note, update.title, update.content).subscribe({
      error: (error) => this.showError(error)
    });
  }

  deleteNote(note: INote) {
    this.notesService.delete(note).subscribe({
      error: (error) => this.showError(error)
    });
  }

  toggleNoteEdit(note: INote | null) {
    note ? this.notesService.setActive(note) : this.notesService.cancelActive();
  }

  toggleNoteStatus(note: INote) {
    this.notesService.toggleNoteStatus(note).subscribe({
      error: (error) => {
        console.error(error);
      }
    });;
  }
}

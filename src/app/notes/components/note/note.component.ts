import { DatePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BaseNoteComponent } from '../base/base.component';
import { NoteStatus, INote } from '../../state/notes.model';
import { NotesService } from '../../state/notes.service';
import { BehaviorSubject, finalize, first } from 'rxjs';

@Component({
  selector: 'app-note',
  imports: [DatePipe, BaseNoteComponent],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NoteComponent {
  @Input() note!: INote;
  @Output() error = new EventEmitter<string>();


  constructor(private notesService: NotesService) {
  }

  get noteColor() {
    switch (this.note.status) {
      case NoteStatus.Active:
        return '#fff675';
      case NoteStatus.Completed:
        return '#d5ff71';
    }
  }

  loading = new BehaviorSubject<boolean>(false);

  editNote(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.notesService.setActive(this.note);
  }

  deleteNote(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    if (this.loading.getValue()) return;
    this.loading.next(true);
    this.notesService.delete(this.note)
      .pipe(
        first(),
        finalize(() => this.loading.next(false))
      )
      .subscribe({
        error: (error: Error) => this.error.emit(error.message),
      });
  }

  toggleNoteStatus() {
    if (this.loading.getValue()) return;
    this.loading.next(true);
    this.notesService.toggleNoteStatus(this.note)
      .pipe(
        first(),
        finalize(() => this.loading.next(false))
      )
      .subscribe({
        error: (error: Error) => this.error.emit(error.message),
      });
  }
} 
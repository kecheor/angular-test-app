import { DatePipe } from '@angular/common';
import { Component, Input, Output, EventEmitter, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BaseNoteComponent } from '../base/base.component';
import { NoteStatus, INote } from '../../state/notes.model';
import { NotesService } from '../../state/notes.service';

@Component({
  selector: 'app-note',
  imports: [DatePipe, BaseNoteComponent],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NoteComponent {
  @Input() note!: INote;
  @Output() edit = new EventEmitter<INote>();
  @Output() toggle = new EventEmitter<INote>();
  @Output() delete = new EventEmitter<INote>();

  constructor()  {
  }

  get noteColor() {
    switch(this.note.status) {
      case NoteStatus.Active:
        return '#fff675';
      case NoteStatus.Completed:
        return '#d5ff71';
    }
  }

  editNote(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.edit.emit(this.note);
  }

  deleteNote(e: Event) {
    e.stopPropagation();
    e.preventDefault();
    this.delete.emit(this.note);
  }

  toggleNoteStatus() {
    this.toggle.emit(this.note);
  }

} 
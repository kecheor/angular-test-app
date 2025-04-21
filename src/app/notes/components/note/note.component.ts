import { Component, Input, CUSTOM_ELEMENTS_SCHEMA, Output, EventEmitter } from '@angular/core';
import { INote, NoteStatus } from '../../../state/notes/notes.model';
import { DatePipe } from '@angular/common';
import { NotesService } from '../../../state/notes/notes.service';
import { BaseNoteComponent } from '../base/base.component';
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

  constructor(private notesService: NotesService)  {
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

  toggleNoteStatus() {
    this.toggle.emit(this.note);
  }

} 
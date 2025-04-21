import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseNoteComponent } from '../base/base.component';
import { INote } from '../../state/notes.model';
import { NotesService } from '../../state/notes.service';
import { finalize, first, tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { AsyncPipe } from '@angular/common';
@Component({
  selector: 'app-edit-note',
  imports: [BaseNoteComponent, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditNoteComponent {

  private _note: INote | null = null;

  @Input() set note(value: INote | null) {
    this._note = value;
    this.title = value?.title ?? "";
    this.content = value?.content ?? "";
  }
  get note(): INote | null {
    return this._note;
  }
  @Output() error = new EventEmitter<string>();

  constructor(private notesService: NotesService) {
  }

  title = "";
  content = "";
  loading = new BehaviorSubject<boolean>(false);

  addNote() {
    return this.notesService.add(this.title, this.content);
  }

  updateNote(note: INote) {
    return this.notesService.updateContent(note, this.title, this.content);
  }

  saveNote() {
    if(this.loading.getValue()) return;
    if(this.title.length === 0) return;
    this.loading.next(true);
    (this._note ? this.updateNote(this._note!) : this.addNote())
      .pipe(
        first(),
        finalize(() => this.loading.next(false))
      )
      .subscribe({
        next: () => { this.cancelEdit() },
        error: (error: Error) => this.error.emit(error.message),
      });
  }

  cancelEdit() {
    if(this.loading.getValue()) return;
    this.notesService.cancelActive();
    this.title = this.note?.title ?? "";
    this.content = this.note?.content ?? "";
  }

}

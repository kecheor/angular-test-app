import { Component, CUSTOM_ELEMENTS_SCHEMA, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BaseNoteComponent } from '../base/base.component';
@Component({
  selector: 'app-edit-note',
  imports: [BaseNoteComponent, FormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush 
})
export class EditNoteComponent {
  @Input() newId: string | null = "";
  @Input() title: string = "";
  @Input() content: string = "";

 @Output() save = new EventEmitter<{title: string, content: string}>();
 @Output() cancel = new EventEmitter<void>();


  constructor() {
  }

  saveNote() {
    this.save.emit({title: this.title ?? "", content: this.content});
  }

  cancelEdit() {
    this.cancel.emit();
    this.title = "";
    this.content = "";
  }
  
}

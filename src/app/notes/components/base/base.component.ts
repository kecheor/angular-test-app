import { Component, Input, output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-base-note',
  imports: [],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
  encapsulation: ViewEncapsulation.None
})
export class BaseNoteComponent {
  @Input() color: string = '#DDD';
  
  click = output<void>();

  onClick() {
    this.click.emit();
  }
}

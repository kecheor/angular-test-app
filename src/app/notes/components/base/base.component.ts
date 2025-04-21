import { Component, Input, output, ViewEncapsulation } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-base-note',
  imports: [AsyncPipe],
  templateUrl: './base.component.html',
  styleUrl: './base.component.css',
  encapsulation: ViewEncapsulation.None
})
export class BaseNoteComponent {
  @Input() color: string = '#DDD';
  @Input() loading: Observable<boolean> = of(false);
  click = output<void>();

  onClick() {
    this.click.emit();
  }
}

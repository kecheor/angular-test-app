import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { NotesQuery } from './state/notes.query';
import { AsyncPipe } from '@angular/common';
import { NoteComponent } from './components/note/note.component';
import { EditNoteComponent } from './components/edit/edit.component';
import { NotesService } from './state/notes.service';
import { INote, NoteStatus } from './state/notes.model';
import { debounceTime, distinctUntilChanged, map, startWith} from 'rxjs/operators';
import { CurrentUserComponent } from '../auth/current/current.component';
import { BehaviorSubject, Observable, of, } from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-notes',
  imports: [AsyncPipe, NoteComponent, EditNoteComponent, CurrentUserComponent, ReactiveFormsModule],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
  //encapsulation: ViewEncapsulation.None
})
export class NotesComponent {

  constructor(private notesQuery: NotesQuery, private notesService: NotesService) { }

  @ViewChild('newNote') newNote!: EditNoteComponent;
  searchControl = new FormControl<string>('');
  
  error$: BehaviorSubject<string | null>= new BehaviorSubject<string | null>(null);
  showError(message: string) {
    this.error$.next(message);
    setTimeout(() => {
      this.error$.next(null);
    }, 3000);
  }

  ngOnInit() {
    this.notes =  this.notesQuery.filteredNotes(this.textFilter);
    this.activeNoteId = this.notesQuery.activeNoteId$;
  }
  
  textFilter = 
   this.searchControl.valueChanges.pipe(
    startWith(''),
    debounceTime(300),
    distinctUntilChanged(), 
    map((value: string | null) => value ?? ''),
    map((value: string) => value.trim()),
  );
  notes: Observable<INote[]> = of([]);
  activeNoteId: Observable<string | undefined> = of(undefined);

  // get activeNoteId(): string | undefined {
  //   let result: string | undefined;
  //   this.notesQuery.activeNoteId$.subscribe(id => {
  //     result = id;
  //   });
  //   return result;
  // }

  get completedFilter() {
    return this.notesQuery.statusFilter$.pipe(
      map((status: NoteStatus | null) => status === null)
    );
  }

  toggleCompletedFilter(event: Event) {
    const showCompleted = (event.target as HTMLInputElement).checked ?? false;
    this.notesService.toggleStatusFilter(showCompleted);
  }
}

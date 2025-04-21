import { Injectable } from '@angular/core';
import { NotesState, NotesStore } from './notes.store';
import { QueryConfig, QueryEntity } from '@datorama/akita';
import { combineLatestWith, map, tap} from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';
import { INote, NoteStatus } from './notes.model';


@Injectable({
  providedIn: 'root'
})
export class NotesQuery extends QueryEntity<NotesState> {
    constructor(store: NotesStore) {
        super(store);
    }

    activeNoteId$ = this.select(state => state.active?.toString());
    statusFilter$: Observable<NoteStatus | null> = this.select(state => state['filter'].showStatus);
    all$ = this.selectAll();
    filtered$ = this.all$.pipe(
        combineLatestWith(this.statusFilter$),
        map(([notes, status]) => {
            switch(status)
            {
                case NoteStatus.Active:
                    return notes.filter((note: INote) => note.status === NoteStatus.Active)
                default:
                    return notes
            }
        }
    ));


    filteredNotes(textFilter: Observable<string>) {
        return combineLatest([this.all$, this.statusFilter$, textFilter])
            .pipe(
                map(([notes, status, textFilter]) => {
                    const filterValue = textFilter.trim().toLowerCase();
                    if(textFilter.trim().length > 0) 
                    {
                        notes = notes.filter((note: INote) => 
                            note.title.toLowerCase().includes(filterValue) || note.content.toLowerCase().includes(filterValue));
                    }
                    if(status === NoteStatus.Active)
                    {
                        notes = notes.filter((note: INote) => note.status === NoteStatus.Active);
                    }
                    return notes;
                })
            );
    }
}

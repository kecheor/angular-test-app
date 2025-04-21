import { Injectable } from '@angular/core';
import { NotesState, NotesStore } from './notes.store';
import { QueryConfig, QueryEntity } from '@datorama/akita';
import { combineLatestWith, map} from 'rxjs/operators';
import { Observable } from 'rxjs';
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
                    return notes.filter((note: INote) => note.completedAt === null)
                case NoteStatus.Completed:
                    return notes.filter((note: INote) => note.completedAt !== null)
                default:
                    return notes
            }
        }
    )
);



        // filteredNotes$ = this.statusFilter$.pipe(
    //     switchMap((statusFilter: NoteStatus | null) => {
    //         return this.all$.pipe(
    //             filter((n: INote) => statusFilter === null || n.status === statusFilter)
    //         )
    //     })
    // )
}

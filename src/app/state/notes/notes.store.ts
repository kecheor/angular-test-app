import { INote, Note, NoteStatus } from './notes.model';
import { EntityState, EntityStore, StoreConfig, ActiveState } from '@datorama/akita';
import { Injectable } from '@angular/core';

export interface NotesState extends EntityState<INote, string>, ActiveState {
    filter: {
        showStatus: NoteStatus | null
    }
}

const initialState: NotesState = {
  active: null,
  entities: {  },
  filter: {
    showStatus: NoteStatus.Active 
  }
};

@Injectable({
  providedIn: 'root'
})
@StoreConfig({ name: 'notes' })
export class NotesStore extends EntityStore<NotesState> {
  constructor() {
    super(initialState);
    this.add(new Note('Note 1', 'Content 1'));
    this.add(new Note('Note 2', 'Content 2'));
    this.add(new Note('Note 3', 'Content 3'));
  }
}

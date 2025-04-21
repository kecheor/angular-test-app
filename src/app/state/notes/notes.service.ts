import { NotesStore } from "./notes.store";
import { INote, Note, NoteStatus } from "./notes.model";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class NotesService {
  constructor(private notesStore: NotesStore) {}

  add(title: string, content: string) {
    const note = new Note(title, content);
    this.notesStore.add(note);
  }

  update(note: INote) {
    this.notesStore.replace(note.id, note);
    this.notesStore.setActive(null);
  }

  delete(id: string) {
    this.notesStore.remove(id);
  }

  toggleStatusFilter(showCompleted: boolean) {
    this.notesStore.update({
        filter: {
            showStatus: showCompleted ? null : NoteStatus.Active
        }
    });
  }

  toggleNoteStatus(note: INote) {
    const newStatus = () => {
        switch(note.status) {
          case NoteStatus.Active:
            return NoteStatus.Completed;
          case NoteStatus.Completed:
            return NoteStatus.Active;
          default:
            return NoteStatus.Active;
        }
      } 
      
    const updated = note.withStatus(newStatus());
    console.log(note, updated);
    this.notesStore.replace(note.id, note);
  }

  setActive(note: INote) {
    this.notesStore.setActive(note.id);
  }

  cancelActive() {
    this.notesStore.setActive(null);
  }
}

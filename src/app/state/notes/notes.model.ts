import { guid } from '@datorama/akita';

export enum NoteStatus {
  Active = 'active',
  Completed = 'completed',
}

export interface INote {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  completedAt: Date | null;
  status: NoteStatus;

  isCompleted(): boolean;
  
  withContent(title: string, content: string): INote
  withStatus(status: NoteStatus): INote;
};



export class Note implements INote {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  completedAt: Date | null;
  status: NoteStatus;

  constructor(title: string, content: string) {
    this.id = guid();
    this.title = title;
    this.content = content;
    this.createdAt = new Date();
    this.completedAt = null;
    this.status = NoteStatus.Active;
  }

  withContent(title: string, content: string): INote {
    return {...this, title, content};
  }

  withStatus(status: NoteStatus): INote {
    const clone = {...this};
    clone.status = status;
    if(status === NoteStatus.Completed) {
        clone.completedAt = new Date();
    } else {
        clone.completedAt = null;
    }
    return clone;
  }
  isCompleted(): boolean {
    return this.status === NoteStatus.Completed;
  }
}
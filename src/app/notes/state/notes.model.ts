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
};

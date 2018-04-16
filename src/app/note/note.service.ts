import { Injectable } from '@angular/core';

import { Note } from './note';
import { NOTE_ITEMS } from '../../api/note-data';

@Injectable()
export class NoteService {
  pItems: Note[] = NOTE_ITEMS;
  counter: number = NOTE_ITEMS.length;

  constructor() { }

  getNotesFromData(): Note[] {
    return this.pItems;
  }
  addNote(note: Note) {
    this.pItems.push(Object.assign(note, {id: this.counter + 1}));
  }
  updateNote(note: Note) {
    const index = this.pItems.map(x => x.id).indexOf(note.id);
    this.pItems[index] = note;
  }
  deleteNote(note: Note) {
    this.pItems.splice(this.pItems.indexOf(note), 1);
  }
}

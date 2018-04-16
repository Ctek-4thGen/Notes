import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Note } from './note';
import { NoteService } from './note.service';

export enum SaveMode {
  None,
  New,
  Edit
}

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  formGroup: FormGroup;
  notes: Note[];
  saveMode: SaveMode = SaveMode.None;
  headerText: string;

  constructor(private _noteService: NoteService, private _formBuilder: FormBuilder) {
    this.formGroup = _formBuilder.group({
      'id': '',
      'name': '',
      'notes': '',
      'color': ''
    });
  }

  ngOnInit() {
    this.getNotes();
  }

  getNotes() {
    this.notes = this._noteService.getNotesFromData();
  }

  saveNote(note: Note) {
    if (note.id) {
      this._noteService.updateNote(note);
    } else {
      this._noteService.addNote(note);
    }
    this.saveMode = SaveMode.None;
  }

  removeNote(note: Note) {
    this._noteService.deleteNote(note);
  }

  cancelEditNote() {
    this.formGroup.reset();
    this.saveMode = SaveMode.None;
  }

  showEditForm(note: Note) {
    if (!note) {
      return;
    }
    this.saveMode = SaveMode.Edit;
    this.headerText = 'Edit Note';
    const editedNote = note;
    this.formGroup.setValue(editedNote);
  }

  showNewForm() {
    this.formGroup.reset();
    this.saveMode = SaveMode.New;
    this.headerText = 'New Note';
  }

  showForm() {
    return this.saveMode !== SaveMode.None;
  }

  // applyLocale(due) {
  //   return new DatePipe(navigator.language).transform(due, 'y-MM-dd');
  // }
}

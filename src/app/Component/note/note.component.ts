import { Component, Input, OnInit } from '@angular/core';
import { NoteService } from '../../Services/note/note.service';
import { FormsModule } from '@angular/forms';
import { ILesson, INote } from '../../Models/lesson';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent  {

  @Input() lesson!: ILesson;
  newNoteContent: string = '';

  constructor() {}

  addNote(): void {
    if (this.newNoteContent.trim() !== '') {
      const newNote: INote = { id: Math.floor(Math.random() * 1000), content: this.newNoteContent };
      this.lesson.notes.push(newNote);
      this.newNoteContent = '';
    }
  }

}

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
  // @Input() videoId!: number; // Assuming each video has an ID
  // videoNotes: INote[] = [];
  // newNoteContent: string = '';

  // constructor(private noteService: NoteService) { }

  // ngOnInit(): void {
  //   this.loadNotes();
  // }

  // loadNotes(): void {
  //   // Fetch existing notes for the video from the backend
  //   this.noteService.getNotesForVideo(this.videoId)
  //     .subscribe(notes => {
  //       this.videoNotes = notes;
  //     });
  // }

  // addNote(): void {
  //   if (this.newNoteContent.trim() !== '') {
  //     const newNote: INote = { id: 0, content: this.newNoteContent };
  //     // Save the new note to the database
  //     this.noteService.addNoteToVideo(this.videoId, newNote)
  //       .subscribe(() => {
  //         // If successful, update the UI with the new note
  //         this.videoNotes.push(newNote);
  //         this.newNoteContent = '';
  //       });
  //   }
  // }


  ///////////
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

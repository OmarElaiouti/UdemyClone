import { Component, Input, OnInit } from '@angular/core';
import { NoteService } from '../../Services/note/note.service';
import { FormsModule } from '@angular/forms';
import { INote } from '../../Models/lesson';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [FormsModule,],
  templateUrl: './note.component.html',
  styleUrl: './note.component.css'
})
export class NoteComponent implements OnInit {
  @Input() videoId!: Number; // Input property to receive videoId from parent component
  notes: INote[] = [];
  newNote: string = '';

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.fetchNotes();
  }

  fetchNotes() {
    this.noteService.getNotes(this.videoId).subscribe(notes => {
      this.notes = notes;
    });
  }

  addNote() {
    if (this.newNote.trim() !== '') {
      this.noteService.addNote(this.videoId, this.newNote.trim()).subscribe(() => {
        this.fetchNotes();
        this.newNote = '';
      });
    }
  }
  // deleteNote(index: number) {
  //   const noteId = this.notes[index];
  //   // Pass videoId and noteId to the service method
  //   this.noteService.deleteNote(this.videoId, noteId).subscribe(() => {
  //     this.fetchNotes();
  //   });
  // }
}

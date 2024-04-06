import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ILesson, INote, ISection, IVideoLesson } from '../../Models/lesson';

@Injectable({
  providedIn: 'root'
})
export class VideoLessonService {

  // private apiUrl = 'YOUR_API_ENDPOINT'; // Replace this with your API endpoint

  // constructor(private http: HttpClient) { }

  // getVideoLessons(): Observable<IVideoLesson> {
  //   return this.http.get<IVideoLesson>(this.apiUrl);
  // }

  sections: ISection[] = [
    {
      sectionId: 1,
      sectionName: 'Section 1',
      totalLessons: 2,
      totalMinutes: 75,
      lessons: [
        {
          lessonId: 1,
          lessonName: 'Lesson 1',
          lessonTimeInMinutes: 30,
          lessonVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          inCompleted: false,
          notes: [
            { id: 1, content: 'Note 1 content' }
          ]
        },
        {
          lessonId: 2,
          lessonName: 'Lesson 2',
          lessonTimeInMinutes: 45,
          lessonVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          inCompleted: true,
          notes: [
            { id: 2, content: 'Note 2 content' }
          ]
        }
      ]
    }
  ];

  constructor() { }

  addNoteToLesson(sectionId: number, lessonId: number, newNote: INote): void {
    const sectionIndex = this.sections.findIndex(section => section.sectionId === sectionId);
    if (sectionIndex !== -1) {
      const lessonIndex = this.sections[sectionIndex].lessons.findIndex(lesson => lesson.lessonId === lessonId);
      if (lessonIndex !== -1) {
        this.sections[sectionIndex].lessons[lessonIndex].notes.push(newNote);
      }
    }
  }

  addLessonToSection(sectionId: number, newLesson: ILesson): void {
    const sectionIndex = this.sections.findIndex(section => section.sectionId === sectionId);
    if (sectionIndex !== -1) {
      this.sections[sectionIndex].lessons.push(newLesson);
    }
  }

}

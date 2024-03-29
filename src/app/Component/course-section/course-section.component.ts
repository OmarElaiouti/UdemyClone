import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-course-section',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-section.component.html',
  styleUrl: './course-section.component.css'
})
export class CourseSectionComponent {
  expandedItems: { [key: string]: boolean } = {};

  toggleCollapse(collapseId: string): void {
    this.expandedItems[collapseId] = !this.expandedItems[collapseId];
  }

  isExpanded(collapseId: string): boolean {
    return this.expandedItems[collapseId] || false;
  }


  sections=[
    {id:1,sectionName:'course content',lectureNum:4,time:21,
    Lessons:[
      {id:1,LessonName:'Leeson 1',LessonTime:'00:04'},
      {id:1,LessonName:'Leeson 1',LessonTime:'00:04'},
      {id:1,LessonName:'Leeson 1',LessonTime:'00:04'},
      {id:1,LessonName:'Leeson 1',LessonTime:'00:04'},

    ]
  },
  {id:2,sectionName:'course conten',lectureNum:4,time:21,
    Lessons:[
      {id:1,LessonName:'Lesson 2',LessonTime:'00:04'},
      {id:1,LessonName:'Lesson 2',LessonTime:'00:04'},
      {id:1,LessonName:'Lesson 2',LessonTime:'00:04'},
      {id:1,LessonName:'Lesson 2',LessonTime:'00:04'},

    ]
  },
  ]
}

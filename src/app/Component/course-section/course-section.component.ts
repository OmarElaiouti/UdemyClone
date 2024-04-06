import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Icollaps } from '../../Models/icollaps';
import { CourseDetailsService } from '../../Services/Course-Details/course-details.service';
import { ActivatedRoute } from '@angular/router';

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
    {sectionId:1,sectionName:'course content',totalLessons:4,totalMinutes:21,courseId:1,
    Lessons:[
      {LessonId:1,LessonName:'Leeson 1',lessonTimeInMinutes:'00:04',lessonVideo:'',
      // {sectionId:1,LessonName:'Leeson 1',LessonTime:'00:04'},
      // {sectionId:1,LessonName:'Leeson 1',LessonTime:'00:04'},
      // {sectionId:1,LessonName:'Leeson 1',LessonTime:'00:04'},
      notes:[{
        id:1,
        content:'',
      }]}
    ]
  },
  {sectionId:1,sectionName:'course content',totalLessons:4,totalMinutes:21,courseId:1,
    Lessons:[
      {LessonId:1,LessonName:'Leeson 2',lessonTimeInMinutes:'00:04',lessonVideo:'',isCompeleted:'',
      // {id:1,LessonName:'Lesson 2',LessonTime:'00:04'},
      // {id:1,LessonName:'Lesson 2',LessonTime:'00:04'},
      // {id:1,LessonName:'Lesson 2',LessonTime:'00:04'},
      notes:[{
        id:1,
        content:''
      }]}
    ]
  },
  ]
  IsEneolled:boolean = true;
  courseId!:number;
  constructor(private coursedetailsService:CourseDetailsService,private route:ActivatedRoute){}
  section!:Icollaps;
  ngOnit():void{
    this.courseId = this.route.snapshot.params['id'];
    this.Sections();
  }
  Sections(){
    this.coursedetailsService.getSection(this.courseId).subscribe(
      (data:any)=>{
        this.section = data.section;
        this.IsEneolled=data.IsEneolled;

      }
    )
  }
}


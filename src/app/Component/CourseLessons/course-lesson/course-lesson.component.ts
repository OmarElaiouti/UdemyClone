import { Component, ElementRef, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FooterComponent } from "../../footer/footer.component";
import { ProgressBarModule } from 'primeng/progressbar';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { AccordionModule } from 'primeng/accordion';
import { VgCoreModule } from '@videogular/ngx-videogular/core';
import { VgControlsModule } from '@videogular/ngx-videogular/controls';
import { VgOverlayPlayModule } from '@videogular/ngx-videogular/overlay-play';
import { VgBufferingModule } from '@videogular/ngx-videogular/buffering';
import { FormsModule } from '@angular/forms';
import { OverviewComponent } from '../../overview/overview.component';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval, switchMap } from 'rxjs';
import { NoteComponent } from "../../note/note.component";
import { CommentComponent } from "../../comment/comment.component";
import { AnnouncementComponent } from "../../announcement/announcement.component";
import { Review2Component } from "../../review2/review2.component";
import { VideoLessonService } from '../../../Services/videoLesson/video-lesson.service';
import { ICourseSectionsData, ILesson, ISection } from '../../../Models/lesson';
import { ILessonStatus } from '../../../Models/ILessonStatus';




@Component({
    selector: 'app-course-lesson',
    standalone: true,
    templateUrl: './course-lesson.component.html',
    styleUrl: './course-lesson.component.css',
    imports: [FooterComponent,
        AccordionModule,
        OverlayPanelModule,
        ProgressBarModule,
        VgCoreModule,
        VgControlsModule,
        VgOverlayPlayModule,
        VgBufferingModule,
        FormsModule,
        OverviewComponent,
        MatCardModule,
        NoteComponent,
        AnnouncementComponent,
        Review2Component,
        RouterModule,
        CommentComponent]
})

export class CourseLessonComponent implements OnInit,OnDestroy{
  course!:ICourseSectionsData;
  sections:ISection[]=this.course.sections;
  videoItems: ILesson[] = [];
  courseId!:number;
  lesseonStatus!:ILessonStatus[];

  constructor(private router:Router ,
    private http: HttpClient,
    private lessons:VideoLessonService,
  private route:ActivatedRoute) {

    this.extractLessons();
      }

     

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.courseId = +params['id']; // Convert to number
    });  
    this.lessons.FillSections(this.courseId).subscribe(respone => {
      this.course = respone;
    });
    
   

  }

  ngOnDestroy(): void {
    // Populating lesseonStatus array
    this.videoItems.forEach(i => {
      this.lesseonStatus.push({
        lessonId: i.lessonId,
        isCompleted: i.isCompleted
      });
    });

    // Calling SetLesoonsStatus method and subscribing to the response
    this.lessons.SetLesoonsStatus(this.courseId, this.lesseonStatus).subscribe(response => {
      // Handle response if needed
    });
  }

  circleSize = 40;
  value = '30';
  videoCount = 0;
  showCertificate = true;
  watchedLessons: number = 0;
  totalLessons: number = 0;

  


  toggleAccordion(accordionId: string) {
    const accordionContent = document.getElementById(accordionId);
    if (accordionContent) {
      accordionContent.classList.toggle("active");
    }
  }

  

  loadVideo(videoUrl: string) {
    const videoPlayer = document.getElementById('singleVideo') as HTMLVideoElement;
    videoPlayer.src = videoUrl;
    videoPlayer.load();
    
    // Find the lesson corresponding to the provided videoUrl
    this.selectedLesson = this.videoItems.find(lesson => lesson.lessonVideo === videoUrl) || null;
  }

  updateWatchedStatus(lesson:any) {
    lesson.isCompleted = !lesson.isCompleted; 

    this.watchedLessons = this.videoItems.filter(lesson => lesson.isCompleted).length;

  }

  // Extract lessons from sections

 

  private extractLessons(): void {
    this.sections.forEach(section => {
      this.videoItems.push(...section.lessons);
    });
  }

  activeIndex = 0;
  currentVideo = this.videoItems[this.activeIndex];
  data: any;

  videoPlayerInit(data: any) {
    this.data = data;
    this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
    this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  }

  nextVideo() {
    this.activeIndex++;
    if (this.activeIndex === this.videoItems.length) {
      this.activeIndex = 0;
    }
    this.currentVideo = this.videoItems[this.activeIndex];
  }

  initVdo() {
    this.data.play();
  }

  startPlaylistVdo(item: any, index: number) {
    this.activeIndex = index;
    this.currentVideo = item;
  }

  ///////////////

  ///////////////
  progressBarHidden: boolean = true;

  toggleProgressBar() {
    this.progressBarHidden = !this.progressBarHidden;
  }

  ///////////////
 

// constructor( private router:Router ,private http: HttpClient) {

// }


progress: number = 0; // Declare the progress property
completed: boolean = false;



// calculateProgress(): number {
//   const totalLessons = this.videoItems.reduce((total, videoItems) => {
//     return total + videoItems.length;
//   }, 0);
//   if (totalLessons === 0) {
//     return 0;
    
//   }
//   this.progress = (this.watchedLessons / totalLessons) * 100;
//   this.completed = this.progress >= 100;
//   return (this.watchedLessons / totalLessons) * 100;

// }
calculateProgress(): number {
  const totalLessons = this.videoItems.length; // Corrected to get the total number of lessons
  if (totalLessons === 0) {
    return 0;
  }
  
  // Calculate progress
  this.progress = (this.watchedLessons / totalLessons) * 100;

  // Determine if all lessons are completed
  this.completed = this.progress >= 100;

  return this.progress;
}


  navigateToCertificate() {
    this.router.navigate(['/certificate']); // Navigate to certificate page
  }

/////////////////
selectedLesson: ILesson | null = null;




}

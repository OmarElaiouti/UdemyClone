import { Component, ElementRef, Inject, ViewChild } from '@angular/core';
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
import { QComponent } from "../../q/q.component";
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Subscription, interval, switchMap } from 'rxjs';
import { NoteComponent } from "../../note/note.component";
import { CommentComponent } from "../../comment/comment.component";
import { AnnouncementComponent } from "../../announcement/announcement.component";
import { Review2Component } from "../../review2/review2.component";
import { ILesson, INote, ISection, IVideoLesson } from '../../../Models/lesson';



const note1: INote = { id: 1, content: 'Note 1 content' };
const note2: INote = { id: 2, content: 'Note 2 content' };
const note3: INote = { id: 3, content: 'Note 3 content' };

// Sample data for lessons with notes
const lesson3: ILesson = {
  lessonId: 3,
  lessonName: 'Lesson 3',
  lessonTimeInMinutes: 30,
  lessonVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  inCompleted: false,
  notes: [note3]
};
const lesson1: ILesson = {
  lessonId: 1,
  lessonName: 'Lesson 1',
  lessonTimeInMinutes: 30,
  lessonVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  inCompleted: false,
  notes: [note1]
};

const lesson2: ILesson = {
  lessonId: 2,
  lessonName: 'Lesson 2',
  lessonTimeInMinutes: 45,
  lessonVideo: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  inCompleted: true,
  notes: [note2]
};

// Sample data for sections with lessons
const section1: ISection = {
  sectionId: 1,
  sectionName: 'Section 1',
  totalLessons: 2,
  totalMinutes: 75,
  lessons: [lesson1, lesson2]
};

const section2: ISection = {
  sectionId: 2,
  sectionName: 'Section 2',
  totalLessons: 1,
  totalMinutes: 60,
  lessons: [lesson3] // Example of reusing lesson2 in another section
};

// Sample data for a video lesson
const videoLesson: IVideoLesson = {
  courseId: 1,
  section: [section1, section2]
};


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
        VgBufferingModule, FormsModule, OverviewComponent,
        MatCardModule, NoteComponent, CommentComponent, AnnouncementComponent, Review2Component, QComponent]
})

export class CourseLessonComponent {
  // circleSize = 40;
  // value = '30';
  // videoCount = 0;
  // showCertificate = true;
  // watchedLessons: number = 0; // Declare watchedLessons property
  // totalLessons: number = 0; // Declare totalLessons property

  // toggleAccordion(accordionId: string) {
  //   const accordionContent = document.getElementById(accordionId);
  //   if (accordionContent) {
  //     accordionContent.classList.toggle("active");
  //   }
  // }

  // sections: any[] = [
  //   {
  //     title: 'Introduction',
  //     numsection: [{ num: 1 }, { num: 2 }],
  //     lessons: [
  //       {videoId:1, title: '1. Video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', watched: false, time: 22 },
  //       {videoId:2, title: '2. Video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', watched: false, time: 55 },
  //       {videoId:3, title: '3. Video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', watched: false, time: 32 },
  //     ],
  //   },
  //   {
  //     title: 'Accordion 2',
  //     lessons: [
  //       {videoId:4, title: '4. Video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', watched: false, time: 30 },
  //       {videoId:5,
  //         title: '5. Video',
  //         url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  //         watched: false,
  //         time: 35,
  //       },
  //       {videoId:6, title: '6. Video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', watched: false, time: 60 },
  //     ],
  //   },
  // ];


  // loadVideo(videoUrl: string) {
  //   const videoPlayer = document.getElementById('singleVideo') as HTMLVideoElement;
  //   videoPlayer.src = videoUrl;
  //   videoPlayer.load();
  // }

  // updateWatchedStatus() {
  //   this.watchedLessons = this.sections.reduce((total, section) => {
  //     return total + section.lessons.filter((lesson: Lesson) => lesson.watched).length;
  //   }, 0);
  // }

 

  // videoItems = [
  //   {
  //     name: 'Video one',
  //     src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  //     type: 'video/mp4',
  //   },
  //   {
  //     name: 'Video two',
  //     src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  //     type: 'video/mp4',
  //   },
  //   {
  //     name: 'Video three',
  //     src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
  //     type: 'video/mp4',
  //   },
  // ];

  // activeIndex = 0;
  // currentVideo = this.videoItems[this.activeIndex];
  // data: any;


  // videoPlayerInit(data: any) {
  //   this.data = data;
  //   this.data.getDefaultMedia().subscriptions.loadedMetadata.subscribe(this.initVdo.bind(this));
  //   this.data.getDefaultMedia().subscriptions.ended.subscribe(this.nextVideo.bind(this));
  // }

  // nextVideo() {
  //   this.activeIndex++;
  //   if (this.activeIndex === this.videoItems.length) {
  //     this.activeIndex = 0;
  //   }
  //   this.currentVideo = this.videoItems[this.activeIndex];
  // }

  // initVdo() {
  //   this.data.play();
  // }

  // startPlaylistVdo(item: any, index: number) {
  //   this.activeIndex = index;
  //   this.currentVideo = item;
  // }

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

  courses=videoLesson;
  sections=this.courses.section ||[];

  loadVideo(videoUrl: string) {
    const videoPlayer = document.getElementById('singleVideo') as HTMLVideoElement;
    videoPlayer.src = videoUrl;
    videoPlayer.load();
    
    // Find the lesson corresponding to the provided videoUrl
    this.selectedLesson = this.videoItems.find(lesson => lesson.lessonVideo === videoUrl) || null;
  }

  updateWatchedStatus() {
    this.watchedLessons = this.sections.reduce((total, section) => {
      return total + section.lessons.filter(lesson => !lesson.inCompleted).length; // Changed to check inCompleted field
    }, 0);
  }

  // Extract lessons from sections
  videoItems: ILesson[] = [];

  constructor(private router:Router ,private http: HttpClient) {
this.extractLessons();
  }

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



calculateProgress(): number {
  const totalLessons = this.sections.reduce((total, section) => {
    return total + section.lessons.length;
  }, 0);
  if (totalLessons === 0) {
    return 0;
    
  }
  this.progress = (this.watchedLessons / totalLessons) * 100;
  this.completed = this.progress >= 100;
  return (this.watchedLessons / totalLessons) * 100;

}



  navigateToCertificate() {
    this.router.navigate(['/certificate']); // Navigate to certificate page
  }

/////////////////
selectedLesson: ILesson | null = null;




}

import { Component } from '@angular/core';
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


interface Lesson {
  title: string;
  url: string;
  watched: boolean;
  time: number;
}

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
    VgBufferingModule, FormsModule, OverviewComponent, QComponent, MatCardModule,]
})

export class CourseLessonComponent {
  circleSize = 40;
  value = '30';
  videoCount = 0;
  showCertificate = true;
  watchedLessons: number = 0; // Declare watchedLessons property
  totalLessons: number = 0; // Declare totalLessons property

  toggleAccordion(accordionId: string) {
    const accordionContent = document.getElementById(accordionId);
    if (accordionContent) {
      accordionContent.classList.toggle("active");
    }
  }

  sections: any[] = [
    {
      title: 'Introduction',
      numsection: [{ num: 1 }, { num: 2 }],
      lessons: [
        { title: '1. Video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', watched: false, time: 22 },
        { title: '2. Video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', watched: false, time: 55 },
        { title: '3. Video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', watched: false, time: 32 },
      ],
    },
    {
      title: 'Accordion 2',
      lessons: [
        { title: '4. Video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', watched: false, time: 30 },
        {
          title: '5. Video',
          url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          watched: false,
          time: 35,
        },
        { title: '6. Video', url: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4', watched: false, time: 60 },
      ],
    },
  ];

  // constructor() {}

  loadVideo(videoUrl: string) {
    const videoPlayer = document.getElementById('singleVideo') as HTMLVideoElement;
    videoPlayer.src = videoUrl;
    videoPlayer.load();
  }

  updateWatchedStatus() {
    this.watchedLessons = this.sections.reduce((total, section) => {
      return total + section.lessons.filter((lesson: Lesson) => lesson.watched).length;
    }, 0);
  }

  calculateProgress(): number {
    const totalLessons = this.sections.reduce((total, section) => {
      return total + section.lessons.length;
    }, 0);
    if (totalLessons === 0) {
      return 0;
    }
    return (this.watchedLessons / totalLessons) * 100;
  }

  videoItems = [
    {
      name: 'Video one',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      type: 'video/mp4',
    },
    {
      name: 'Video two',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      type: 'video/mp4',
    },
    {
      name: 'Video three',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      type: 'video/mp4',
    },
  ];

  activeIndex = 0;
  currentVideo = this.videoItems[this.activeIndex];
  data: any;

  ngOnInit(): void { }

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
  progressBarHidden: boolean = true;

  toggleProgressBar() {
    this.progressBarHidden = !this.progressBarHidden;
  }

  ///////////////
  constructor(private router: Router) { } // Inject the Router service

  // calculateProgress(): number {
  //   if (this.totalLessons === 0) {
  //     return 0;
  //   }
  //   const progress = (this.watchedLessons / this.totalLessons) * 100;
  //   if (progress === 100) {
  //     this.navigateToCertificate(); // Navigate to certificate page when progress reaches 100%
  //   }
  //   return progress;
  // }

  navigateToCertificate() {
    this.router.navigate(['/certificate']); // Navigate to certificate page
  }

}

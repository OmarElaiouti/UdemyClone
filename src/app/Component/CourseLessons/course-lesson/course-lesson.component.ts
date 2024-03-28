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
        VgBufferingModule, FormsModule, OverviewComponent, QComponent,MatCardModule]
})
export class CourseLessonComponent {
circleSize=40;
value="30";
videoCount: number = 0;
showCertificate: boolean = true;

watchVideo() {
  this.videoCount++;
}
getCertificate() {
  if (this.videoCount >= 2) {
    alert("Congratulations! You've earned a certificate in Angular.");
    this.showCertificate = true;

  } else {
    alert('You need to watch more videos to earn the certificate.');
  }
}

  toggleAccordion(accordionId: string) {
    const accordionContent = document.getElementById(accordionId);
    if (accordionContent) {
      accordionContent.classList.toggle("active");
    }
  }

  sections: any[] = [
    {
      title: 'Introduction',
      numsection:[{num:1},{num:2}],
      lessons: [
        { title: '1. Video ', url: 'video1.mp4', watched: false,time:22 },
        { title: '2. Video', url: 'video2.mp4', watched: false,time:55 },
        { title: '3. Video ', url: 'video3.mp4', watched: false,time:32 }
      ]
    },
    {
      title: 'Accordion 2',
      lessons: [
        { title: '4. Video ', url: 'video4.mp4', watched: false,time:30 },
        { title: '5. Video ', url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", watched: false,time:35 },
        { title: '6. Video ', url: 'video6.mp4', watched: false,time:60 }
      ]
    }
    // Add more sections as needed
  ];

  loadVideo(videoUrl: string) {
    const videoPlayer = document.getElementById('singleVideo') as HTMLVideoElement;
    videoPlayer.src = videoUrl;
    videoPlayer.load();
  }
  updateWatchedStatus(videoTitle: string) {
    const videoToUpdate = this.sections
      .flatMap(section => section.lessons) // Flatten the array of videos
      .find(lesson => lesson.title === videoTitle); // Find the video with the provided title

    if (videoToUpdate) {
      videoToUpdate.watched = !videoToUpdate.watched; // Toggle watched status
    }
  }



  showTab(tabId: string) {
    const tabs = document.querySelectorAll('.tab-view');
    const buttons = document.querySelectorAll('.tab-button');
    tabs.forEach(tab => {
      tab.classList.remove('active');
    });
    buttons.forEach(button => {
      button.classList.remove('active');
    });
    const selectedTab = document.getElementById(tabId);
    if (selectedTab) {
      selectedTab.classList.add('active');
      const button = document.querySelector(`[onclick="showTab('${tabId}')"]`);
      if (button) {
        button.classList.add('active');
      }
    }
  }

  videoItems = [
    {
      name: 'Video one',
      src:  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      type: 'video/mp4'
    },
    {
      name: 'Video two',
      src:  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      type: 'video/mp4'
    },
    {
      name: 'Video three',
      src:  "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      type: 'video/mp4'
    }
  ];
  activeIndex = 0;
  currentVideo = this.videoItems[this.activeIndex];
  data: any;
  constructor() { }
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
}

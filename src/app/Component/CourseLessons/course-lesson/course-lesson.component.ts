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
        VgBufferingModule, FormsModule, OverviewComponent, QComponent]
})
export class CourseLessonComponent {

value="30";

  toggleAccordion(accordionId: string) {
    const accordionContent = document.getElementById(accordionId);
    if (accordionContent) {
      accordionContent.classList.toggle("active");
    }
  }

  sections: any[] = [
    {
      title: 'Accordion 1',
      lessons: [
        { title: 'Video 1', url: 'video1.mp4', watched: false },
        { title: 'Video 2', url: 'video2.mp4', watched: false },
        { title: 'Video 3', url: 'video3.mp4', watched: false }
      ]
    },
    {
      title: 'Accordion 2',
      lessons: [
        { title: 'Video 4', url: 'video4.mp4', watched: false },
        { title: 'Video 5', url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4", watched: false },
        { title: 'Video 6', url: 'video6.mp4', watched: false }
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

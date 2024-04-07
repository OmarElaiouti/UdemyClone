import { Component, Input, OnInit } from '@angular/core';
import { IAnnouncement } from '../../Models/lesson';
import { DatePipe } from '@angular/common';
import { VideoLessonService } from '../../Services/videoLesson/video-lesson.service';

@Component({
  selector: 'app-announcement',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './announcement.component.html',
  styleUrl: './announcement.component.css'
})
export class AnnouncementComponent implements OnInit {
  @Input() courseId!: number;

  announcements:IAnnouncement[] =[];
  
  //  [{id:1,courseId:1,content:"jjjjjjjjjjjj",personName:"dddddddddddddddd",personPictureUrl:"/assets/space/5.jpeg"}];
  // newAnnouncementContent: string = '';
  // personName: string = ''; 
  // personPictureUrl: string = ''; 

  constructor(private announcementService: VideoLessonService) { }

  ngOnInit(): void {
    this.fetchAnnouncements();
  }

  fetchAnnouncements() {
    this.announcementService.getAnnouncements(this.courseId).subscribe(announcements => {
      this.announcements = announcements;
    });
  }



}

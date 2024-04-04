import { Component, Input, OnInit } from '@angular/core';
import { IAnnouncement } from '../../Models/lesson';
import { AnnouncementService } from '../../Services/Announcement/announcement.service';
import { DatePipe } from '@angular/common';

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

  constructor(private announcementService: AnnouncementService) { }

  ngOnInit(): void {
    this.fetchAnnouncements();
  }

  fetchAnnouncements() {
    this.announcementService.getAnnouncements(this.courseId).subscribe(announcements => {
      this.announcements = announcements;
    });
  }

  // postAnnouncement() {
  //   if (this.newAnnouncementContent.trim() !== '') {
  //     const newAnnouncement: IAnnouncement = {
  //       id: 0, // Assign any initial value to the id, might get overridden by the server
  //       courseId: this.courseId, 
  //       content: this.newAnnouncementContent.trim(),
  //       personName: this.personName,
  //       personPictureUrl: this.personPictureUrl,
  //       date: new Date() // Use the current date for the announcement
  //     };

  //     this.announcementService.postAnnouncement(newAnnouncement).subscribe(() => {
  //       this.fetchAnnouncements();
  //       this.newAnnouncementContent = '';
  //     });
  //   }
  // }

  // deleteAnnouncement(index: number) {
  //   const announcementId = this.announcements[index].id;
  //   this.announcementService.deleteAnnouncement(this.courseId, announcementId).subscribe(() => {
  //     this.fetchAnnouncements();
  //   });
  // }

}

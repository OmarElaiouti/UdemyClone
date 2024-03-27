import { Component } from '@angular/core';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  
 notification = [
    {
      id:1,
      src :"assets/course_img/img4.jpg",
      descraption: "This is another notification with an image"
   
    },
    {
      id:2,
      src :"assets/course_img/img5.jpg",
      descraption: "This is another notification with an image"
     
    },
    {
      id:3,
      src :"assets/course_img/img9.jpg",
      descraption: "This is another notification with an image"
     
    },
    {
      id:4,
      src :"assets/course_img/img3.jpg",
      descraption: "This is another notification with an image"
     
    },
  ];

}

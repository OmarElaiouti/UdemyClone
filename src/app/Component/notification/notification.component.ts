import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../Services/Notification-service/notification.service';
import { INotification } from '../../Models/INotification';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {

  
//  notifications!:INotification[];

//   constructor(private notificationService: NotificationService) { }

//   ngOnInit(): void {
//     this.fetchNotifications();
//   }

  
//   fetchNotifications() {
//     this.notificationService.getNotifications().subscribe(
//       (notifications: INotification[]) => {
//         this.notifications = notifications;
//       },
//       (error) => {
//         console.error('Error fetching notifications:', error);
//       }
//     );
//   }
 


//   isContentHidden: boolean[] = new Array(this.notifications.length).fill(false);
//   contentToggled: boolean[] = new Array(this.notifications.length).fill(false);
  
//   toggleContent(index: number) {
//     if (!this.contentToggled[index]) {
//       this.isContentHidden[index] = true;
//       this.contentToggled[index] = true;
//       const element = document.getElementById('notifications_' + index);
//       if (element) {
//         element.classList.add('black-background');
//       }
//     }
//   }
  
//   trackById(index: number, item: any) {
//     return item.id;
//   }
  
//   markAllAsRead() {
//     this.isContentHidden = this.isContentHidden.map(() => true);
//   }
  

notifications: INotification[] = []
isContentHidden: boolean[] = [];
contentToggled: boolean[] = [];

constructor(private notificationService: NotificationService) { }

ngOnInit(): void {
  this.fetchNotifications();
}

fetchNotifications() {
  this.notificationService.getNotifications().subscribe({
    next: (notifications: INotification[]) => {
      this.notifications = notifications;
      this.isContentHidden = new Array(this.notifications.length).fill(false);
      this.contentToggled = new Array(this.notifications.length).fill(false);
    },
    error: (error) => {
      console.error('Error fetching notifications:', error);
    }
  });
}

toggleContent(index: number) {
  if (!this.contentToggled[index]) {
    this.isContentHidden[index] = true;
    this.contentToggled[index] = true;
    const element = document.getElementById('notifications_' + index);
    if (element) {
      element.classList.add('black-background');
    }
  }
}

trackById(index: number, item: INotification) {
  return item.id;
}

markAllAsRead() {
  this.isContentHidden = this.isContentHidden.map(() => true);
}
}

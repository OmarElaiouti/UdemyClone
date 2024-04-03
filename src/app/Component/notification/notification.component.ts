
import { Component, OnInit } from '@angular/core';
import { INotification } from '../../Models/INotification';
import { NgFor } from '@angular/common';
import { NotificationService } from '../../Services/notification-service/notification.service';


@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [NgFor],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit {



notifications: INotification[] = []
// isContentHidden: boolean[] = [];
// contentToggled: boolean[] = [];

constructor(private notificationService: NotificationService) { }

ngOnInit(): void {
  this.fetchNotifications();
  this.notificationService.setNotificationsAllStatus().subscribe({
    next: responce =>{},
    error: err =>{}
  });

}

fetchNotifications() {
  this.notificationService.getNotifications().subscribe({
    next: (notifications: INotification[]) => {
      this.notifications = notifications;
      // this.isContentHidden = new Array(this.notifications.length).fill(false);
      // this.contentToggled = new Array(this.notifications.length).fill(false);
    },
    error: (error) => {
      console.error('Error fetching notifications:', error);
    }
  });
}

// toggleContent(index: number) {
//   if (!this.contentToggled[index]) {
//     this.isContentHidden[index] = true;
//     this.contentToggled[index] = true;
//     const element = document.getElementById('notifications_' + index);
//     if (element) {
//       element.classList.add('black-background');
//     }
//   }
// }

// trackById(index: number, item: INotification) {
//   return item.id;
// }

// markAllAsRead() {
//   this.isContentHidden = this.isContentHidden.map(() => true);
// }
}

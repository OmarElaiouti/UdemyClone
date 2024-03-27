import { Component } from '@angular/core';
import { NotificationService } from '../../Services/Notification-service/notification.service';
import { INotification } from '../../Models/INotification';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [],
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  
 notifications!:INotification[];

  constructor(private notificationService: NotificationService) { }

  ngOnInit(): void {
    this.fetchNotifications();
  }

  fetchNotifications() {
    this.notificationService.getNotifications().subscribe(
      (notifications: INotification[]) => {
        this.notifications = notifications;
      },
      (error) => {
        console.error('Error fetching notifications:', error);
      }
    );
  }

}

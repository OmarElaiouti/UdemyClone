import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { INotification } from '../../Models/INotification';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {


  constructor(private http: HttpClient) {}

  // Method to fetch notes from the API
  getNotifications(): Observable<INotification[]> {
    return this.http.get<INotification[]>('/api/notifications');
  }

}

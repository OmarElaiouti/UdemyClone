import { Component } from '@angular/core';
import { IUser } from '../../Models/IUser';
import { UserCoursesService } from '../../Services/user-courses-service/user-courses.service';
import { UserInfoService } from '../../Services/user-info-service/user-info.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpBackend, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account-profile',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './account-profile.component.html',
  styleUrl: './account-profile.component.css'
})
export class AccountProfileComponent {

  
  user: IUser = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'johndoe',
    email: 'john@example.com',
    headline: 'Software Engineer',
    Biography: 'Lorem ipsum dolor sit amet, rrr adipiscing elit.',
    image:'' 
  };

  selectedFile: File | null = null;


  maxCharacters: number = 60;

constructor(private userService:UserInfoService,private http:HttpClient){}

  ngOnInit(): void {
    this.userService.getUser().subscribe({
      next: user => {
        this.user = user;
      },
      error: err => {
        console.error('Error fetching user information:', err);
      }
  });
  }

  submitchanges() {
    this.userService.updateUser(this.user).subscribe({
      next: () => {
        console.log('User data updated successfully');
      },
      error: err => {
        console.error('Error updating user data:', err);
      }
  });
  }

  getRemainingCharacters(): number {
    return this.maxCharacters - this.user.headline.length;
  }

  onBiographyChange(value: string) {
    // Update the user's biography with the new value
    this.user.Biography = value;
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0] as File;
  }

  onUpload() {
    if (!this.selectedFile) {
      console.error('No file selected.');
      return;
    }

    const formData = new FormData();
    formData.append('image', this.selectedFile);

    this.http.post<any>('url', formData).subscribe({
      next: response => {
        console.log('Upload successful:', response);
      },
      error: err => {
        console.error('Error uploading file:', err);
      }
  });
  }
}


















  



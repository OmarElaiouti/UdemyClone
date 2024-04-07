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
    id:'',
    firstName: '',
    lastName: '',
    userName: '',
    email: '',
    headline: '',
    biography: '',
    image:'' 
  };

  selectedFile!: File;


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

 
  confirmClose() {
   
    const confirmed = confirm('Are you sure you want to close your account?');
  
    if (confirmed) {
      this.closeaccount();
    }
  }


  closeaccount() {
    localStorage.removeItem('token');
    this.userService.deleteUser().subscribe({
      next: () => {
        console.log( 'Account deletion request sent successfully!');
      },
      error: err => {
        console.error( 'Error deleting user account:', err);
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
    if(this.user.headline){
    return this.maxCharacters - this.user.headline.length;
    }
    else{
      return 60;
    }
  }

  onBiographyChange(value: string) {
    // Update the user's biography with the new value
    this.user.biography = value;
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
    formData.append('file', this.selectedFile);

    this.http.post<any>('http://localhost:5165/api/User/upload-image', formData).subscribe({
      next: response => {
        console.log('Upload successful:', response);
      },
      error: err => {
        console.error('Error uploading file:', err);
      }
  });
  }
}


















  



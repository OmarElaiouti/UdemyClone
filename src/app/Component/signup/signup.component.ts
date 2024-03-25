import { Component, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignupService } from '../../service/signup.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent implements OnDestroy {

  username: string = '';
  mail: string = '';
  password: string = '';
  private signupStatusSubscription: Subscription;

  constructor(private signupService: SignupService, private router: Router) {
    this.signupStatusSubscription = this.signupService.isUserSignedUp().subscribe((status: boolean) => {
      if (status) {
        // Navigate to home page or perform other actions
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from the subscription to prevent memory leaks
    this.signupStatusSubscription.unsubscribe();
  }

  signup() {
    const userData = {
      username: this.username,
      email: this.mail,
      password: this.password
    };

    this.signupService.signup(userData).subscribe((res: any) => {
      // Handle successful signup
      if (res.result) {
        localStorage.setItem('token', res.data.token);
        this.signupService.setUserSignedUp(true); // Update signup status
      }else{
        alert("Form is invaild");
      }
      // Store signup status in service or localStorage
    });
  }
}



//   name: string = '';
//   mail: string = '';
//   password: string = '';

//   constructor(private router: Router) { }

//   SignUp(): void {
//     if (
//       this.name
//       !== '' && this.password !== '' && this.mail !== '') {
//       const userdata = {
//         name:
//           this.name
//         ,
//         mail: this.mail,
//         password: this.password
//       };


//       let arr: { name: string; mail: string; password: string }[] = JSON.parse(localStorage.getItem('userdetails') || '[]');
// console.log(arr);
//       arr.push(userdata);
//       localStorage.setItem('userdetails', JSON.stringify(arr));
//       this.router.navigate(['']);
//     }
//   }

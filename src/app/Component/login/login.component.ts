import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { SignupService } from '../../service/signup.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  email: string='' ;
  password: string='' ;

  constructor(private loginService: LoginService,private signupservice: SignupService,private router:Router) {}

  login() {


    // Check if user has signed up before allowing login

    // If signed up, proceed with login
    this.loginService.login(this.email,this.password).subscribe(response => {
if(response){
  this.router.navigate(['']);
}
else{
      alert("hggj");
}
    })

  }






  // constructor(private router: Router) {}

  // login(email: string, password: string): void {
  //   const gg = localStorage.getItem('userdetails');
  //   if (gg !== null) {
  //     const admins = JSON.parse(gg);

  //     let isLoggedIn = false;
  //     for (let i = 0; i < admins.length; i++) {
  //       if (admins[i].mail === email && admins[i].password === password) {
  //         localStorage.setItem('loggedIn', 'true');
  //         isLoggedIn = true;
  //         this.router.navigate(['']);
  //         break;
  //       }
  //     }

  //     if (!isLoggedIn) {
  //       alert('Please type correct username/password');
  //     }
  //   } else {
  //     alert('No user details found. Please sign up.');
  //   }
  // }
}

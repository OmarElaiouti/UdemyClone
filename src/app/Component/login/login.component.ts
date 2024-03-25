import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../service/login.service';
import { SignupService } from '../../service/signup.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  name: string = '';
  mail: string = '';
  password: string = '';

  constructor(private loginService: LoginService,private signupservice: SignupService,private router:Router) {}

  login() {
    const userData = {
      name: this.name,
      email: this.mail,
      password: this.password
    };

    // Check if user has signed up before allowing login
    if (this.signupservice.isUserSignedUp()) {
      this.router.navigate(['']);
    // If signed up, proceed with login
    this.loginService.login(userData).subscribe(response => {
      this.router.navigate(['']);
    })
    // Otherwise, display a message or handle accordingly
  } else {
    alert("Login is faild");
  }
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

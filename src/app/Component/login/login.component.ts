import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../Services/login-service/login.service';
import { FormsModule } from '@angular/forms';
import { SignupService } from '../../Services/signup-service/signup.service';
import { NavRefreshService } from '../../Services/nav-refresh-service/nav-refresh.service';

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

  constructor(
    private loginService: LoginService,
    private signupservice: SignupService,
    private router:Router,
    private navbarRefreshService:NavRefreshService
    
    ) {}

  login() {


    // Check if user has signed up before allowing login

    // If signed up, proceed with login
    this.loginService.login(this.email,this.password).subscribe(response => {
if(response){
  this.navbarRefreshService.refreshNavbar();
  
  if(localStorage.getItem("checkoutCart")){
  this.router.navigate(['checkout']);
}else{
  this.router.navigate(['']);
}
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

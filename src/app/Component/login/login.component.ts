import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) {}

  login(email: string, password: string): void {
    const gg = localStorage.getItem('userdetails');
    if (gg !== null) {
      const admins = JSON.parse(gg);

      let isLoggedIn = false;
      for (let i = 0; i < admins.length; i++) {
        if (admins[i].mail === email && admins[i].password === password) {
          localStorage.setItem('loggedIn', 'true');
          isLoggedIn = true;
          this.router.navigate(['']);
          break;
        }
      }

      if (!isLoggedIn) {
        alert('Please type correct username/password');
      }
    } else {
      alert('No user details found. Please sign up.');
    }
  }
}

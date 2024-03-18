import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [RouterModule, FormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})

export class SignupComponent {
  name: string = '';
  mail: string = '';
  password: string = '';

  constructor(private router: Router) { }

  SignUp(): void {
    if (
      this.name
      !== '' && this.password !== '' && this.mail !== '') {
      const userdata = {
        name:
          this.name
        ,
        mail: this.mail,
        password: this.password
      };


      let arr: { name: string; mail: string; password: string }[] = JSON.parse(localStorage.getItem('userdetails') || '[]');
console.log(arr);
      arr.push(userdata);
      localStorage.setItem('userdetails', JSON.stringify(arr));
      this.router.navigate(['']);
    }
  }
}

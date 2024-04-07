import { Component } from '@angular/core';
import { AddRoleServiceService } from '../../Services/add-role-service/add-role-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tech-on-udemy',
  standalone: true,
  imports: [],
  templateUrl: './tech-on-udemy.component.html',
  styleUrl: './tech-on-udemy.component.css'
})
export class TechOnUdemyComponent {
  constructor(private roleService: AddRoleServiceService,private router:Router) { }

  addRole(): void {
    this.roleService.addRoleToUser().subscribe({
      next:response => {
        this.router.navigate(["instructor-dashboard"])
        console.log("Role added successfully");
        // Handle success
      },
      error:err => {
        console.error("Failed to add role:", err);
        // Handle error
      }
    }
    );

    
  }
}

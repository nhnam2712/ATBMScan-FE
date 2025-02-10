import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  loggedUserData: any;
  isAdmin = false;

  constructor(private router: Router) {}

  ngOnInit() {
    // Retrieve user role from localStorage
    const userRole = localStorage.getItem('role');

    // Check if the user is an Admin
    this.isAdmin = userRole === 'ADMIN';

    // Get logged user data (if available)
    this.loggedUserData.userName = localStorage.getItem('userName');
  }

  onLogoff() {
    localStorage.clear();
    this.router.navigateByUrl('/login')
  }
}

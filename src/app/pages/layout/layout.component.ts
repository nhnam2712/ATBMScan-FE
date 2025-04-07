import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  loggedUserData: { userName: string | null } = { userName: null };
  isAdmin = false;
  userId: string | null = null; // Store userId

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId'); // Get userId
    this.loggedUserData.userName = localStorage.getItem('userName'); // Get userName
    this.isAdmin = localStorage.getItem('role') === 'ADMIN';
  }
  onLogoff() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}

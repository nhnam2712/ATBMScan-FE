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
  notifications: any[] = [];
  showDropdown = false;
  isAdmin = false;
  userId: string | null = null; // Store userId

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    this.userId = localStorage.getItem('userId'); // Get userId
    this.loggedUserData.userName = localStorage.getItem('userName'); // Get userName
    this.isAdmin = localStorage.getItem('role') === 'ADMIN';

    if (this.userId) {
      this.fetchNotifications();
      setInterval(() => this.fetchNotifications(), 100000); // Polling every 100s
    }
  }

  fetchNotifications() {
    if (!this.userId) return;

    const token = localStorage.getItem('token'); // Retrieve token

    this.http.get<any[]>(`http://localhost:8080/api/notifications/${this.userId}`, {
      headers: {
        Authorization: `Bearer ${token}` // Add token to request headers
      }
    }).subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => {
        console.error("Error fetching notifications:", error);
      }
    );
  }

  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  clearNotifications() {
    this.notifications = [];
  }

  onLogoff() {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}

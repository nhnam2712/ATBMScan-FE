import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: false
})
export class DashboardComponent {
  constructor(private router: Router) {}

  dashboardItems = [
    {
      id: 1,
      title: 'Bookings',
      description: 'Manage all bookings in one place.',
      path: '/bookings',
    },
    {
      id: 2,
      title: 'Software',
      description: 'Manage all softwares in one place.',
      path: '/softwares',
    },
  ];

  onCardAction(item: any) {
    if (item.path) {
      this.router.navigate([item.path]);
    } else {
      alert(`You selected: ${item.title}`);
    }
  }
}

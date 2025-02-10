import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  dashboardItems = [
    {
      id: 1,
      title: 'Bookings',
      description: 'Manage all bookings in one place.',
    },
    {
      id: 2,
      title: 'Customers',
      description: 'View customer details and history.',
    },
    {
      id: 3,
      title: 'Reports',
      description: 'Generate and view detailed reports.',
    },
    {
      id: 4,
      title: 'Settings',
      description: 'Update system preferences and configurations.',
    },
  ];

  onCardAction(item: any) {
    alert(`You selected: ${item.title}`);
    console.log('Card Action:', item);
  }
}

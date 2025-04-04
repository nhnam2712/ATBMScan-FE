import { Component } from '@angular/core';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css'],
    standalone: false
})
export class DashboardComponent {
  dashboardItems = [
    {
      id: 1,
      title: 'Bookings',
      description: 'Manage all bookings in one place.',
    },
    {
      id: 3,
      title: 'Reports',
      description: 'Generate and view detailed reports.',
    },
  ];

  onCardAction(item: any) {
    alert(`You selected: ${item.title}`);
    console.log('Card Action:', item);
  }
}

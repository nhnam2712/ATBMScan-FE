import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css'],
})
export class BookingListComponent implements OnInit {
  bookings: any[] = [];
  isLoading = true;
  protected isAdmin = false;
  selectedBooking: any = null; // For editing status

  constructor(private bookingService: RoomService) {}

  ngOnInit(): void {
    const userRole = localStorage.getItem('role');
    this.isAdmin = userRole === 'ADMIN';

    this.loadBookings();
  }

  loadBookings(): void {
    const bookingObservable = this.isAdmin
      ? this.bookingService.getAllBookings()
      : this.bookingService.getBookingsById();

    bookingObservable.subscribe({
      next: (data) => {
        this.bookings = data;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching bookings:', error);
        this.isLoading = false;
      },
    });
  }

  viewBooking(booking: any): void {
    alert(`Viewing details for booking: ${booking.bookingReference}`);
    // Navigate to another page or open a modal if needed
  }

  editBookingStatus(booking: any): void {
    this.selectedBooking = { ...booking }; // Copy the booking object to avoid direct mutation
  }

  updateStatus(): void {
    if (!this.selectedBooking) return;

    this.bookingService.updateBookingStatus(this.selectedBooking.id, this.selectedBooking.status).subscribe({
      next: () => {
        const index = this.bookings.findIndex(b => b.id === this.selectedBooking.id);
        if (index !== -1) {
          this.bookings[index].status = this.selectedBooking.status;
        }
        this.closeModal();
        alert('Booking status updated successfully!');
      },
      error: (err) => {
        console.error('Error updating status:', err);
        alert('Failed to update booking status.');
      }
    });
  }

  deleteBooking(booking: any): void {
    if (!confirm('Are you sure you want to delete this booking?')) return;

    this.bookingService.deleteBooking(booking.id).subscribe({
      next: () => {
        this.bookings = this.bookings.filter(b => b.id !== booking.id);
        alert('Booking deleted successfully!');
      },
      error: (err) => {
        console.error('Error deleting booking:', err);
        alert('Failed to delete booking.');
      }
    });
  }

  closeModal(): void {
    this.selectedBooking = null;
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from 'src/app/service/room.service';

@Component({
    selector: 'app-new-booking',
    templateUrl: './new-booking.component.html',
    styleUrls: ['./new-booking.component.css'],
    standalone: false
})
export class NewBookingComponent {
  bookingForm: FormGroup;

  constructor(private fb: FormBuilder, private roomService: RoomService) {
    const storedUserId = localStorage.getItem('userId');

    this.bookingForm = this.fb.group({
      userId: [{ value: storedUserId, disabled: true }, Validators.required],
      bookingDate: ['', [Validators.required]],
      status: ['PENDING', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const formData = this.bookingForm.getRawValue();

      // Call the service method to create a new booking
      this.roomService.createBooking(formData).subscribe({
        next: (response) => {
          console.log('Booking created successfully:', response);
          alert('Booking submitted successfully!');
          this.bookingForm.reset(); // Optionally reset the form
        },
        error: (error) => {
          console.error('Error creating booking:', error);
          alert('Failed to create booking. Please try again.');
        }
      });
    } else {
      alert('Please fill out all required fields.');
    }
  }
}

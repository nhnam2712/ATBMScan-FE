import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-new-booking',
  templateUrl: './new-booking.component.html',
  styleUrls: ['./new-booking.component.css'],
  standalone: false
})
export class NewBookingComponent implements OnInit {
  bookingForm!: FormGroup;
  softwares: any[] = []; // ✅ Store software list

  constructor(
    private fb: FormBuilder,
    private roomService: RoomService,
    private softwareService: RoomService // ✅ Inject SoftwareService
  ) {}

  ngOnInit() {
    const storedUserId = localStorage.getItem('userId');

    this.bookingForm = this.fb.group({
      userId: [{ value: storedUserId, disabled: true }, Validators.required],
      softwareId: ['', Validators.required], // ✅ Add software selection
      bookingDate: ['', Validators.required],
      status: ['PENDING', Validators.required]
    });

    this.fetchSoftwares(); // ✅ Fetch software list when component loads
  }

  fetchSoftwares() {
    const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage

    if (userId) {
      this.softwareService.getAllSoftwares(userId).subscribe({
        next: (data: any[]) => {
          this.softwares = data;
        },
        error: (error) => {
          console.error('Error fetching software:', error);
        }
      });
    } else {
      console.warn('User ID not found in localStorage');
    }
  }

  onSubmit() {
    if (this.bookingForm.valid) {
      const formData = this.bookingForm.getRawValue();
      this.roomService.createBooking(formData).subscribe({
        next: (response) => {
          console.log('Booking created successfully:', response);
          alert('Booking submitted successfully!');
          this.bookingForm.reset();
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

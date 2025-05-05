import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from 'src/app/service/room.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
    standalone: false
})
export class RegisterComponent {
  registerForm: FormGroup;
  isSubmitting = false;
  errorMessage: string = '';
  today: string = new Date().toISOString().split('T')[0]; // Restrict DOB to past dates

  // Hardcoded departments (same as enum in backend)
  departments: string[] = ['IT', 'HR', 'BA', 'DE', 'PM'];

  constructor(private fb: FormBuilder, private authService: RoomService, private router: Router) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      name: ['', Validators.required],
      dob: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
      department: ['', Validators.required],
    });
  }

  onRegister(): void {
    if (this.registerForm.invalid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    this.authService.register(this.registerForm.value).subscribe({
      next: () => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.errorMessage = 'Failed to register. Please try again.';
        this.isSubmitting = false;
      }
    });
  }
}

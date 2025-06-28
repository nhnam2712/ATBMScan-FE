import { Component, OnInit } from '@angular/core';
import { RoomService } from "../../service/room.service"; // Dịch vụ lấy thông tin người dùng
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  standalone: false,
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loggedUserData: any = {}; // Ensure user data is initialized
  newPassword: string = '';
  confirmPassword: string = ''; // The confirm password field
  passwordsDontMatch: boolean = false; // Error flag for password mismatch
  isEditing: boolean = false; // Biến kiểm tra chế độ chỉnh sửa

  constructor(private userService: RoomService, private location: Location) {}

  ngOnInit(): void {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.loadUserProfile(userId);
    } else {
      console.error('No userId found in localStorage.');
    }
  }

  loadUserProfile(userId: string): void {
    this.userService.getUserById(userId).subscribe(
      (data) => {
        this.loggedUserData = data;
      },
      (error) => {
        console.error('Error fetching user data:', error);
      }
    );
  }

  onEditProfile(): void {
    this.isEditing = true;
  }

  onSaveProfile(): void {
    // Nếu người dùng điền mật khẩu mới thì kiểm tra xác nhận
    if (this.newPassword || this.confirmPassword) {
      if (this.newPassword !== this.confirmPassword) {
        this.passwordsDontMatch = true;
        return;
      } else {
        this.passwordsDontMatch = false;
        this.loggedUserData.password = this.newPassword;
      }
    }

    const userId = localStorage.getItem('userId');
    if (userId) {
      this.userService.updateUser(userId, this.loggedUserData).subscribe(
        (response) => {
          console.log('Profile updated successfully:', response);
          this.isEditing = false;
          this.newPassword = '';
          this.confirmPassword = '';
        },
        (error) => {
          console.error('Error saving profile:', error);
        }
      );
    }
  }

  onCancelEdit(): void {
    this.isEditing = false;
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.loadUserProfile(userId);  // Reload user profile
    }
  }

  navigateBack() {
    this.location.back();
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from 'src/app/service/room.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  standalone: false,
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userList: any[] = [];
  updateUserForm: FormGroup;
  selectedUserId: number | null = null;

  constructor(private roomSrv: RoomService, private fb: FormBuilder, private modalService: NgbModal) {
    this.updateUserForm = this.fb.group({
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.roomSrv.getAllUsers().subscribe((res: any) => {
      this.userList = res;
    });
  }

  // Open Modal When Clicking "Edit Role" Button
  onEditUser(user: any) {
    this.selectedUserId = user.id;
    this.updateUserForm.patchValue({ role: user.roles });

    // Open the modal
    const modalElement = document.getElementById('editRoleModal');
    if (modalElement) {
      const modal = new bootstrap.Modal(modalElement);
      modal.show();
    }
  }

  // Save the Updated Role
  onUpdateUser() {
    if (!this.selectedUserId) return;

    const updatedRole = this.updateUserForm.value.role;

    this.roomSrv.updateUser(this.selectedUserId, updatedRole).subscribe({
      next: () => {
        alert('User role updated successfully!');
        this.getUsers(); // Refresh user list
        this.closeModal();
      },
      error: (error) => {
        console.error('Update failed:', error);
        alert('Failed to update user role.');
      }
    });
  }

  // Close the Modal
  closeModal() {
    const modalElement = document.getElementById('editRoleModal');
    if (modalElement) {
      const modal = bootstrap.Modal.getInstance(modalElement);
      modal?.hide();
    }
  }

  // Delete User
  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.roomSrv.deleteUser(id).subscribe(() => {
        alert('User deleted successfully.');
        this.getUsers();
      });
    }
  }
}

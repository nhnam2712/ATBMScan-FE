import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoomService } from 'src/app/service/room.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList: any[] = [];
  updateUserForm: FormGroup;
  selectedUserId: number | null = null;

  constructor(private fb: FormBuilder, private roomSrv: RoomService, private modalService: NgbModal) {
    this.updateUserForm = this.fb.group({
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.roomSrv.getAllUsers().subscribe((Res: any) => {
      this.userList = Res;
    });
  }

  // 🟢 OPEN MODAL
  openModal(user: any) {
    this.selectedUserId = user.id;
    this.updateUserForm.patchValue({ role: user.roles });

    const modal = new (window as any).bootstrap.Modal(document.getElementById('editRoleModal'));
    modal.show();
  }

  // 🔄 UPDATE USER ROLE
  onUpdateUser() {
    if (!this.selectedUserId) return;

    const updatedRole = this.updateUserForm.value.role;
    this.roomSrv.updateUserRole(this.selectedUserId, updatedRole).subscribe({
      next: () => {
        alert('Role updated successfully!');
        this.getUsers();
        const modal = document.getElementById('editRoleModal');
        if (modal) {
          (window as any).bootstrap.Modal.getInstance(modal).hide();
        }
      },
      error: (err) => {
        console.error(err);
        alert('Error updating role.');
      }
    });
  }

  // ❌ DELETE USER
  onDelete(id: number) {
    const isDelete = confirm('Are you sure you want to delete this user?');
    if (isDelete) {
      this.roomSrv.deleteUser(id).subscribe((res: any) => {
        if (res.result) {
          alert('User Deleted');
          this.getUsers();
        } else {
          alert(res.message);
        }
      });
    }
  }
}

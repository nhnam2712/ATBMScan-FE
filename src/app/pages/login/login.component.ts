import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {


  loginObj: any = {
    "username": "",
    "password": ""
  };
  constructor(private roomSrv: RoomService,private router: Router){

  }

  onLogin() {
    if (!this.loginObj.username || !this.loginObj.password) {
      alert('Username and password are required');
      return;
    }

    this.roomSrv.login(this.loginObj).subscribe({
      next: (res: any) => {
        if (res.result) {
          console.log(res.result);
          localStorage.setItem('token',res.result.token);
          localStorage.setItem('userId',res.result.id);
          localStorage.setItem('role',res.result.roles);
          this.router.navigateByUrl('/dashboard');
        } else {
          alert('Invalid username or password');
        }
      },
      error: (err) => {
        console.error('Login error:', err);
        alert('An error occurred while logging in. Please try again later.');
      }
    });
  }


}

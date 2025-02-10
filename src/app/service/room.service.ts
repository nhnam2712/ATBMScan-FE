import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  apiEndPoint: string = "http://localhost:8080/api/"
  constructor(private http: HttpClient) { }

  login(obj: any) {
    return this.http.post(this.apiEndPoint + 'auth' + '/login', obj);
  }

  register(obj: any) {
    return this.http.post(this.apiEndPoint + 'users', obj);
  }

  getBookingsById(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or another source
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(this.apiEndPoint + 'bookings/' + localStorage.getItem('userId'), { headers });

  }

  getAllBookings(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or another source
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(this.apiEndPoint + 'bookings', { headers });

  }

  // getAllCustomers() {
  //   const token = localStorage.getItem('token'); // Retrieve token from localStorage or another source
  //   const headers = new HttpHeaders({
  //     Authorization: `Bearer ${token}`
  //   });
  //
  //   return this.http.get(this.apiEndPoint + 'users', { headers });
  // }

  getAllUsers() {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or another source
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(this.apiEndPoint + 'users', { headers });
  }

  updateUser(id: any, user: any) {
    const token = localStorage.getItem('token'); // Retrieve token

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'  // ✅ Fix: Add Content-Type
    });

    return this.http.put(`${this.apiEndPoint}users/${id}`, JSON.stringify(user), { headers });
  }

  deleteUser(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.apiEndPoint}users/${id}`, { headers });
  }

  createBooking(obj: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(this.apiEndPoint + 'bookings', obj, { headers });
  }

  deleteBooking(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.apiEndPoint}bookings/${id}`, { headers });
  }

  updateBookingStatus(id: any, status: string) {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found in localStorage');
      return throwError(() => new Error('Unauthorized: No token found.'));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { status }; // Ensure the correct request payload

    return this.http.put(`${this.apiEndPoint}bookings/${id}`, body, { headers });
  }

}

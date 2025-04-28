import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoomService {

  selectedFile: File | null = null;
  apiEndPoint: string = "http://localhost:8080/api/"

  constructor(private http: HttpClient) {
  }

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

    return this.http.get<any>(this.apiEndPoint + 'bookings/' + localStorage.getItem('userId'), {headers});

  }

  getAllBookings(): Observable<any[]> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or another source
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(this.apiEndPoint + 'bookings', {headers});

  }

  getAllSoftwares(userId: string): Observable<any[]> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or another source
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiEndPoint}software/${userId}`, {headers});
  }

  getSoftwareById(id: string): Observable<any[]> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or another source
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(`${this.apiEndPoint}software/specific/${id}`, {headers});
  }

  deleteSoftware(id: string): Observable<any> {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or another source
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.apiEndPoint}software/${id}`, {headers});
  }

  uploadSoftware(file: File, softwareData: any): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({Authorization: `Bearer ${token}`});

    const formData = new FormData();
    formData.append('file', file); // ✅ Corrected: Backend expects a single file named "file"
    formData.append('data', new Blob([JSON.stringify(softwareData)], {type: 'application/json'})); // ✅ Match backend "data"

    return this.http.post(`${this.apiEndPoint}software`, formData, {headers});
  }

  downloadSoftware(filePath: string): Observable<Blob> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${this.apiEndPoint}software/download/${encodeURIComponent(filePath)}`, {
      headers,
      responseType: 'blob' // Important for file downloads
    });
  }

getAllUsers() {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or another source
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(this.apiEndPoint + 'users', { headers });
  }

  getUserById(id: any) {
    const token = localStorage.getItem('token'); // Retrieve token from localStorage or another source
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(this.apiEndPoint + 'users/' + id, { headers });
  }

  updateUserRole(id: any, role: string) {
    const token = localStorage.getItem('token'); // Retrieve token

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const body = { roles: role }; // ⚡ wrap lại thành object

    return this.http.put(`${this.apiEndPoint}users/roles/${id}`, body, { headers });
  }

  updateUser(id: any, user: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.apiEndPoint}users/${id}`, user, { headers });
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

  getBookingDetails(id: string): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    return this.http.get(this.apiEndPoint + 'bookings/specific/' + id, { headers });
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

  getIssuesById(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiEndPoint}issues/${id}`, { headers });
  }

  createIssues() {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.delete(`${this.apiEndPoint}issues`, { headers });
  }

  getScanResults(id: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiEndPoint}results/${id}`, { headers });
  }

  updateScanResults(id: any, scanResults: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get(`${this.apiEndPoint}results/${id}`, { headers });
  }

  postScanResults(id: any, scanResults: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.post(`${this.apiEndPoint}results`, scanResults , { headers });
  }

  postIssues(issueData: any) {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error("❌ Token is missing!");
      return throwError(() => new Error("Unauthorized: Token is missing"));
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json' // ✅ Đảm bảo gửi JSON
    });

    return this.http.post(`${this.apiEndPoint}issues`, issueData, { headers }).pipe(
      catchError(error => {
        console.error("❌ Error response:", error);
        return throwError(() => error);
      })
    );
  }

  //rechedule issue
  reScheduleIssue(issueId: any, newDate: any) {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.apiEndPoint}issues/${issueId}`,  newDate , { headers });
  }

  //checkbox issue
  updateFixStatus(issueId: string, isFixed: boolean): Observable<any> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    const params = new HttpParams().set('isFixed', isFixed.toString());

    return this.http.put(`${this.apiEndPoint}issues/${issueId}/fix-status`, null, {
      headers,
      params
    });
  }

  // downloadPdf(scanResultId: string): Observable<Blob> {
  //   const token = localStorage.getItem('token');
  //   const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
  //
  //   return this.http.get(`${this.apiEndPoint}report/${scanResultId}`, {
  //     headers,
  //     responseType: 'blob' // Important for file downloads
  //   });
  // }

  previewPdf(scanResultId: string): any {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });

    return this.http.get(`${this.apiEndPoint}report/${scanResultId}`, {
      headers,
      responseType: 'blob'
    });
  }
}

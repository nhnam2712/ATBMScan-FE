import { Component } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { RoomService } from 'src/app/service/room.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-scan-results',
  standalone: false,
  templateUrl: './scan-results.component.html',
  styleUrl: './scan-results.component.css',
})
export class ScanResultsComponent {
  softwareId: string = '';
  bookingId: string = '';
  bookingDetails: any = null;
  scanResultData: any = null;
  issuesData: any = null;
  softwareData: any = null;
  isLoading: boolean = true;
  errorMessage: string | null = null;
  userRole: string = '';

  scanResult = {
    softwareId: '',
    bookingId: '',
    status: '',
    details: '',
    scanDate: ''
  };

  issueData = {
    threats: '',
    repeatThreats: '',
    notes: ''
  };

  constructor(private route: ActivatedRoute, private scanService: RoomService) {}

  ngOnInit() {
    this.bookingId = localStorage.getItem('bookingId') ?? '';
    this.userRole = localStorage.getItem('role') ?? '';

    if (this.bookingId) {
      this.fetchBookingDetails(this.bookingId);
      this.fetchScanResult(this.bookingId);
    } else {
      this.errorMessage = 'Booking ID not found in localStorage.';
      this.isLoading = false;
    }
  }

  fetchBookingDetails(id: string) {
    this.scanService.getBookingDetails(id).subscribe({
      next: (data) => {
        this.bookingDetails = data;

        if (data?.softwareId) {
          this.softwareId = data.softwareId;
          this.fetchSoftwareDetails(this.softwareId);
          this.fetchIssuesData(this.softwareId);

          this.scanResult.softwareId = this.softwareId;
          this.scanResult.bookingId = this.bookingId;
        } else {
          this.errorMessage = 'Software ID not found in booking details.';
        }

        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching booking details:', error);
        this.errorMessage = 'Failed to fetch booking details.';
        this.isLoading = false;
      }
    });
  }

  fetchSoftwareDetails(softwareId: string) {
    this.scanService.getSoftwareById(softwareId).subscribe({
      next: (data) => {
        this.softwareData = data;
      },
      error: (error) => {
        console.error('Error fetching software data:', error);
        this.errorMessage = 'Failed to fetch software details.';
      }
    });
  }

  fetchScanResult(bookingId: string) {
    this.scanService.getScanResults(bookingId).subscribe({
      next: (data: any) => { // Ép kiểu về `any` để tránh lỗi TypeScript
        this.scanResultData = data;

        if (data && data.id) {
          localStorage.setItem('ScanResultId', data.id);
          console.log("ScanResultId saved:", data.id);
        } else {
          console.warn("No scanResultId found in response");
        }
      },
      error: (error) => {
        console.error('Error fetching scan results:', error);
        this.errorMessage = 'Failed to fetch scan results.';
      }
    });
  }

  fetchIssuesData(softwareId: string) {
    this.scanService.getIssuesById(softwareId).subscribe({
      next: (data) => {
        this.issuesData = Array.isArray(data) && data.length > 0 ? data[0] : null;
      },
      error: (error) => {
        console.error('Error fetching issues data:', error);
        this.errorMessage = 'Failed to fetch issues data.';
      }
    });
  }

  downloadSoftware(filePath: string) {
    if (!filePath) {
      console.error('Invalid file path.');
      alert('Invalid file path.');
      return;
    }

    const fileName = decodeURIComponent(filePath.split('/').pop() || filePath);

    this.scanService.downloadSoftware(fileName).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/octet-stream' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(url);
      },
      error: (error: any) => {
        console.error('Download failed:', error);
        alert('Download failed!');
      }
    });
  }

  postScanResult() {
    if (!this.scanResult.scanDate || !this.scanResult.status || !this.scanResult.details) {
      alert('Please fill in all scan result fields.');
      return;
    }

    this.scanService.postScanResults(this.bookingId, this.scanResult).subscribe({
      next: () => {
        alert('Scan result submitted successfully!');
        this.fetchScanResult(this.bookingId); // Cập nhật mà không reload
      },
      error: (err) => alert('Error submitting scan result: ' + err.message)
    });
  }

  postIssues() {
    if (!this.issueData.threats || !this.issueData.repeatThreats || !this.issueData.notes) {
      alert('Please fill in all issue fields.');
      return;
    }

    const issuePayload = {
      softwareId: this.softwareId,
      scanResultId: localStorage.getItem('ScanResultId') ?? '',
      threats: this.issueData.threats,
      repeatThreats: this.issueData.repeatThreats,
      notes: this.issueData.notes
    };

    console.log("Submitting issue:", issuePayload);

    this.scanService.postIssues(issuePayload).subscribe({
      next: () => {
        alert('Issue submitted successfully!');
        this.fetchIssuesData(this.softwareId);
      },
      error: (err) => {
        console.error("❌ Error submitting issue:", err);
        alert('Error submitting issue: ' + (err.error?.message || err.message));
      }
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { RoomService } from 'src/app/service/room.service';

@Component({
  selector: 'app-softwares',
  standalone: false,
  templateUrl: './softwares.component.html',
  styleUrls: ['./softwares.component.css']
})
export class SoftwaresComponent implements OnInit {
  softwares: any[] = []; // ✅ Store software list
  selectedFile: File | null = null; // ✅ Use a single file instead of an array
  softwareData = {
    name: '',
    version: '',
    description: '',
    userId: ''
  };
  issues: any[] = [];

  constructor(private softwareService: RoomService) {} // ✅ Inject the correct service

  ngOnInit() {
    this.fetchSoftware();
    this.loadUserId();
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    if (event.dataTransfer?.files.length) {
      this.selectedFile = event.dataTransfer.files[0];
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  fetchSoftware() {
    const userId = this.loadUserId();
    if (userId) {
      this.softwareService.getAllSoftwares(userId).subscribe(
        (data: any[]) => {
          this.softwares = data;
        },
        error => {
          console.error('Error fetching software:', error);
        }
      );
    } else {
      console.warn("No user ID found. Skipping software fetch.");
    }
  }

  loadUserId() {
    const userId = localStorage.getItem('userId');
    if (userId) {
      this.softwareData.userId = userId; // ✅ Assign userId from localStorage
    } else {
      console.warn('User ID not found in localStorage');
    }
    return userId;
  }

  // onFileSelected(event: any) {
  //   if (event.target.files.length > 0) {
  //     this.selectedFile = event.target.files[0]; // ✅ Store only one file
  //   }
  // }

  uploadSoftware() {
    if (!this.selectedFile) {
      alert('Please select a file first.');
      return;
    }

    this.softwareService.uploadSoftware(this.selectedFile, this.softwareData).subscribe(response => {
      console.log('File uploaded successfully:', response);
      alert('Software uploaded successfully!');

      // ✅ Clear the form fields
      this.softwareData = { name: '', version: '', description: '', userId: localStorage.getItem('userId') || '' };
      this.selectedFile = null;

      this.fetchSoftware(); // ✅ Refresh the table after upload
    }, error => {
      console.error('Upload failed:', error);
      alert('Upload failed!');
    });
  }

  downloadSoftware(filePath: string) {
    const fileName = filePath.split('/').pop() || filePath; // Extract filename
    this.softwareService.downloadSoftware(fileName).subscribe(response => {
      const blob = new Blob([response], { type: 'application/octet-stream' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, error => {
      console.error('Download failed:', error);
      alert('Download failed!');
    });
  }

  deleteSoftware(id: string) {
    if (confirm('Are you sure you want to delete this software?')) {
      this.softwareService.deleteSoftware(id).subscribe(() => {
        alert('Software deleted successfully!');
        this.fetchSoftware(); // Refresh the list after deletion
      }, error => {
        console.error('Delete failed:', error);
        alert('Failed to delete software.');
      });
    }
  }
}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'download and upload Files';
  inputData: string = '';
  FileUrl = 'https://api.escuelajs.co/api/v1/files/';
  uploadFileNames: string[] = [];

  constructor(private http: HttpClient) {}
  uploadFile(event: any) {
    const file = event.currentTarget.files[0];
    console.log(file);
    if (file.type === 'image/png' && file.size < 2000000) {
      const formObj = new FormData();
      formObj.append('file', file);
      debugger;
      this.http
        .post('https://api.escuelajs.co/api/v1/files/upload', formObj)
        .subscribe((res: any) => {
          debugger;
          console.log(res);

          this.uploadFileNames.push(res.filename);
          console.log(this.FileUrl + res.filename);
        });
      this.inputData = '';
    } else {
      if (file.size > 2000000) {
        alert('file size must be less than 2 MB');
      } else {
        alert('only files with png extension');
      }
    }
  }
}

// uploadFile(event: any) {
//   debugger;
//   const file = event.currentTarget.files[0];
//   console.log(file);
//   if (file.type === 'image/jpg' && file.size < 2000000) {
//     const formObj = new FormData();
//     formObj.append('file', file);
//     console.log(formObj);
//     this.http
//       .post('https://api.escuelajs.co/api/v1/files/upload', formObj)
//       .subscribe((res: any) => {
//         debugger;
//         console.log(res);
//         this.uploadFileNames.push(res.fileName);
//       });
//   }
// }
// }

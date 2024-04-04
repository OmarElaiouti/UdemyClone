import { CommonModule, DatePipe } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-certificate',
  standalone: true,
  imports: [DatePipe, CommonModule,],
  templateUrl: './certificate.component.html',
  styleUrl: './certificate.component.css'
})
export class CertificateComponent {

  course = {
    id: 1, name: 'Python for Data Science and Machine Learning Bootcamp', instructor: 'Instructor 1', rating: 4.5, totallectuer: 15,
    totalHour: 15,student_name:"Eman Salah",date:1/20/2023,Img:"https://i.pinimg.com/564x/79/2a/80/792a808b9b5caae17aa382fc080c469d.jpg"
  }
  

  @ViewChild('contentToDownload') contentToDownload!: ElementRef;
  @ViewChild('contentToShare') contentToShare!: ElementRef;

  downloadAsImage() {
    const content = this.contentToDownload.nativeElement;
    html2canvas(content).then(canvas => {
      const link = document.createElement('a');
      link.download = 'certificate.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

  shareContent() {
    if (navigator.share) {
      const content = this.contentToShare.nativeElement;
      const shareOptions = {
        title: 'Share',
        text: 'Check out this content!',
        url: window.location.href // You can customize the URL to be shared
      };

      navigator.share(shareOptions)
        .then(() => console.log('Shared successfully'))
        .catch((error) => console.error('Error sharing:', error));
    } else {
      console.log('Web Share API not supported');
    }
  }

  // Function to get the severity for the inventory status
  getStarArray(rating: number): number[] {
    const fullStars = Math.floor(rating);
    const halfStars = Math.ceil(rating - fullStars);
    const starArray = Array(fullStars).fill(0);
    if (halfStars > 0) {
      starArray.push(halfStars); // Add half star if applicable
    }
    return starArray;
  }
}

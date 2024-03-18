import { Component,ElementRef, ViewChild, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-cources',
  standalone: true,
  imports: [],
  templateUrl: './cources.component.html',
  styleUrl: './cources.component.css'
})
export class CourcesComponent {
  @ViewChild('button1') button1!: ElementRef;
  @ViewChild('button2') button2!: ElementRef;
  @ViewChild('scroller') scroller!: ElementRef;

  scroll = 0;

  ngAfterViewInit(): void {
    this.button1.nativeElement.addEventListener('click', () => this.clicked());
    this.button2.nativeElement.addEventListener('click', () => this.clicked2());

    this.scroller.nativeElement.addEventListener('scroll', () => {
      this.scroll = this.scroller.nativeElement.scrollLeft;
    });
  }

  clicked(): void {
    this.scroll += 500;
    this.scroller.nativeElement.scrollTo({
      left: this.scroll,
      behavior: 'smooth'
    });
    this.scroll += 50;
    console.log(this.scroller.nativeElement.scrollLeft);
  }

  clicked2(): void {
    this.scroll -= 500;
    this.scroller.nativeElement.scrollTo({
      left: this.scroll,
      behavior: 'smooth'
    });
    this.scroll += 50;
    console.log(this.scroller.nativeElement.scrollLeft);
  }

  // Slider item with data base

  showCourses(el: any): void {
    const slide = document.getElementById('unordered')
}
}

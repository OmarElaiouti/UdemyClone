import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-next2',
  standalone: true,
  imports: [CommonModule,FormsModule,RouterModule],
  templateUrl: './next2.component.html',
  styleUrl: './next2.component.css'
})
export class Next2Component {
  inputText: string = '';
  buttonActive: boolean = false;
  

  checkInput() {
    if (this.inputText.length > 0) {
      this.buttonActive = true;
    } else {
      this.buttonActive = false;
    }
  }

}

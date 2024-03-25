import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AddbuttonComponent } from '../../components/addbutton/addbutton.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AddbuttonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


  public addList(): void {
    console.log('Add List');
  }
}

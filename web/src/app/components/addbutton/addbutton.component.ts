import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-addbutton',
  standalone: true,
  imports: [],
  templateUrl: './addbutton.component.html',
  styleUrl: './addbutton.component.css'
})
export class AddbuttonComponent {

  @Output()
  public addClicked: EventEmitter<void> = new EventEmitter();

  constructor() {}

  public addBtnClicked(): void {
    this.addClicked.emit();
  }

}

import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-addbutton',
  standalone: true,
  imports: [MatTooltipModule],
  templateUrl: './addbutton.component.html',
  styleUrl: './addbutton.component.css'
})
export class AddbuttonComponent {

  @Input()
  public tooltip: string = '';

  @Output()
  public addClicked: EventEmitter<void> = new EventEmitter();

  constructor() {}

  public addBtnClicked(): void {
    this.addClicked.emit();
  }

}

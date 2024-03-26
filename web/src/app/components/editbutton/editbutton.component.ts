import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-editbutton',
  standalone: true,
  imports: [MatTooltipModule, CommonModule],
  templateUrl: './editbutton.component.html',
  styleUrl: './editbutton.component.css'
})
export class EditbuttonComponent {

  @Input()
  public tooltip: string = '';

  @Output()
  public editBtnClicked: EventEmitter<void> = new EventEmitter();

  constructor() {}


  public clicked(): void {
    this.editBtnClicked.emit();
  }
}

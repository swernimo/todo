import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {

  @Input()
  public text: string = '';

  @Input()
  public role: 'primary' | 'secondary' | 'cancel' = 'primary';

  @Input()
  public disabled: boolean = false;

  @Output()
  public btnClicked: EventEmitter<void> = new EventEmitter();

  constructor() { }

  public buttonClicked(): void {
    this.btnClicked.emit();
  }

}

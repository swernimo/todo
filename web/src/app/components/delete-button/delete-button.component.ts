import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.css'
})
export class DeleteButtonComponent {

    @Output()
    public deleteClicked: EventEmitter<void> = new EventEmitter();

    constructor() {}

    public buttonClicked(): void {
      this.deleteClicked.emit();
    }
}

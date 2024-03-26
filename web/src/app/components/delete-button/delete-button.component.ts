import { Component, Output, EventEmitter, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-delete-button',
  standalone: true,
  imports: [CommonModule, MatTooltipModule],
  templateUrl: './delete-button.component.html',
  styleUrl: './delete-button.component.css'
})
export class DeleteButtonComponent {

    @Input()
    public tooltip: string = '';

    @Output()
    public deleteClicked: EventEmitter<void> = new EventEmitter();

    constructor() {}

    public buttonClicked(): void {
      this.deleteClicked.emit();
    }
}

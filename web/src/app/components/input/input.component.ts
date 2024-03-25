import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit {

  @Input()
  public placeholder: string = '';

  @Input()
  public type: 'text' | 'textarea' = 'text';

  @Input({required: true})
  public formCtrl: FormControl = new FormControl();

  @Input()
  public isRequired: boolean = false;

  public isValid = computed(() => {
    
  });

  public beenTouched = signal<boolean>(false);

  constructor() { }

  ngOnInit(): void {
      
  }
}

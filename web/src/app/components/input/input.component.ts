import { Component, Input, OnInit, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatDatepickerModule, MatFormFieldModule, MatInputModule],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css'
})
export class InputComponent implements OnInit {

  @Input()
  public placeholder: string = '';

  @Input()
  public type: 'text' | 'textarea' | 'date' = 'text';

  @Input({required: true})
  public formCtrl: FormControl = new FormControl();

  @Input()
  public isRequired: boolean = false;

  @Input({required: true})
  public title: string = '';

  public showIsValidIcon = computed(() => {
    const touched = this.beenTouched();
    return touched && this.isRequired && this.formCtrl.valid;
  });

  public beenTouched = signal<boolean>(false);

  constructor() { }

  ngOnInit(): void {
      
  }
}

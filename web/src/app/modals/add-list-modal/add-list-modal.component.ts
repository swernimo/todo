import { Component, Output, EventEmitter } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-add-list-modal',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent],
  templateUrl: './add-list-modal.component.html',
  styleUrl: './add-list-modal.component.css'
})
export class AddListModalComponent {

  @Output()
  public saveList: EventEmitter<string> = new EventEmitter();

  @Output()
  public cancelSave: EventEmitter<void> = new EventEmitter();

  public addListForm: FormGroup = this.builder.group({
    name: new FormControl(null, [Validators.required])
  });

  constructor(private builder: FormBuilder) { }

  get listNameCtrl(): FormControl {
    return this.addListForm.get('name') as FormControl;
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-add-list-item-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './add-list-item-details.component.html',
  styleUrl: './add-list-item-details.component.css'
})
export class AddListItemDetailsComponent implements OnInit {

    @Input()
    public parentId: string = '';

    public addForm: FormGroup = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      details: new FormControl(null),
      dueDate: new FormControl(null, [Validators.required])
    });

    constructor(private formBuilder: FormBuilder, private dialog: MatDialog) { }

    get nameCtrl(): FormControl {
      return this.addForm.get('name') as FormControl;
    }

    get detailsCtrl(): FormControl {
      return this.addForm.get('details') as FormControl;
    }

    get dueDateCtrl(): FormControl {
      return this.addForm.get('dueDate') as FormControl;
    }

    ngOnInit(): void {
        console.log();
    }

    public saveChild(): void {
      const dialog = this.dialog.openDialogs[0];
    }

    public cancel(): void {
      const dialog = this.dialog.openDialogs[0];
      dialog.close(false);
    }
}

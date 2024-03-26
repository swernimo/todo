import { Component, OnInit, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { InputComponent } from '../../components/input/input.component';
import { MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ConfigManagerService } from '../../services/config-manager.service';
import ITodoListAddChildRequest from '../../../shared/interfaces/ITodoListAddChildRequest';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-list-item-details',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ButtonComponent, InputComponent],
  templateUrl: './add-list-item-details.component.html',
  styleUrl: './add-list-item-details.component.css'
})
export class AddListItemDetailsComponent implements OnInit {

    public addForm: FormGroup = this.formBuilder.group({
      name: new FormControl(null, [Validators.required]),
      details: new FormControl(null),
      dueDate: new FormControl(null, [Validators.required]),
      parentId: new FormControl(this.data.parentId, [Validators.required])
    });

    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private http: HttpClient, private configSrv: ConfigManagerService, @Inject(MAT_DIALOG_DATA) public data: {parentId: string}) { }

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
      const request: ITodoListAddChildRequest = {
        parentId: this.data.parentId,
        childToAdd: {
          children: [],
          isCompleted: false,
          dueDate: this.dueDateCtrl.value,
          name: this.nameCtrl.value,
          details: this.detailsCtrl.value ?? '',
          id: ''
        }
      }
      this.http.post<ITodoListAddChildRequest>(`${this.configSrv.apiUrl}/listdetails/addchild`, request)
      .subscribe((response) => {
        const dialog = this.dialog.openDialogs[0];
        if (response) {
          dialog.close(true);
        } else {
          dialog.close(false);
        }
      });
    }

    public cancel(): void {
      const dialog = this.dialog.openDialogs[0];
      dialog.close(false);
    }
}

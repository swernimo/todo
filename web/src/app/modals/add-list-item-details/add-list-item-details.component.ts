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
import ITodoItem from '../../../shared/interfaces/ITodoItem';

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
      parentId: new FormControl(this.data.parentId, [Validators.required]),
      isCompleted: new FormControl(false),
      editItemId: new FormControl(''),
      children: new FormControl([])
    });

    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private http: HttpClient, private configSrv: ConfigManagerService, @Inject(MAT_DIALOG_DATA) public data: {parentId: string, isEdit: boolean, editItem: ITodoItem}) { }

    get nameCtrl(): FormControl {
      return this.addForm.get('name') as FormControl;
    }

    get detailsCtrl(): FormControl {
      return this.addForm.get('details') as FormControl;
    }

    get dueDateCtrl(): FormControl {
      return this.addForm.get('dueDate') as FormControl;
    }

    get isCompletedCtrl(): FormControl {
      return this.addForm.get('isCompleted') as FormControl;
    }

    get editItemIdCtrl(): FormControl {
      return this.addForm.get('editItemId') as FormControl;
    }

    get childrenCtrl(): FormControl {
      return this.addForm.get('children') as FormControl;
    }

    ngOnInit(): void {
      const editItem = this.data?.editItem;
      if (this.data.isEdit && editItem) {
        this.nameCtrl.setValue(editItem.name);
        this.detailsCtrl.setValue(editItem.details);
        this.dueDateCtrl.setValue(editItem.dueDate);
        this.editItemIdCtrl.setValue(editItem.id);
        this.isCompletedCtrl.setValue(editItem.isCompleted);
        this.childrenCtrl.setValue(editItem.children);
      }
    }

    public saveChild(): void {
      const request: ITodoListAddChildRequest = {
        parentId: this.data.parentId,
        childToAdd: {
          children: this.childrenCtrl.value,
          isCompleted: this.isCompletedCtrl.value,
          dueDate: this.dueDateCtrl.value,
          name: this.nameCtrl.value,
          details: this.detailsCtrl.value ?? '',
          id: this.editItemIdCtrl.value
        }
      }

      if (this.data.isEdit) {
        this.http.put<boolean>(`${this.configSrv.apiUrl}/listdetails/updateChild`, request.childToAdd)
        .subscribe({
          next: (success) => {
            const dialog = this.dialog.openDialogs[0];
            dialog.close(success);
          }
        });
      } else {
        this.http.post<ITodoListAddChildRequest>(`${this.configSrv.apiUrl}/listdetails/addchild`, request)
        .subscribe((response) => {
          const dialog = this.dialog.openDialogs[0];
          dialog.close(response);
        });
      }
    }

    public cancel(): void {
      const dialog = this.dialog.openDialogs[0];
      dialog.close(false);
    }
}

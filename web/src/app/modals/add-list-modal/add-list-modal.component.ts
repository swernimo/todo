import { Component, Output, EventEmitter, Input, OnInit } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../../components/button/button.component';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ConfigManagerService } from '../../services/config-manager.service';
import ITodoList from '../../../shared/interfaces/ITodoList';

@Component({
  selector: 'app-add-list-modal',
  standalone: true,
  imports: [InputComponent, ReactiveFormsModule, ButtonComponent, MatDialogModule],
  templateUrl: './add-list-modal.component.html',
  styleUrl: './add-list-modal.component.css'
})
export class AddListModalComponent implements OnInit {

  @Input()
  public dialogRef: MatDialogRef<any> | null = null;

  @Input()
  public title: string = 'Add New List';

  @Output()
  public saveList: EventEmitter<string> = new EventEmitter();

  @Output()
  public cancelSave: EventEmitter<void> = new EventEmitter();

  public addListForm: FormGroup = this.builder.group({
    name: new FormControl(null, [Validators.required])
  });

  constructor(private builder: FormBuilder, private dialog: MatDialog, private http: HttpClient, private configSrv: ConfigManagerService) { }

  ngOnInit(): void {
    if (!this.dialogRef) {
      this.dialogRef = this.dialog.openDialogs[0];
    }
  }

  get listNameCtrl(): FormControl {
    return this.addListForm.get('name') as FormControl;
  }

  public cancelClicked(): void {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }

  public saveListClicked(): void {
    if (this.addListForm.valid) {
      this.http.post<ITodoList>(`${this.configSrv.apiUrl}/list`, {
        name: this.listNameCtrl.value
      })
      .subscribe({
        next: (result) => {
          if (result && this.dialogRef) {
            this.dialogRef.close({
              success: true,
              list: result
            });
          }
        }
      });
    }
  }
}

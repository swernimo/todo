import { HttpClient } from '@angular/common/http';
import { Component, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditbuttonComponent } from '../../components/editbutton/editbutton.component';
import ITodoList from '../../../shared/interfaces/ITodoList';
import { ConfigManagerService } from '../../services/config-manager.service';
import { AddbuttonComponent } from '../../components/addbutton/addbutton.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DeleteButtonComponent } from '../../components/delete-button/delete-button.component';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddListItemDetailsComponent } from '../../modals/add-list-item-details/add-list-item-details.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { CommonModule } from '@angular/common';
import ITodoItem from '../../../shared/interfaces/ITodoItem';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InputComponent } from '../../components/input/input.component';

@Component({
  selector: 'app-listdetails',
  standalone: true,
  imports: [EditbuttonComponent, AddbuttonComponent, MatCheckboxModule, DeleteButtonComponent, MatDialogModule, MatTooltipModule, CommonModule, InputComponent],
  templateUrl: './listdetails.component.html',
  styleUrl: './listdetails.component.css'
})
export class ListdetailsComponent implements OnInit {

  public listName = computed(() => {
    const l = this.list();
    return l?.name ?? '';
  });

  public listId = signal<string>('');

  public list = signal<ITodoList | null>(null);

  public isClosed = computed(() => {
    const l = this.list();
    if (l) {
      return l.isClosed;
    }
    return false;
  });

  public showNoResults = computed(() => {
    const l = this.list();
    return l?.items.length == 0;
  });

  public addItemDialogRef: MatDialogRef<AddListItemDetailsComponent, any> | null = null;

  public editMode = signal<boolean>(false);

  public listForm: FormGroup = this.formBuilder.group({
    listName: new FormControl<string>(this.listName(), [Validators.required])
  });

  constructor(private http: HttpClient, private router: Router, private currentRoute: ActivatedRoute, private configSrv: ConfigManagerService, private dialog: MatDialog, private formBuilder: FormBuilder) {}

  get listNameCtrl(): FormControl {
    return this.listForm.get('listName') as FormControl;
  }

  ngOnInit(): void {
      this.currentRoute.params?.subscribe((p) => {
        if (p['id']) {
          this.listId.set(p['id']);
          this.loadDetails();
        } else {
          //TODO: log the error
          this.goBack();
        }
      });
  }

  public loadDetails(): void {
    this.http.get<ITodoList>(`${this.configSrv.apiUrl}/listdetails/${this.listId()}`)
    .subscribe({
      next: (r) => {
        if (r) {
          this.list.set(r);
        } else {
          this.goBack();
        }
      }
    });
  }

  public goBack(): void {
    this.router.navigateByUrl('');
  }

  public addChild(id?: string): void {
    if (this.addItemDialogRef) {
      this.addItemDialogRef.close();
    }

    id = id ?? this.listId();
    
    this.addItemDialogRef = this.dialog.open(AddListItemDetailsComponent, {
      height: '350px',
      width: '300px',
      data: {
        parentId: id,
        isEdit: false
      }
    });

    this.addItemDialogRef.afterClosed()
    .subscribe((refresh) => {
      if (refresh) {
        this.loadDetails();
      }
    });
  }

  public deleteList(): void {
    this.http.delete<boolean>(`${this.configSrv.apiUrl}/list/${this.listId()}`)
    .subscribe({
      next: (success) => {
        if (success) {
          this.goBack();
        }
      }
    });
  }

  public deleteChildTask(childId: string): void {
    this.http.delete<boolean>(`${this.configSrv.apiUrl}/listdetails/deletechild/${childId}`)
    .subscribe({
      next: (success) => {
        if (success) {
          this.loadDetails();
        }
      }
    });
  }

  public completeChanged(todoItem: ITodoItem): void {
    todoItem.isCompleted = !todoItem.isCompleted;
    if (todoItem.isCompleted) {
      todoItem.children?.forEach(c => c.isCompleted = true);
    }
    this.http.put<boolean>(`${this.configSrv.apiUrl}/listdetails/updateChild`, todoItem)
    .subscribe({
      next: (success) => {
        if (success) {
          this.loadDetails();
        }
      }
    });
  }

  public editItem(todoItem: ITodoItem, parentId?: string): void {
    if (this.addItemDialogRef) {
      this.addItemDialogRef.close();
    }
    
    this.addItemDialogRef = this.dialog.open(AddListItemDetailsComponent, {
      height: '350px',
      width: '300px',
      data: {
        isEdit: true,
        editItem: todoItem,
        parentId: parentId ?? this.listId()
      }
    });

    this.addItemDialogRef.afterClosed()
    .subscribe((refresh) => {
      if (refresh) {
        this.loadDetails();
      }
    });
  }

  public editList(): void {
    this.listNameCtrl.setValue(this.listName());
    this.editMode.set(true);
  }

  public listNameBlur(): void {
    this.editMode.set(false);
    if (this.list()) {
      //@ts-ignore
      this.list().name = this.listNameCtrl.value;
      this.http.put<boolean>(`${this.configSrv.apiUrl}/list`, this.list())
      .subscribe({
        next: (success) => {
          if (success) {
            this.loadDetails();
          }
        }
      });
    }
  }
}

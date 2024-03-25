import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { AddbuttonComponent } from '../../components/addbutton/addbutton.component';
import { HttpClient } from '@angular/common/http';
import { ConfigManagerService } from '../../services/config-manager.service';
import ITodoListGetResponse from '../../../shared/interfaces/ITodoListGetResponse';
import ITodoList from '../../../shared/interfaces/ITodoList';
import { MatDialogModule, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AddListModalComponent } from '../../modals/add-list-modal/add-list-modal.component';
import { DeleteButtonComponent } from '../../components/delete-button/delete-button.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AddbuttonComponent, MatDialogModule, DeleteButtonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public todoListArr = signal<ITodoList[]>([]);

  private addListDialogRef: MatDialogRef<AddListModalComponent, any> | null = null;

  constructor(private http: HttpClient, private configSrv: ConfigManagerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.getTodoLists();
  }

  public getTodoLists(): void {
    this.http.get<ITodoListGetResponse>(`${this.configSrv.apiUrl}/list`)
    .subscribe(r => {
      console.log();
      this.todoListArr.set(r.todolist);
    });
  }

  public addList(): void {
    if (this.addListDialogRef) {
      this.addListDialogRef.close();
    }
    this.addListDialogRef = this.dialog.open(AddListModalComponent, {
      width: '250px',
      height: '100px',
      data: {
        dialogRef: this.addListDialogRef
      }
    });

    this.addListDialogRef.afterClosed()
    .subscribe({
      next: (result) => {
        if (result?.success) {
          this.getTodoLists();
        } else {
          //cancel or error
        }
      }
    });
  }

  public deleteList(id: string): void {
    console.log(`Delete List with ID: ${id}`);
  }
}

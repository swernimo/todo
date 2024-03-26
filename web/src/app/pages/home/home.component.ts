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
import { Router } from '@angular/router';

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

  constructor(private http: HttpClient, private configSrv: ConfigManagerService, private dialog: MatDialog, private router: Router) {}

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
    this.http.delete<boolean>(`${this.configSrv.apiUrl}/list/${id}`)
    .subscribe({
      next: (success) => {
        console.log(`Delete List with ID: ${id}`);
        if (success) {
          this.getTodoLists();
        }
      }
    });
  }

  public deleteAllLists(): void {
    this.http.delete<boolean>(`${this.configSrv.apiUrl}/list/deleteall`)
    .subscribe({
      next: (success) => {
        if (success) {
          this.getTodoLists();
        }
      }
    });
  }

  public navigateToDetails(id: string): void {
    this.router.navigateByUrl(`listdetails/${id}`);
  }
}

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

@Component({
  selector: 'app-listdetails',
  standalone: true,
  imports: [EditbuttonComponent, AddbuttonComponent, MatCheckboxModule, DeleteButtonComponent, MatDialogModule, MatTooltipModule],
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

  constructor(private http: HttpClient, private router: Router, private currentRoute: ActivatedRoute, private configSrv: ConfigManagerService, private dialog: MatDialog) {}

  ngOnInit(): void {
      this.currentRoute.params.subscribe((p) => {
        if (p['id']) {
          this.listId.set(p['id']);
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
        } else {
          //TODO: log the error
          this.goBack();
        }
      });
  }

  public goBack(): void {
    this.router.navigateByUrl('');
  }

  public addChild(): void {
    if (this.addItemDialogRef) {
      this.addItemDialogRef.close();
    }

    this.addItemDialogRef = this.dialog.open(AddListItemDetailsComponent, {
      height: '300px',
      width: '300px',
      data: {
        parentId: this.listId()
      }
    });
  }

}

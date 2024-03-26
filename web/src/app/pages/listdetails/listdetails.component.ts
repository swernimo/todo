import { HttpClient } from '@angular/common/http';
import { Component, signal, OnInit, computed } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EditbuttonComponent } from '../../components/editbutton/editbutton.component';
import ITodoList from '../../../shared/interfaces/ITodoList';
import { ConfigManagerService } from '../../services/config-manager.service';
import { AddbuttonComponent } from '../../components/addbutton/addbutton.component';

@Component({
  selector: 'app-listdetails',
  standalone: true,
  imports: [EditbuttonComponent, AddbuttonComponent],
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

  constructor(private http: HttpClient, private router: Router, private currentRoute: ActivatedRoute, private configSrv: ConfigManagerService) {}

  ngOnInit(): void {
      this.currentRoute.params.subscribe((p) => {
        if (p['id']) {
          this.listId.set(p['id']);
          this.http.get<ITodoList>(`${this.configSrv.apiUrl}/listdetails/${this.listId()}`)
          .subscribe((r) => {
            if (r) {
              this.list.set(r);
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
    console.log('Open Add Task Modal');
  }

}

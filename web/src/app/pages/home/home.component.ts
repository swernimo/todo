import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { AddbuttonComponent } from '../../components/addbutton/addbutton.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConfigManagerService } from '../../services/config-manager.service';
import ITodoListGetResponse from '../../../shared/interfaces/ITodoListGetResponse';
import ITodoList from '../../../shared/interfaces/ITodoList';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, AddbuttonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  public todoList = signal<ITodoList[]>([]);

  constructor(private http: HttpClient, private configSrv: ConfigManagerService) {}

  ngOnInit(): void {
      this.http.get<ITodoListGetResponse>(`${this.configSrv.apiUrl}/list`, {
        headers: new HttpHeaders().append('Access-Control-Allow-Origin', 'true').append('Content-Type', 'application/json')
      })
      .subscribe(r => {
        this.todoList.set(r.todoList);
      });
  }

  public addList(): void {
    console.log('Add List');
  }
}

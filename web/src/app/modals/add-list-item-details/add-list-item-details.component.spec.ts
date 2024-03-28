import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { AddListItemDetailsComponent } from './add-list-item-details.component';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { HttpClient } from '@angular/common/http';
import { ConfigManagerService } from '../../services/config-manager.service';

fdescribe('AddListItemDetailsComponent', () => {
  let component: AddListItemDetailsComponent;
  let fixture: ComponentFixture<AddListItemDetailsComponent>;
  let httpClientSpy: Spy<HttpClient>;

  /**
   * 
    constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private http: HttpClient, private configSrv: ConfigManagerService, @Inject(MAT_DIALOG_DATA) public data: {parentId: string, isEdit: boolean, editItem: ITodoItem}) { }

   */
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddListItemDetailsComponent],
      providers: [
        FormBuilder,
        MatDialog,
        {
          provide: HttpClient,
          useValue: createSpyFromClass(HttpClient)
        },
        ConfigManagerService,
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        }
      ]
    })
    .compileComponents();
    
    httpClientSpy = TestBed.inject<any>(HttpClient);
    httpClientSpy.get.and.returnValue(of());
    httpClientSpy.post.and.returnValue(of());
    httpClientSpy.put.and.returnValue(of());
    httpClientSpy.delete.and.returnValue(of());

    fixture = TestBed.createComponent(AddListItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

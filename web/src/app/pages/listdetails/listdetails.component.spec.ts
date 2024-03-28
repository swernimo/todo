import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListdetailsComponent } from './listdetails.component';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfigManagerService } from '../../services/config-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';

describe('ListdetailsComponent', () => {
  let component: ListdetailsComponent;
  let fixture: ComponentFixture<ListdetailsComponent>;
  let activatedRouterMock: Spy<ActivatedRoute>;
  let httpClientSpy: Spy<HttpClient>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListdetailsComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: createSpyFromClass(HttpClient)
        },
        Router,
        {
          provide: ActivatedRoute,
          useValue: createSpyFromClass(ActivatedRoute)
        },
        ConfigManagerService, 
        MatDialog, 
        FormBuilder
      ]
    })
    .compileComponents();
    httpClientSpy = TestBed.inject<any>(HttpClient);
    httpClientSpy.get.and.returnValue(of());
    httpClientSpy.post.and.returnValue(of());
    httpClientSpy.put.and.returnValue(of());
    httpClientSpy.delete.and.returnValue(of());
    
    activatedRouterMock = TestBed.inject<any>(ActivatedRoute);
    activatedRouterMock.params?.subscribe();
    
    fixture = TestBed.createComponent(ListdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { HttpClient } from '@angular/common/http';
import { ConfigManagerService } from '../../services/config-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Spy, createSpyFromClass } from 'jasmine-auto-spies';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpClientSpy: Spy<HttpClient>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeComponent],
      providers: [
        {
          provide: HttpClient,
          useValue: createSpyFromClass(HttpClient)
        },
        ConfigManagerService,
        MatDialog,
        Router
      ]
    })
    .compileComponents();
    httpClientSpy = TestBed.inject<any>(HttpClient);
    httpClientSpy.get.and.returnValue(of());
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

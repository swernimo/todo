import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddListItemDetailsComponent } from './add-list-item-details.component';

describe('AddListItemDetailsComponent', () => {
  let component: AddListItemDetailsComponent;
  let fixture: ComponentFixture<AddListItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddListItemDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AddListItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

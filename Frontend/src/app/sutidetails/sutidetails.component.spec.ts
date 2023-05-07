import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SutidetailsComponent } from './sutidetails.component';

describe('SutidetailsComponent', () => {
  let component: SutidetailsComponent;
  let fixture: ComponentFixture<SutidetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SutidetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SutidetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

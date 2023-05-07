import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SutiformComponent } from './sutiform.component';

describe('SutiformComponent', () => {
  let component: SutiformComponent;
  let fixture: ComponentFixture<SutiformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SutiformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SutiformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasedComponent } from './purchased.component';

describe('PurchasedComponent', () => {
  let component: PurchasedComponent;
  let fixture: ComponentFixture<PurchasedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchasedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchasedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

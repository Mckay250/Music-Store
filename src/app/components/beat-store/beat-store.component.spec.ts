import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeatStoreComponent } from './beat-store.component';

describe('BeatStoreComponent', () => {
  let component: BeatStoreComponent;
  let fixture: ComponentFixture<BeatStoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeatStoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeatStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

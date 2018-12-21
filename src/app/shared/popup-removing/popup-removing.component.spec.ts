import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupRemovingComponent } from './popup-removing.component';

describe('PopupRemovingComponent', () => {
  let component: PopupRemovingComponent;
  let fixture: ComponentFixture<PopupRemovingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupRemovingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupRemovingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupLoadingComponent } from './popup-loading.component';

describe('PopupLoadingComponent', () => {
  let component: PopupLoadingComponent;
  let fixture: ComponentFixture<PopupLoadingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupLoadingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupLoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

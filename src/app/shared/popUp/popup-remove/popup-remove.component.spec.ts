import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopIconComponent } from './pop-icon.component';

describe('PopIconComponent', () => {
  let component: PopIconComponent;
  let fixture: ComponentFixture<PopIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopIconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

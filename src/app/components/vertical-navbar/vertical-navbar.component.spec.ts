import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalNavbarComponent } from './vertical-navbar.component';

describe('VerticalNavbarComponent', () => {
  let component: VerticalNavbarComponent;
  let fixture: ComponentFixture<VerticalNavbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerticalNavbarComponent]
    });
    fixture = TestBed.createComponent(VerticalNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

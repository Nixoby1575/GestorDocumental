import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyfilesComponent } from './myfiles.component';

describe('MyfilesComponent', () => {
  let component: MyfilesComponent;
  let fixture: ComponentFixture<MyfilesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyfilesComponent]
    });
    fixture = TestBed.createComponent(MyfilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

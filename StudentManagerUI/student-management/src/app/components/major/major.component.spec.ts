import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorComponent } from './major.component';

describe('MajorComponent', () => {
  let component: MajorComponent;
  let fixture: ComponentFixture<MajorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MajorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

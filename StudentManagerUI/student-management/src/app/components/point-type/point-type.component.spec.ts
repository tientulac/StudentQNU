import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PointTypeComponent } from './point-type.component';

describe('PointTypeComponent', () => {
  let component: PointTypeComponent;
  let fixture: ComponentFixture<PointTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PointTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PointTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

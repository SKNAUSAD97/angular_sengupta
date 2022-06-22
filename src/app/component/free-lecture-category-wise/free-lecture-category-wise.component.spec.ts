import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreeLectureCategoryWiseComponent } from './free-lecture-category-wise.component';

describe('FreeLectureCategoryWiseComponent', () => {
  let component: FreeLectureCategoryWiseComponent;
  let fixture: ComponentFixture<FreeLectureCategoryWiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FreeLectureCategoryWiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FreeLectureCategoryWiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

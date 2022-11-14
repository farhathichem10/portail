import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridenfantComponent } from './gridenfant.component';

describe('GridenfantComponent', () => {
  let component: GridenfantComponent;
  let fixture: ComponentFixture<GridenfantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GridenfantComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GridenfantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

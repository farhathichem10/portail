import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AffilpersComponent } from './affilpers.component';

describe('AffilpersComponent', () => {
  let component: AffilpersComponent;
  let fixture: ComponentFixture<AffilpersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AffilpersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AffilpersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

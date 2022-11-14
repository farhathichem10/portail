import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScolfamComponent } from './scolfam.component';

describe('ScolfamComponent', () => {
  let component: ScolfamComponent;
  let fixture: ComponentFixture<ScolfamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScolfamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScolfamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

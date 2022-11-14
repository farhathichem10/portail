import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpprofComponent } from './expprof.component';

describe('ExpprofComponent', () => {
  let component: ExpprofComponent;
  let fixture: ComponentFixture<ExpprofComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpprofComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpprofComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

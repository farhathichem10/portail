import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndemniteComponent } from './indemnite.component';

describe('IndemniteComponent', () => {
  let component: IndemniteComponent;
  let fixture: ComponentFixture<IndemniteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IndemniteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IndemniteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

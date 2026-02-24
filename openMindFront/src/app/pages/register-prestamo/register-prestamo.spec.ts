import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPrestamo } from './register-prestamo';

describe('RegisterPrestamo', () => {
  let component: RegisterPrestamo;
  let fixture: ComponentFixture<RegisterPrestamo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterPrestamo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterPrestamo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

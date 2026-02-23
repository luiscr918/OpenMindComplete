import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterLibro } from './register-libro';

describe('RegisterLibro', () => {
  let component: RegisterLibro;
  let fixture: ComponentFixture<RegisterLibro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterLibro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterLibro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

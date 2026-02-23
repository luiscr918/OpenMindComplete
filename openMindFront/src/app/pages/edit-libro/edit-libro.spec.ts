import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditLibro } from './edit-libro';

describe('EditLibro', () => {
  let component: EditLibro;
  let fixture: ComponentFixture<EditLibro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditLibro]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditLibro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

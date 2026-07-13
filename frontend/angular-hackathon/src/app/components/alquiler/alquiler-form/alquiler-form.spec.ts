import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerForm } from './alquiler-form';

describe('AlquilerForm', () => {
  let component: AlquilerForm;
  let fixture: ComponentFixture<AlquilerForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquilerForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlquilerForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilerList } from './alquiler-list';

describe('AlquilerList', () => {
  let component: AlquilerList;
  let fixture: ComponentFixture<AlquilerList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlquilerList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AlquilerList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

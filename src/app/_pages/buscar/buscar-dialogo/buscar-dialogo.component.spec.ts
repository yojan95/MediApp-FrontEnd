import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarDialogoComponent } from './buscar-dialogo.component';

describe('BuscarDialogoComponent', () => {
  let component: BuscarDialogoComponent;
  let fixture: ComponentFixture<BuscarDialogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuscarDialogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarDialogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

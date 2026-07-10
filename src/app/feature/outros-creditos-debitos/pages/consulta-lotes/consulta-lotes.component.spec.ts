import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideStore } from '@ngrx/store';

import { ConsultaLotesPageComponent } from './consulta-lotes.component';
import {
  consultaLotesFeatureKey,
  consultaLotesReducer,
} from '../../store/consulta-lotes.reducer';

describe('ConsultaLotesPageComponent', () => {
  let component: ConsultaLotesPageComponent;
  let fixture: ComponentFixture<ConsultaLotesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultaLotesPageComponent],
      providers: [
        provideStore({
          [consultaLotesFeatureKey]: consultaLotesReducer,
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ConsultaLotesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

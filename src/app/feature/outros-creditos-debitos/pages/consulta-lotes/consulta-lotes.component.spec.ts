import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { ConsultaLotesActions } from '../../store/consulta-lotes.actions';
import { filtroInicial, Lote } from '../../store/consulta-lotes.models';
import { ConsultaLotesPageComponent } from './consulta-lotes.component';

describe('ConsultaLotesPageComponent', () => {
  let component: ConsultaLotesPageComponent;
  let store: { select: jest.Mock; dispatch: jest.Mock };

  beforeEach(() => {
    store = { select: jest.fn(() => of(null)), dispatch: jest.fn() };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [{ provide: Store, useValue: store }],
    });

    component = TestBed.runInInjectionContext(
      () => new ConsultaLotesPageComponent(),
    );
  });

  it('creates its form and observable selectors', () => {
    expect(component).toBeTruthy();
    expect(component.form.getRawValue()).toEqual(filtroInicial);
    expect(component.situacoes).toEqual([
      'Todas',
      'Aberto',
      'Enviado',
      'Confirmado',
    ]);
    expect(store.select).toHaveBeenCalledTimes(6);
  });

  it('dispatches a search using the form values', () => {
    component.form.patchValue({ instituicao: 'Sicoob', valorInicial: 10 });
    component.pesquisar();

    expect(store.dispatch).toHaveBeenCalledWith(
      ConsultaLotesActions.pesquisar({ filtro: component.form.getRawValue() }),
    );
  });

  it('resets filters and dispatches the clear action', () => {
    component.form.patchValue({ instituicao: 'Sicoob' });
    component.limparFiltros();

    expect(component.form.getRawValue()).toEqual(filtroInicial);
    expect(store.dispatch).toHaveBeenCalledWith(
      ConsultaLotesActions.limparFiltros(),
    );
  });

  it('dispatches selection and pagination actions', () => {
    const lotes = [{ id: 1 }] as Lote[];
    component.selecionarLotes(lotes);
    component.trocarPagina(2);

    expect(store.dispatch).toHaveBeenNthCalledWith(
      1,
      ConsultaLotesActions.selecionarLotes({ lotes }),
    );
    expect(store.dispatch).toHaveBeenNthCalledWith(
      2,
      ConsultaLotesActions.trocarPagina({ pagina: 2 }),
    );
  });

  it.each([
    'incluir',
    'alterar',
    'excluir',
    'visualizar',
    'confirmar',
    'enviar',
    'visualizarJustificativa',
  ] as const)('logs feedback when %s is invoked', (method) => {
    const log = jest.spyOn(console, 'log').mockImplementation();

    component[method]();

    expect(log).toHaveBeenCalledTimes(1);
    log.mockRestore();
  });
});

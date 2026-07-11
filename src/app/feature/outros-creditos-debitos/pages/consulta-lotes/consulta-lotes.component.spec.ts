import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { Store } from '@ngrx/store';
import { MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { of, Subject } from 'rxjs';

import { ConsultaLotesActions } from '../../store/consulta-lotes.actions';
import { ConsultaLotesPageComponent } from './consulta-lotes.component';
import { IncluirLancamentoComponent } from '../../../../shared/components/incluir-lancamento/incluir-lancamento.component';
import { ILancamento } from '../../../../shared/interfaces/lancamento.interface';
import { FILTRO_INICIAL } from '../../../../shared/enums/filtro-inicial.enum';
import { ILote } from '../../../../shared/interfaces/lote.interface';

describe('ConsultaLotesPageComponent', () => {
  let component: ConsultaLotesPageComponent;
  let store: { select: jest.Mock; dispatch: jest.Mock };
  let onClose: Subject<ILancamento[] | undefined>;
  let dialogService: { open: jest.Mock };
  let messageService: { add: jest.Mock };

  beforeEach(() => {
    jest.useFakeTimers();
    store = { select: jest.fn(() => of(null)), dispatch: jest.fn() };
    onClose = new Subject<ILancamento[] | undefined>();
    dialogService = {
      open: jest.fn(() => ({ onClose }) as unknown as DynamicDialogRef),
    };
    messageService = { add: jest.fn() };

    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [
        { provide: Store, useValue: store },
        { provide: DialogService, useValue: dialogService },
        { provide: MessageService, useValue: messageService },
      ],
    });

    component = TestBed.runInInjectionContext(
      () => new ConsultaLotesPageComponent(),
    );
  });

  it('creates its form and observable selectors', () => {
    expect(component).toBeTruthy();
    expect(component.form.getRawValue()).toEqual(FILTRO_INICIAL);
    expect(component.situacoes).toEqual([
      'Todas',
      'Aberto',
      'Enviado',
      'Confirmado',
    ]);
    expect(store.select).toHaveBeenCalledTimes(6);
  });

  it('debounces the search and toggles its loading lifecycle', () => {
    component.form.patchValue({ instituicao: 'Sicoob', valorInicial: 10 });
    component.pesquisar();
    component.pesquisar();

    expect(store.dispatch).not.toHaveBeenCalled();
    jest.advanceTimersByTime(300);

    expect(store.dispatch).toHaveBeenCalledWith(
      ConsultaLotesActions.pesquisar({ filtro: component.form.getRawValue() }),
    );

    jest.advanceTimersByTime(350);
    expect(store.dispatch).toHaveBeenLastCalledWith(
      ConsultaLotesActions.pesquisaConcluida(),
    );
  });

  it('handles a simulated search error without changing the layout', () => {
    component.form.patchValue({ instituicao: 'erro' });
    component.pesquisar();
    jest.advanceTimersByTime(300);

    expect(store.dispatch).toHaveBeenCalledWith(
      ConsultaLotesActions.pesquisaFalhou({
        erro: 'Falha simulada ao pesquisar lotes. Tente novamente.',
      }),
    );
    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'error' }),
    );
  });

  it('resets filters and dispatches the clear action', () => {
    component.form.patchValue({ instituicao: 'Sicoob' });
    component.limparFiltros();

    expect(component.form.getRawValue()).toEqual(FILTRO_INICIAL);
    expect(store.dispatch).toHaveBeenCalledWith(
      ConsultaLotesActions.limparFiltros(),
    );
  });

  it('dispatches selection and pagination actions', () => {
    const lotes = [{ id: 1 }] as ILote[];
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

  it('opens the launch dialog and adds an aggregated lot when it closes', () => {
    component.incluir();
    expect(dialogService.open).toHaveBeenCalledWith(
      IncluirLancamentoComponent,
      expect.objectContaining({ showHeader: false }),
    );

    onClose.next(undefined);
    expect(store.dispatch).not.toHaveBeenCalled();

    onClose.next([
      {
        id: 1,
        pa: '0001',
        valor: 12.5,
        contaCorrente: '12345-6',
        titular: 'Maria da Silva',
        historico: 'Lançamento Manual',
        documento: 'DOC-01',
        situacao: 'Pendente',
      },
      {
        id: 2,
        pa: '0001',
        valor: 7.5,
        contaCorrente: '23456-7',
        titular: 'João da Silva',
        historico: 'Crédito em Conta',
        documento: 'DOC-02',
        situacao: 'Pendente',
      },
    ]);
    expect(store.dispatch).toHaveBeenCalledWith(
      ConsultaLotesActions.incluirLote({
        lote: expect.objectContaining({
          instituicaoResponsavel: '0001 - Ponto de Atendimento',
          valor: 20,
          quantidadeLancamentos: 2,
          situacao: 'Aberto',
        }),
      }),
    );
  });

  it.each([
    'alterar',
    'excluir',
    'visualizar',
    'confirmar',
    'enviar',
    'visualizarJustificativa',
  ] as const)('shows an informational message when %s is invoked', (method) => {
    component[method]();

    expect(messageService.add).toHaveBeenCalledWith(
      expect.objectContaining({ severity: 'info' }),
    );
  });
});

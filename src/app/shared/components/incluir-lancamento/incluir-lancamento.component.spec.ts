import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { IncluirLancamentoComponent } from './incluir-lancamento.component';

describe('IncluirLancamentoComponent', () => {
  let component: IncluirLancamentoComponent;
  let fixture: ComponentFixture<IncluirLancamentoComponent>;
  let dialogRef: { close: jest.Mock };

  beforeEach(async () => {
    dialogRef = { close: jest.fn() };
    await TestBed.configureTestingModule({
      imports: [IncluirLancamentoComponent],
      providers: [{ provide: DynamicDialogRef, useValue: dialogRef }],
    }).compileComponents();

    fixture = TestBed.createComponent(IncluirLancamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  function preencherFormularioValido(): void {
    component.form.patchValue({
      contaCorrente: '12345-6',
      valor: 125.5,
      historico: 'Lançamento Manual',
      documento: 'DOC-01',
      pa: '0001',
    });
  }

  it('creates the component with its initial readonly statuses', () => {
    expect(component).toBeTruthy();
    expect(component.form.getRawValue().situacao).toBe('Pendente');
    expect(component.form.getRawValue().situacaoCsc).toBe(
      'Aguardando Processamento CCO',
    );
  });

  it('filters and selects account and event search results', () => {
    expect(component.contasFiltradas).toHaveLength(3);
    expect(component.eventosFiltrados).toHaveLength(3);
    component.form.controls.contaCorrente.setValue(null);
    component.abrirBuscaConta();
    expect(component.termoBuscaConta).toBe('');

    component.form.controls.contaCorrente.setValue('123');
    component.abrirBuscaConta();
    expect(component.buscaContaVisivel).toBe(true);
    expect(component.contasFiltradas).toHaveLength(1);

    component.selecionarConta(component.contas[0]);
    expect(component.titularConta).toBe('Maria Aparecida da Silva');
    expect(component.form.controls.pa.value).toBe('0001');
    expect(component.buscaContaVisivel).toBe(false);

    component.form.controls.pa.setValue('0002');
    component.selecionarConta(component.contas[0]);
    expect(component.form.controls.pa.value).toBe('0002');

    component.form.controls.idEvento.setValue(null);
    component.abrirBuscaEvento();
    expect(component.termoBuscaEvento).toBe('');
    component.form.controls.idEvento.setValue('centralização');
    component.abrirBuscaEvento();
    expect(component.eventosFiltrados).toHaveLength(2);
    component.selecionarEvento(component.eventos[0]);
    expect(component.form.controls.idEvento.value).toBe('102');
    expect(component.descricaoEvento).toContain('Centralização');
    expect(component.buscaEventoVisivel).toBe(false);
  });

  it('validates, includes, edits, duplicates and excludes launches in memory', () => {
    component.incluirLancamento();
    expect(component.form.touched).toBe(true);
    expect(component.lancamentos).toHaveLength(0);

    preencherFormularioValido();
    component.titularConta = 'Maria Aparecida da Silva';
    component.incluirLancamento();
    expect(component.lancamentos).toHaveLength(1);
    expect(component.lancamentos[0]).toMatchObject({ id: 1, valor: 125.5 });
    expect(component.form.controls.valor.value).toBeNull();

    component.alterarLancamento();
    expect(component.lancamentos).toHaveLength(0);
    expect(component.form.controls.documento.value).toBe('DOC-01');

    component.incluirLancamento();
    component.duplicarLancamento();
    expect(component.lancamentos.map((item) => item.id)).toEqual([2, 3]);
    component.excluirLancamento();
    expect(component.lancamentos).toHaveLength(1);

    component.lancamentoSelecionado = null;
    component.alterarLancamento();
    component.excluirLancamento();
    component.duplicarLancamento();
    expect(component.lancamentos).toHaveLength(1);
  });

  it('only closes after there is a launch and returns all launches on conclusion', () => {
    component.finalizar();
    expect(dialogRef.close).not.toHaveBeenCalled();

    preencherFormularioValido();
    component.form.markAsDirty();
    component.finalizar();
    expect(dialogRef.close).toHaveBeenCalledWith([
      expect.objectContaining({ valor: 125.5, documento: 'DOC-01' }),
    ]);

    component.fecharModal();
    expect(dialogRef.close).toHaveBeenLastCalledWith();
  });
});

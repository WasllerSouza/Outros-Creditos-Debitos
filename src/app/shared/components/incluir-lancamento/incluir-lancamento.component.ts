import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { TableModule } from 'primeng/table';
import { ILancamento } from '../../interfaces/lancamento.interface';
import { EVENTOS_CSC } from '../../enums/eventos-csc.enum';
import { IContaCorrente } from '../../interfaces/conta-corrente.interface';
import { LISTA_CONTA_CORRENTE } from '../../enums/conta-corrente.enum';
import { IPas } from '../../interfaces/pas.interface';
import { PAS } from '../../enums/pas.enum';
import { HISTORICOS } from '../../enums/historicos.enum';
import { IEventoCsc } from '../../interfaces/evento-csc.interface';

@Component({
  selector: 'app-incluir-lancamento',
  standalone: true,
  imports: [
    CurrencyPipe,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    CheckboxModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    InputTextModule,
    InputTextareaModule,
    TableModule,
  ],
  templateUrl: './incluir-lancamento.component.html',
  styleUrl: './incluir-lancamento.component.scss',
})
export class IncluirLancamentoComponent {
  private readonly fb = inject(FormBuilder);
  private readonly dialogRef = inject(DynamicDialogRef, { optional: true });

  readonly tituloModal = 'Incluir Lançamento';

  readonly historicos = HISTORICOS;
  readonly pas: IPas[] = PAS;
  readonly contas: IContaCorrente[] = LISTA_CONTA_CORRENTE;
  readonly eventos: IEventoCsc[] = EVENTOS_CSC;
  readonly form = this.fb.group({
    contaCorrente: ['', Validators.required],
    valor: [null as number | null, [Validators.required, Validators.min(0.01)]],
    historico: ['', Validators.required],
    estorno: [false],
    documento: ['', Validators.required],
    descricao: [''],
    situacao: [{ value: 'Pendente', disabled: true }],
    pa: ['', Validators.required],
    idEvento: [''],
    complHistorico: [''],
    situacaoCsc: [{ value: 'Aguardando Processamento CCO', disabled: true }],
    idDocCsc: [''],
  });
  lancamentos: ILancamento[] = [];
  lancamentoSelecionado: ILancamento | null = null;
  titularConta = '';
  descricaoEvento = '';
  buscaContaVisivel = false;
  buscaEventoVisivel = false;
  termoBuscaConta = '';
  termoBuscaEvento = '';
  private proximoId = 1;

  get contasFiltradas(): IContaCorrente[] {
    return this.filtrar(this.contas, this.termoBuscaConta);
  }

  get eventosFiltrados(): IEventoCsc[] {
    return this.filtrar(this.eventos, this.termoBuscaEvento);
  }

  abrirBuscaConta(): void {
    this.termoBuscaConta = this.form.controls.contaCorrente.value ?? '';
    this.buscaContaVisivel = true;
  }

  abrirBuscaEvento(): void {
    this.termoBuscaEvento = this.form.controls.idEvento.value ?? '';
    this.buscaEventoVisivel = true;
  }

  selecionarConta(conta: IContaCorrente): void {
    this.form.controls.contaCorrente.setValue(conta.numero);
    this.titularConta = conta.titular;
    if (!this.form.controls.pa.value)
      this.form.controls.pa.setValue(conta.cooperativa);
    this.buscaContaVisivel = false;
  }

  selecionarEvento(evento: IEventoCsc): void {
    this.form.controls.idEvento.setValue(evento.id);
    this.descricaoEvento = evento.descricao;
    this.buscaEventoVisivel = false;
  }

  incluirLancamento(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const values = this.form.getRawValue();
    const lancamento: ILancamento = {
      id: this.proximoId++,
      contaCorrente: values.contaCorrente!,
      titular: this.titularConta,
      pa: values.pa!,
      valor: values.valor!,
      historico: values.historico!,
      documento: values.documento!,
      situacao: 'Pendente',
    };
    this.lancamentos = [...this.lancamentos, lancamento];
    this.lancamentoSelecionado = lancamento;
    this.limparFormulario();
  }

  alterarLancamento(): void {
    if (!this.lancamentoSelecionado) return;
    this.form.patchValue({
      contaCorrente: this.lancamentoSelecionado.contaCorrente,
      pa: this.lancamentoSelecionado.pa,
      valor: this.lancamentoSelecionado.valor,
      historico: this.lancamentoSelecionado.historico,
      documento: this.lancamentoSelecionado.documento,
    });
    this.titularConta = this.lancamentoSelecionado.titular;
    this.lancamentos = this.lancamentos.filter(
      (item) => item.id !== this.lancamentoSelecionado?.id,
    );
    this.lancamentoSelecionado = null;
  }

  excluirLancamento(): void {
    if (!this.lancamentoSelecionado) return;
    this.lancamentos = this.lancamentos.filter(
      (item) => item.id !== this.lancamentoSelecionado?.id,
    );
    this.lancamentoSelecionado = null;
  }
  duplicarLancamento(): void {
    if (!this.lancamentoSelecionado) return;
    this.lancamentos = [
      ...this.lancamentos,
      { ...this.lancamentoSelecionado, id: this.proximoId++ },
    ];
  }

  finalizar(): void {
    if (this.form.dirty && this.form.valid) this.incluirLancamento();
    if (!this.lancamentos.length) {
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef?.close(this.lancamentos);
  }

  fecharModal(): void {
    this.dialogRef?.close();
  }

  private limparFormulario(): void {
    this.form.reset({
      contaCorrente: '',
      valor: null,
      historico: '',
      estorno: false,
      documento: '',
      descricao: '',
      situacao: 'Pendente',
      pa: '',
      idEvento: '',
      complHistorico: '',
      situacaoCsc: 'Aguardando Processamento CCO',
      idDocCsc: '',
    });
    this.titularConta = '';
    this.descricaoEvento = '';
  }

  private filtrar<T extends object>(items: T[], termo: string): T[] {
    const valor = termo.trim().toLocaleLowerCase('pt-BR');
    return valor
      ? items.filter((item) =>
          Object.values(item).some((campo) =>
            String(campo).toLocaleLowerCase('pt-BR').includes(valor),
          ),
        )
      : items;
  }
}

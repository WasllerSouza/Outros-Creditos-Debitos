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

interface ContaCorrente {
  numero: string;
  titular: string;
  cooperativa: string;
}
interface EventoCsc {
  id: string;
  codigo: string;
  descricao: string;
  dataInicio: string;
  dataFim: string;
}
export interface Lancamento {
  id: number;
  contaCorrente: string;
  titular: string;
  pa: string;
  valor: number;
  historico: string;
  documento: string;
  situacao: string;
}

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

  readonly historicos = [
    'Lançamento Manual',
    'Crédito em Conta',
    'Débito em Conta',
    'Ajuste de Lançamento',
  ];
  readonly pas = [
    { label: '0001 - Cooperativa Sede', value: '0001' },
    { label: '0002 - Agência Centro', value: '0002' },
    { label: '0003 - Agência Shopping', value: '0003' },
    { label: '0045 - Agência Agroindustrial', value: '0045' },
  ];
  readonly contas: ContaCorrente[] = [
    {
      numero: '12345-6',
      titular: 'Maria Aparecida da Silva',
      cooperativa: '0001',
    },
    { numero: '23456-7', titular: 'João Carlos de Souza', cooperativa: '0002' },
    {
      numero: '34567-8',
      titular: 'Cooperativa Vale Verde',
      cooperativa: '0003',
    },
  ];
  readonly eventos: EventoCsc[] = [
    {
      id: '102',
      codigo: '300',
      descricao: 'Centralização Título CSC Crédito',
      dataInicio: '31/12/2019',
      dataFim: '',
    },
    {
      id: '103',
      codigo: '301',
      descricao: 'Centralização Título CSC Débito',
      dataInicio: '31/12/2019',
      dataFim: '',
    },
    {
      id: '115',
      codigo: '315',
      descricao: 'Ajuste manual de CSC',
      dataInicio: '01/01/2020',
      dataFim: '',
    },
  ];
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
  lancamentos: Lancamento[] = [];
  lancamentoSelecionado: Lancamento | null = null;
  titularConta = '';
  descricaoEvento = '';
  buscaContaVisivel = false;
  buscaEventoVisivel = false;
  termoBuscaConta = '';
  termoBuscaEvento = '';
  private proximoId = 1;
  get contasFiltradas(): ContaCorrente[] {
    return this.filtrar(this.contas, this.termoBuscaConta);
  }
  get eventosFiltrados(): EventoCsc[] {
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
  selecionarConta(conta: ContaCorrente): void {
    this.form.controls.contaCorrente.setValue(conta.numero);
    this.titularConta = conta.titular;
    if (!this.form.controls.pa.value)
      this.form.controls.pa.setValue(conta.cooperativa);
    this.buscaContaVisivel = false;
  }
  selecionarEvento(evento: EventoCsc): void {
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
    const lancamento: Lancamento = {
      id: this.proximoId++,
      contaCorrente: values.contaCorrente ?? '',
      titular: this.titularConta,
      pa: values.pa ?? '',
      valor: values.valor ?? 0,
      historico: values.historico ?? '',
      documento: values.documento ?? '',
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

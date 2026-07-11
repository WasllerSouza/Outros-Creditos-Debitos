import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { AsyncPipe, CommonModule } from '@angular/common';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';

import { Store } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { PanelModule } from 'primeng/panel';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule, DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';
import { Subject, debounceTime, timer } from 'rxjs';
import { ToastModule } from 'primeng/toast';

import { ConsultaLotesActions } from '../../store/consulta-lotes.actions';
import { filtroInicial, FiltroPesquisa, Lote } from '../../store/consulta-lotes.models';
import {
  selectLinhasPorPagina,
  selectLoading,
  selectLotes,
  selectLotesSelecionados,
  selectPaginaAtual,
  selectPossuiUmSelecionado,
} from '../../store/consulta-lotes.selectors';
import { ZeroEsquerdaPipe } from '../../../../shared/pipes/zero-esquerda.pipe';
import {
  IncluirLancamentoComponent,
  Lancamento,
} from '../../../../shared/components/incluir-lancamento/incluir-lancamento.component';

@Component({
  selector: 'app-consulta-lotes',

  standalone: true,

  imports: [
    CommonModule,
    AsyncPipe,
    ReactiveFormsModule,
    ButtonModule,
    CalendarModule,
    DropdownModule,
    InputTextModule,
    PaginatorModule,
    PanelModule,
    TableModule,
    ZeroEsquerdaPipe,
    DynamicDialogModule,
    ToastModule,
    MenuModule,
  ],
  providers: [DialogService, MessageService],

  templateUrl: './consulta-lotes.component.html',

  styleUrls: ['./consulta-lotes.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultaLotesPageComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  private readonly store = inject(Store);

  private readonly destroyRef = inject(DestroyRef);

  private readonly pesquisa$ = new Subject<FiltroPesquisa>();

  readonly loading$ = this.store.select(selectLoading);

  readonly paginaAtual$ = this.store.select(selectPaginaAtual);

  readonly linhasPorPagina$ = this.store.select(selectLinhasPorPagina);

  readonly lotes$ = this.store.select(selectLotes);

  readonly lotesSelecionados$ = this.store.select(selectLotesSelecionados);

  readonly possuiUmSelecionado$ = this.store.select(selectPossuiUmSelecionado);

  readonly situacoes = ['Todas', 'Aberto', 'Enviado', 'Confirmado'];

  readonly acoesMenu: MenuItem[] = [
    { label: 'Confirmar', icon: 'pi pi-check', command: () => this.confirmar() },
    { label: 'Enviar', icon: 'pi pi-send', command: () => this.enviar() },
    { label: 'Visualizar justificativa', icon: 'pi pi-file', command: () => this.visualizarJustificativa() },
    { separator: true },
    { label: 'Alterar', icon: 'pi pi-pencil', command: () => this.alterar() },
    { label: 'Excluir', icon: 'pi pi-trash', command: () => this.excluir() },
    { label: 'Visualizar', icon: 'pi pi-eye', command: () => this.visualizar() },
  ];

  readonly form = this.fb.group({
    instituicaoResponsavel: [filtroInicial.instituicaoResponsavel],
    instituicao: [filtroInicial.instituicao],
    situacao: [filtroInicial.situacao],
    idInicial: [filtroInicial.idInicial],
    idFinal: [filtroInicial.idFinal],
    valorInicial: [filtroInicial.valorInicial],
    valorFinal: [filtroInicial.valorFinal],
    dataRange: [filtroInicial.dataRange],
  });

  private readonly dialogService = inject(DialogService);

  private readonly messageService = inject(MessageService);

  ref: DynamicDialogRef | undefined;

  constructor() {
    this.pesquisa$
      .pipe(debounceTime(300), takeUntilDestroyed(this.destroyRef))
      .subscribe((filtro) => this.executarPesquisa(filtro));
  }

  pesquisar(): void {
    this.pesquisa$.next(this.form.getRawValue());
  }

  limparFiltros(): void {
    this.form.reset(filtroInicial);
    this.store.dispatch(ConsultaLotesActions.limparFiltros());
  }

  selecionarLotes(lotes: Lote[]): void {
    this.store.dispatch(ConsultaLotesActions.selecionarLotes({ lotes }));
  }

  trocarPagina(pagina: number): void {
    this.store.dispatch(ConsultaLotesActions.trocarPagina({ pagina }));
  }

  incluir(): void {
    this.ref = this.dialogService.open(IncluirLancamentoComponent, {
      header: 'INCLUIR LANÇAMENTO',
      width: 'min(72rem, 96vw)',
      showHeader: false,
      contentStyle: { overflow: 'auto', 'max-height': '78vh' },
      baseZIndex: 10000,
    });

    this.ref.onClose.subscribe((lancamentos: Lancamento[] | undefined) => {
      if (!lancamentos?.length) return;

      const agora = new Date();
      const data = agora.toLocaleDateString('pt-BR');
      const hora = agora.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      const pa = lancamentos[0].pa;

      this.store.dispatch(
        ConsultaLotesActions.incluirLote({
          lote: {
            instituicaoResponsavel: `${pa} - Ponto de Atendimento`,
            instituicao: '0002 - SICOOB CENTRAL',
            dataEntrada: data,
            valor: lancamentos.reduce(
              (total, lancamento) => total + lancamento.valor,
              0,
            ),
            quantidadeLancamentos: lancamentos.length,
            usuarioRegistro: 'usuario-atual',
            usuarioAprovacao: '',
            situacao: 'Aberto',
            dataHoraSituacao: `${data}, ${hora}`,
          },
        }),
      );
    });
  }

  alterar(): void {
    this.informarAcaoIndisponivel('Alterar');
  }

  excluir(): void {
    this.informarAcaoIndisponivel('Excluir');
  }

  visualizar(): void {
    this.informarAcaoIndisponivel('Visualizar');
  }

  confirmar(): void {
    this.informarAcaoIndisponivel('Confirmar');
  }

  enviar(): void {
    this.informarAcaoIndisponivel('Enviar');
  }

  visualizarJustificativa(): void {
    this.informarAcaoIndisponivel('Visualizar justificativa');
  }

  private informarAcaoIndisponivel(acao: string): void {
    this.messageService.add({
      severity: 'info',
      summary: 'Ação ainda não disponível',
      detail: `${acao} será disponibilizada em uma próxima etapa.`,
    });
  }

  private executarPesquisa(filtro: FiltroPesquisa): void {
    if (filtro.instituicao.trim().toLowerCase() === 'erro') {
      const erro = 'Falha simulada ao pesquisar lotes. Tente novamente.';
      this.store.dispatch(ConsultaLotesActions.pesquisaFalhou({ erro }));
      this.messageService.add({ severity: 'error', summary: 'Pesquisa indisponível', detail: erro });
      return;
    }

    this.store.dispatch(ConsultaLotesActions.pesquisar({ filtro }));
    timer(350)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => this.store.dispatch(ConsultaLotesActions.pesquisaConcluida()));
  }
}

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

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

import { ConsultaLotesActions } from '../../store/consulta-lotes.actions';
import { Lote, filtroInicial } from '../../store/consulta-lotes.models';
import {
  selectLinhasPorPagina,
  selectLoading,
  selectLotes,
  selectLotesPaginados,
  selectLotesSelecionados,
  selectPaginaAtual,
  selectPossuiUmSelecionado,
} from '../../store/consulta-lotes.selectors';
import { ZeroEsquerdaPipe } from '../../../../shared/pipes/zero-esquerda.pipe';

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
  ],

  templateUrl: './consulta-lotes.component.html',

  styleUrls: ['./consulta-lotes.component.scss'],

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConsultaLotesPageComponent {
  private readonly fb = inject(NonNullableFormBuilder);

  private readonly store = inject(Store);

  readonly loading$ = this.store.select(selectLoading);

  readonly paginaAtual$ = this.store.select(selectPaginaAtual);

  readonly linhasPorPagina$ = this.store.select(selectLinhasPorPagina);

  readonly lotes$ = this.store.select(selectLotes);

  readonly lotesSelecionados$ = this.store.select(selectLotesSelecionados);

  readonly possuiUmSelecionado$ = this.store.select(selectPossuiUmSelecionado);

  readonly situacoes = ['Todas', 'Aberto', 'Enviado', 'Confirmado'];

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

  pesquisar(): void {
    this.store.dispatch(
      ConsultaLotesActions.pesquisar({ filtro: this.form.getRawValue() }),
    );
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
    console.log('Incluir');
  }

  alterar(): void {
    console.log('Alterar');
  }

  excluir(): void {
    console.log('Excluir');
  }

  visualizar(): void {
    console.log('Visualizar');
  }

  confirmar(): void {
    console.log('Confirmar');
  }

  enviar(): void {
    console.log('Enviar');
  }

  visualizarJustificativa(): void {
    console.log('Visualizar justificativa');
  }
}

import { createFeatureSelector, createSelector } from '@ngrx/store';

import { consultaLotesFeatureKey } from './consulta-lotes.reducer';
import { IConsultaLotesState } from '../../../shared/interfaces/consulta-lotes-state.interface';
import { ILote } from '../../../shared/interfaces/lote.interface';

export const selectConsultaLotesState =
  createFeatureSelector<IConsultaLotesState>(consultaLotesFeatureKey);

export const selectFiltro = createSelector(
  selectConsultaLotesState,
  (state) => state.filtro,
);

export const selectLotes = createSelector(
  selectConsultaLotesState,
  (state) => state.lotes,
);

export const selectLotesSelecionados = createSelector(
  selectConsultaLotesState,
  (state) => state.lotesSelecionados,
);

export const selectLoading = createSelector(
  selectConsultaLotesState,
  (state) => state.loading,
);

export const selectErroPesquisa = createSelector(
  selectConsultaLotesState,
  (state) => state.erro,
);

export const selectPaginaAtual = createSelector(
  selectConsultaLotesState,
  (state) => state.paginaAtual,
);

export const selectLinhasPorPagina = createSelector(
  selectConsultaLotesState,
  (state) => state.linhasPorPagina,
);

export const selectQuantidadeSelecionados = createSelector(
  selectLotesSelecionados,
  (lotes) => lotes.length,
);

export const selectPossuiUmSelecionado = createSelector(
  selectQuantidadeSelecionados,
  (quantidade) => quantidade >= 1,
);

export const selectLotesPaginados = createSelector(
  selectLotes,
  selectPaginaAtual,
  selectLinhasPorPagina,
  (lotes, paginaAtual, linhasPorPagina): ILote[] => {
    const inicio = paginaAtual * linhasPorPagina;

    return lotes.slice(inicio, inicio + linhasPorPagina);
  },
);

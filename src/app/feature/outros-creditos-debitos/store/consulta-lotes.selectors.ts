import { createFeatureSelector, createSelector } from '@ngrx/store';

import { ConsultaLotesState, Lote } from './consulta-lotes.models';
import { consultaLotesFeatureKey } from './consulta-lotes.reducer';

export const selectConsultaLotesState =
  createFeatureSelector<ConsultaLotesState>(consultaLotesFeatureKey);

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
  (lotes, paginaAtual, linhasPorPagina): Lote[] => {
    const inicio = paginaAtual * linhasPorPagina;

    return lotes.slice(inicio, inicio + linhasPorPagina);
  },
);

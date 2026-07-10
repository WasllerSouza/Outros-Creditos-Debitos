import { initialConsultaLotesState } from './consulta-lotes.reducer';
import {
  selectFiltro,
  selectLinhasPorPagina,
  selectLoading,
  selectLotes,
  selectLotesPaginados,
  selectLotesSelecionados,
  selectPaginaAtual,
  selectPossuiUmSelecionado,
  selectQuantidadeSelecionados,
} from './consulta-lotes.selectors';

describe('consulta lotes selectors', () => {
  const state = {
    consultaLotes: {
      ...initialConsultaLotesState,
      lotesSelecionados: [initialConsultaLotesState.todosLotes[0]],
      paginaAtual: 1,
    },
  };

  it('selects each state field', () => {
    expect(selectFiltro(state)).toBe(state.consultaLotes.filtro);
    expect(selectLotes(state)).toBe(state.consultaLotes.lotes);
    expect(selectLotesSelecionados(state)).toBe(state.consultaLotes.lotesSelecionados);
    expect(selectLoading(state)).toBe(false);
    expect(selectPaginaAtual(state)).toBe(1);
    expect(selectLinhasPorPagina(state)).toBe(5);
  });

  it('derives selection count, selection state and paged lots', () => {
    expect(selectQuantidadeSelecionados(state)).toBe(1);
    expect(selectPossuiUmSelecionado(state)).toBe(true);
    expect(selectLotesPaginados(state).map(({ id }) => id)).toEqual([6, 7, 8, 9, 10]);
  });

  it('returns false when selection count is not one', () => {
    expect(
      selectPossuiUmSelecionado({
        consultaLotes: { ...state.consultaLotes, lotesSelecionados: [] },
      }),
    ).toBe(false);
  });
});

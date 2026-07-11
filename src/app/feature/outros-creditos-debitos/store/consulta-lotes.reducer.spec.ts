import { ConsultaLotesActions } from './consulta-lotes.actions';
import { FiltroPesquisa, Lote } from './consulta-lotes.models';
import {
  consultaLotesReducer,
  initialConsultaLotesState,
} from './consulta-lotes.reducer';

describe('consultaLotesReducer', () => {
  const filtro: FiltroPesquisa = {
    instituicaoResponsavel: '0001',
    instituicao: 'central',
    situacao: 'Aberto',
    idInicial: '1',
    idFinal: '9',
    valorInicial: 500,
    valorFinal: 600,
    dataRange: [new Date(2026, 0, 1), new Date(2026, 0, 1)],
  };

  it('returns the initial state for an unknown action', () => {
    expect(consultaLotesReducer(undefined, { type: 'unknown' })).toBe(
      initialConsultaLotesState,
    );
  });

  it('filters lots and resets selection and pagination when searching', () => {
    const state = {
      ...initialConsultaLotesState,
      lotesSelecionados: [initialConsultaLotesState.todosLotes[0]],
      paginaAtual: 3,
    };
    const result = consultaLotesReducer(
      state,
      ConsultaLotesActions.pesquisar({ filtro }),
    );

    expect(result.filtro).toEqual(filtro);
    expect(result.lotes.map(({ id }) => id)).toEqual([1]);
    expect(result.lotesSelecionados).toEqual([]);
    expect(result.paginaAtual).toBe(0);
    expect(result.loading).toBe(true);
    expect(result.erro).toBeNull();
  });

  it('finishes or fails the search loading lifecycle', () => {
    const pesquisando = consultaLotesReducer(
      initialConsultaLotesState,
      ConsultaLotesActions.pesquisar({ filtro }),
    );
    const concluida = consultaLotesReducer(
      pesquisando,
      ConsultaLotesActions.pesquisaConcluida(),
    );
    const falha = consultaLotesReducer(
      pesquisando,
      ConsultaLotesActions.pesquisaFalhou({ erro: 'Falha simulada' }),
    );

    expect(concluida.loading).toBe(false);
    expect(falha).toMatchObject({ loading: false, erro: 'Falha simulada' });
  });

  it('applies every optional filter boundary', () => {
    const result = consultaLotesReducer(
      initialConsultaLotesState,
      ConsultaLotesActions.pesquisar({
        filtro: {
          ...filtro,
          instituicaoResponsavel: '',
          instituicao: '',
          situacao: 'Todas',
          idInicial: '2',
          idFinal: '2',
          valorInicial: 1000,
          valorFinal: 1000,
          dataRange: [new Date(2026, 0, 2), new Date(2026, 0, 2)],
        },
      }),
    );

    expect(result.lotes.map(({ id }) => id)).toEqual([2]);
  });

  it('clears filters, selected lots and pagination', () => {
    const state = {
      ...initialConsultaLotesState,
      filtro,
      lotes: [],
      lotesSelecionados: [initialConsultaLotesState.todosLotes[0]],
      paginaAtual: 1,
    };
    const result = consultaLotesReducer(
      state,
      ConsultaLotesActions.limparFiltros(),
    );

    expect(result.filtro).toBe(initialConsultaLotesState.filtro);
    expect(result.lotes).toEqual(initialConsultaLotesState.todosLotes);
    expect(result.lotesSelecionados).toEqual([]);
    expect(result.paginaAtual).toBe(0);
  });

  it('updates selected lots and current page', () => {
    const lotes = [initialConsultaLotesState.todosLotes[1]] as Lote[];
    const selected = consultaLotesReducer(
      initialConsultaLotesState,
      ConsultaLotesActions.selecionarLotes({ lotes }),
    );
    const paged = consultaLotesReducer(
      selected,
      ConsultaLotesActions.trocarPagina({ pagina: 2 }),
    );

    expect(selected.lotesSelecionados).toBe(lotes);
    expect(paged.paginaAtual).toBe(2);
  });

  it('adds the concluded lot to todosLotes and refreshes the visible list', () => {
    const result = consultaLotesReducer(
      initialConsultaLotesState,
      ConsultaLotesActions.incluirLote({
        lote: {
          instituicaoResponsavel: '0001 - Ponto de Atendimento',
          instituicao: '0002 - SICOOB CENTRAL',
          dataEntrada: '11/07/2026',
          valor: 123.45,
          quantidadeLancamentos: 2,
          usuarioRegistro: 'usuario-atual',
          usuarioAprovacao: '',
          situacao: 'Aberto',
          dataHoraSituacao: '11/07/2026, 10:00:00',
        },
      }),
    );

    const incluido = result.todosLotes.at(-1);
    expect(incluido).toMatchObject({
      id: 21,
      valor: 123.45,
      quantidadeLancamentos: 2,
    });
    expect(result.lotes).toContainEqual(incluido);
  });
});

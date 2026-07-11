import { createReducer, on } from '@ngrx/store';
import { parse } from 'date-fns';
import { ConsultaLotesActions } from './consulta-lotes.actions';
import { FILTRO_INICIAL } from '../../../shared/enums/filtro-inicial.enum';
import { IFiltroPesquisa } from '../../../shared/interfaces/filtro-pesquisa.interface';
import { ILote } from '../../../shared/interfaces/lote.interface';
import { LOTES_MOCK } from '../../../shared/enums/lotes-mock.enum';
import { IConsultaLotesState } from '../../../shared/interfaces/consulta-lotes-state.interface';

export const consultaLotesFeatureKey = 'consultaLotes';
const lotesMock: ILote[] = LOTES_MOCK;
export const initialConsultaLotesState: IConsultaLotesState = {
  todosLotes: lotesMock as ILote[],
  lotes: aplicarFiltros(lotesMock, FILTRO_INICIAL) as ILote[],
  lotesSelecionados: [] as ILote[],
  filtro: FILTRO_INICIAL,
  loading: false,
  erro: null,
  paginaAtual: 0,
  linhasPorPagina: 5,
};

export const consultaLotesReducer = createReducer(
  initialConsultaLotesState,
  on(ConsultaLotesActions.pesquisar, (state, { filtro }) => ({
    ...state,
    filtro,
    lotes: aplicarFiltros(state.todosLotes, filtro),
    lotesSelecionados: [],
    paginaAtual: 0,
    loading: true,
    erro: null,
  })),
  on(ConsultaLotesActions.pesquisaConcluida, (state) => ({
    ...state,
    loading: false,
  })),
  on(ConsultaLotesActions.pesquisaFalhou, (state, { erro }) => ({
    ...state,
    loading: false,
    erro,
  })),
  on(ConsultaLotesActions.limparFiltros, (state) => ({
    ...state,
    filtro: FILTRO_INICIAL,
    lotes: aplicarFiltros(state.todosLotes, FILTRO_INICIAL),
    lotesSelecionados: [],
    paginaAtual: 0,
    loading: false,
    erro: null,
  })),
  on(ConsultaLotesActions.selecionarLotes, (state, { lotes }) => ({
    ...state,
    lotesSelecionados: lotes,
  })),
  on(ConsultaLotesActions.trocarPagina, (state, { pagina }) => ({
    ...state,
    paginaAtual: pagina,
  })),
  on(
    ConsultaLotesActions.incluirLote,
    (state: IConsultaLotesState, { lote }) => {
      const proximoId =
        Math.max(0, ...state.todosLotes.map((item) => item.id)) + 1;
      const todosLotes = [...state.todosLotes, { ...lote, id: proximoId }];

      return {
        ...state,
        todosLotes,
        lotes: aplicarFiltros(todosLotes, state.filtro),
        lotesSelecionados: [],
      };
    },
  ),
);

function aplicarFiltros(lotes: ILote[], filtro: IFiltroPesquisa): ILote[] {
  return lotes.filter((lote) => {
    const idInicial = Number(filtro.idInicial);
    const idFinal = Number(filtro.idFinal);

    return (
      contem(lote.instituicaoResponsavel, filtro.instituicaoResponsavel) &&
      contem(lote.instituicao, filtro.instituicao) &&
      mesmaSituacao(lote.situacao, filtro.situacao) &&
      (!filtro.idInicial || lote.id >= idInicial) &&
      (!filtro.idFinal || lote.id <= idFinal) &&
      (filtro.valorInicial == null || lote.valor >= filtro.valorInicial) &&
      (filtro.valorFinal == null || lote.valor <= filtro.valorFinal) &&
      dataDentroDaFaixa(lote.dataEntrada, filtro.dataRange)
    );
  });
}

function contem(valor: string, filtro: string): boolean {
  return valor.toLowerCase().includes(filtro.trim().toLowerCase());
}

function mesmaSituacao(valor: string, filtro: string): boolean {
  return filtro === 'Todas' || valor === filtro;
}

function dataDentroDaFaixa(data: string, dataRange: Date[] | null): boolean {
  if (!dataRange || dataRange.length === 0) {
    return true; // Retorna verdadeiro se não houver faixa de datas
  }

  const valor = normalizarData(parse(data, 'dd/MM/yyyy', new Date()));
  const dataInicio = dataRange[0] ? normalizarData(dataRange[0]) : null;
  const dataFim = dataRange[1] ? normalizarData(dataRange[1]) : null;

  return (!dataInicio || valor >= dataInicio) && (!dataFim || valor <= dataFim);
}

function normalizarData(data: Date): number {
  return new Date(
    data.getFullYear(),
    data.getMonth(),
    data.getDate(),
  ).getTime();
}

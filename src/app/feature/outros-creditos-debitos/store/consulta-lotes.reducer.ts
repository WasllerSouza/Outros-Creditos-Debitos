import { createReducer, on } from '@ngrx/store';
import { parse } from 'date-fns';
import { ConsultaLotesActions } from './consulta-lotes.actions';
import {
  ConsultaLotesState,
  filtroInicial,
  FiltroPesquisa,
  Lote,
} from './consulta-lotes.models';

export const consultaLotesFeatureKey = 'consultaLotes';
const lotesMock: Lote[] = [
  {
    id: 1,
    instituicaoResponsavel: '0001 - SICOOB',
    instituicao: '0002 - SICOOB CENTRAL',
    dataEntrada: '01/01/2026',
    valor: 500.5,
    quantidadeLancamentos: 1,
    usuarioRegistro: 'user001',
    usuarioAprovacao: 'approver001',
    situacao: 'Aberto',
    dataHoraSituacao: '01/01/2026, 10:00:00',
  },
  {
    id: 2,
    instituicaoResponsavel: '0002 - SICOOB CENTRAL',
    instituicao: '0004 - SICOOB CRED',
    dataEntrada: '02/01/2026',
    valor: 1000,
    quantidadeLancamentos: 2,
    usuarioRegistro: 'user002',
    usuarioAprovacao: 'approver002',
    situacao: 'Enviado',
    dataHoraSituacao: '02/01/2026, 11:00:00',
  },
  {
    id: 3,
    instituicaoResponsavel: '0003 - SICOOB',
    instituicao: '0002 - SICOOB CENTRAL',
    dataEntrada: '03/01/2026',
    valor: 1500.75,
    quantidadeLancamentos: 3,
    usuarioRegistro: 'user003',
    usuarioAprovacao: 'approver003',
    situacao: 'Confirmado',
    dataHoraSituacao: '03/01/2026, 12:00:00',
  },
  {
    id: 4,
    instituicaoResponsavel: '0004 - SICOOB',
    instituicao: '0006 - SICOOB CRED',
    dataEntrada: '04/01/2026',
    valor: 2000,
    quantidadeLancamentos: 4,
    usuarioRegistro: 'user004',
    usuarioAprovacao: 'approver004',
    situacao: 'Cancelado',
    dataHoraSituacao: '04/01/2026, 13:00:00',
  },
  {
    id: 5,
    instituicaoResponsavel: '0005 - SICOOB',
    instituicao: '0007 - SICOOB CRED',
    dataEntrada: '05/01/2026',
    valor: 2500.25,
    quantidadeLancamentos: 5,
    usuarioRegistro: 'user005',
    usuarioAprovacao: 'approver005',
    situacao: 'Aberto',
    dataHoraSituacao: '05/01/2026, 14:00:00',
  },
  {
    id: 6,
    instituicaoResponsavel: '0006 - SICOOB',
    instituicao: '0008 - SICOOB CRED',
    dataEntrada: '06/01/2026',
    valor: 3000,
    quantidadeLancamentos: 6,
    usuarioRegistro: 'user006',
    usuarioAprovacao: 'approver006',
    situacao: 'Enviado',
    dataHoraSituacao: '06/01/2026, 15:00:00',
  },
  {
    id: 7,
    instituicaoResponsavel: '0007 - SICOOB',
    instituicao: '0009 - SICOOB CRED',
    dataEntrada: '07/01/2026',
    valor: 3500.5,
    quantidadeLancamentos: 7,
    usuarioRegistro: 'user007',
    usuarioAprovacao: 'approver007',
    situacao: 'Confirmado',
    dataHoraSituacao: '07/01/2026, 16:00:00',
  },
  {
    id: 8,
    instituicaoResponsavel: '0008 - SICOOB',
    instituicao: '0010 - SICOOB CRED',
    dataEntrada: '08/01/2026',
    valor: 4000,
    quantidadeLancamentos: 8,
    usuarioRegistro: 'user008',
    usuarioAprovacao: 'approver008',
    situacao: 'Cancelado',
    dataHoraSituacao: '08/01/2026, 17:00:00',
  },
  {
    id: 9,
    instituicaoResponsavel: '0009 - SICOOB',
    instituicao: '0011 - SICOOB CRED',
    dataEntrada: '09/01/2026',
    valor: 4500.75,
    quantidadeLancamentos: 9,
    usuarioRegistro: 'user009',
    usuarioAprovacao: 'approver009',
    situacao: 'Aberto',
    dataHoraSituacao: '09/01/2026, 18:00:00',
  },
  {
    id: 10,
    instituicaoResponsavel: '0010 - SICOOB',
    instituicao: '0012 - SICOOB CRED',
    dataEntrada: '10/01/2026',
    valor: 5000,
    quantidadeLancamentos: 10,
    usuarioRegistro: 'user010',
    usuarioAprovacao: 'approver010',
    situacao: 'Enviado',
    dataHoraSituacao: '10/01/2026, 19:00:00',
  },
  {
    id: 11,
    instituicaoResponsavel: '0011 - SICOOB',
    instituicao: '0013 - SICOOB CRED',
    dataEntrada: '11/01/2026',
    valor: 5500.5,
    quantidadeLancamentos: 11,
    usuarioRegistro: 'user011',
    usuarioAprovacao: 'approver011',
    situacao: 'Confirmado',
    dataHoraSituacao: '11/01/2026, 20:00:00',
  },
  {
    id: 12,
    instituicaoResponsavel: '0012 - SICOOB',
    instituicao: '0014 - SICOOB CRED',
    dataEntrada: '12/01/2026',
    valor: 6000,
    quantidadeLancamentos: 12,
    usuarioRegistro: 'user012',
    usuarioAprovacao: 'approver012',
    situacao: 'Cancelado',
    dataHoraSituacao: '12/01/2026, 21:00:00',
  },
  {
    id: 13,
    instituicaoResponsavel: '0013 - SICOOB',
    instituicao: '0015 - SICOOB CRED',
    dataEntrada: '13/01/2026',
    valor: 6500.75,
    quantidadeLancamentos: 13,
    usuarioRegistro: 'user013',
    usuarioAprovacao: 'approver013',
    situacao: 'Aberto',
    dataHoraSituacao: '13/01/2026, 22:00:00',
  },
  {
    id: 14,
    instituicaoResponsavel: '0014 - SICOOB',
    instituicao: '0016 - SICOOB CRED',
    dataEntrada: '14/01/2026',
    valor: 7000,
    quantidadeLancamentos: 14,
    usuarioRegistro: 'user014',
    usuarioAprovacao: 'approver014',
    situacao: 'Enviado',
    dataHoraSituacao: '14/01/2026, 23:00:00',
  },
  {
    id: 15,
    instituicaoResponsavel: '0015 - SICOOB',
    instituicao: '0017 - SICOOB CRED',
    dataEntrada: '15/01/2026',
    valor: 7500.5,
    quantidadeLancamentos: 15,
    usuarioRegistro: 'user015',
    usuarioAprovacao: 'approver015',
    situacao: 'Confirmado',
    dataHoraSituacao: '15/01/2026, 00:00:00',
  },
  {
    id: 16,
    instituicaoResponsavel: '0016 - SICOOB',
    instituicao: '0018 - SICOOB CRED',
    dataEntrada: '16/01/2026',
    valor: 8000,
    quantidadeLancamentos: 16,
    usuarioRegistro: 'user016',
    usuarioAprovacao: 'approver016',
    situacao: 'Cancelado',
    dataHoraSituacao: '16/01/2026, 01:00:00',
  },
  {
    id: 17,
    instituicaoResponsavel: '0017 - SICOOB',
    instituicao: '0019 - SICOOB CRED',
    dataEntrada: '17/01/2026',
    valor: 8500.75,
    quantidadeLancamentos: 17,
    usuarioRegistro: 'user017',
    usuarioAprovacao: 'approver017',
    situacao: 'Aberto',
    dataHoraSituacao: '17/01/2026, 02:00:00',
  },
  {
    id: 18,
    instituicaoResponsavel: '0018 - SICOOB',
    instituicao: '0020 - SICOOB CRED',
    dataEntrada: '18/01/2026',
    valor: 9000,
    quantidadeLancamentos: 18,
    usuarioRegistro: 'user018',
    usuarioAprovacao: 'approver018',
    situacao: 'Enviado',
    dataHoraSituacao: '18/01/2026, 03:00:00',
  },
  {
    id: 19,
    instituicaoResponsavel: '0019 - SICOOB',
    instituicao: '0021 - SICOOB CRED',
    dataEntrada: '19/01/2026',
    valor: 9500.5,
    quantidadeLancamentos: 19,
    usuarioRegistro: 'user019',
    usuarioAprovacao: 'approver019',
    situacao: 'Confirmado',
    dataHoraSituacao: '19/01/2026, 04:00:00',
  },
  {
    id: 20,
    instituicaoResponsavel: '0020 - SICOOB',
    instituicao: '0022 - SICOOB CRED',
    dataEntrada: '20/01/2026',
    valor: 10000,
    quantidadeLancamentos: 20,
    usuarioRegistro: 'user020',
    usuarioAprovacao: 'approver020',
    situacao: 'Cancelado',
    dataHoraSituacao: '20/01/2026, 05:00:00',
  },
];
export const initialConsultaLotesState: ConsultaLotesState = {
  todosLotes: lotesMock,
  lotes: aplicarFiltros(lotesMock, filtroInicial),
  lotesSelecionados: [],
  filtro: filtroInicial,
  loading: false,
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
  })),
  on(ConsultaLotesActions.limparFiltros, (state) => ({
    ...state,
    filtro: filtroInicial,
    lotes: aplicarFiltros(state.todosLotes, filtroInicial),
    lotesSelecionados: [],
    paginaAtual: 0,
  })),
  on(ConsultaLotesActions.selecionarLotes, (state, { lotes }) => ({
    ...state,
    lotesSelecionados: lotes,
  })),
  on(ConsultaLotesActions.trocarPagina, (state, { pagina }) => ({
    ...state,
    paginaAtual: pagina,
  })),
  on(ConsultaLotesActions.incluirLote, (state, { lote }) => {
    const proximoId = Math.max(0, ...state.todosLotes.map((item) => item.id)) + 1;
    const todosLotes = [...state.todosLotes, { ...lote, id: proximoId }];

    return {
      ...state,
      todosLotes,
      lotes: aplicarFiltros(todosLotes, state.filtro),
      lotesSelecionados: [],
    };
  }),
);

function aplicarFiltros(lotes: Lote[], filtro: FiltroPesquisa): Lote[] {
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

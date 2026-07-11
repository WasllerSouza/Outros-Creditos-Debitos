export interface FiltroPesquisa {
  instituicaoResponsavel: string;
  instituicao: string;
  situacao: string;
  idInicial: string;
  idFinal: string;
  valorInicial: number | null;
  valorFinal: number | null;
  dataRange: Date[];
}

export interface Lote {
  id: number;
  instituicaoResponsavel: string;
  instituicao: string;
  dataEntrada: string;
  valor: number;
  quantidadeLancamentos: number;
  usuarioRegistro: string;
  usuarioAprovacao: string;
  situacao: string;
  dataHoraSituacao: string;
}

export interface ConsultaLotesState {
  todosLotes: Lote[];
  lotes: Lote[];
  lotesSelecionados: Lote[];
  filtro: FiltroPesquisa;
  loading: boolean;
  paginaAtual: number;
  linhasPorPagina: number;
}

export const filtroInicial: FiltroPesquisa = {
  instituicaoResponsavel: '',
  // instituicaoResponsavel: '0001 - SICOOB',
  instituicao: '',
  // instituicao: '0002 - SICOOB CENTRAL',
  situacao: 'Todas',
  idInicial: '',
  idFinal: '',
  valorInicial: null,
  valorFinal: null,
  dataRange: [],
};

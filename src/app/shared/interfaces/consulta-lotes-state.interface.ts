import { ILote } from './lote.interface';
import { IFiltroPesquisa } from './filtro-pesquisa.interface';

export interface IConsultaLotesState {
  todosLotes: ILote[];
  lotes: ILote[];
  lotesSelecionados: ILote[];
  filtro: IFiltroPesquisa;
  loading: boolean;
  erro: string | null;
  paginaAtual: number;
  linhasPorPagina: number;
}

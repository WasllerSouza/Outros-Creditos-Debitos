import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ILote } from '../../../shared/interfaces/lote.interface';
import { IFiltroPesquisa } from '../../../shared/interfaces/filtro-pesquisa.interface';

export const ConsultaLotesActions = createActionGroup({
  source: 'Consulta Lotes',
  events: {
    Pesquisar: props<{ filtro: IFiltroPesquisa }>(),
    'Pesquisa Concluida': emptyProps(),
    'Pesquisa Falhou': props<{ erro: string }>(),
    'Limpar Filtros': emptyProps(),
    'Selecionar Lotes': props<{ lotes: ILote[] }>(),
    'Trocar Pagina': props<{ pagina: number }>(),
    'Incluir Lote': props<{ lote: Omit<ILote, 'id'> }>(),
  },
});

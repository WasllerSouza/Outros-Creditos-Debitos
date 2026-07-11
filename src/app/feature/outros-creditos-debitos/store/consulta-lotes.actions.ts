import { createActionGroup, emptyProps, props } from '@ngrx/store';

import { FiltroPesquisa, Lote } from './consulta-lotes.models';

export const ConsultaLotesActions = createActionGroup({
  source: 'Consulta Lotes',
  events: {
    Pesquisar: props<{ filtro: FiltroPesquisa }>(),
    'Pesquisa Concluida': emptyProps(),
    'Pesquisa Falhou': props<{ erro: string }>(),
    'Limpar Filtros': emptyProps(),
    'Selecionar Lotes': props<{ lotes: Lote[] }>(),
    'Trocar Pagina': props<{ pagina: number }>(),
    'Incluir Lote': props<{ lote: Omit<Lote, 'id'> }>(),
  },
});

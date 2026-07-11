import { IFiltroPesquisa } from '../interfaces/filtro-pesquisa.interface';

export const FILTRO_INICIAL: IFiltroPesquisa = {
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

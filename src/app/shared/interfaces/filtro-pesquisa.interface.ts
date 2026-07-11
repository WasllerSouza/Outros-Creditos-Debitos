export interface IFiltroPesquisa {
  instituicaoResponsavel: string;
  instituicao: string;
  situacao: string;
  idInicial: string;
  idFinal: string;
  valorInicial: number | null;
  valorFinal: number | null;
  dataRange: Date[];
}

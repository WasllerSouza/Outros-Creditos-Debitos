export interface ILote {
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

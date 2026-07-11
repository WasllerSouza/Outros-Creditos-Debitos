export interface ILancamento {
  id: number;
  contaCorrente: string;
  titular: string;
  pa: string;
  valor: number;
  historico: string;
  documento: string;
  situacao: string;
}

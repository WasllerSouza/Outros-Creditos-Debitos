# Outros Créditos/Débitos

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=WasllerSouza_Outros-Creditos-Debitos&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=WasllerSouza_Outros-Creditos-Debitos)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=WasllerSouza_Outros-Creditos-Debitos&metric=bugs)](https://sonarcloud.io/summary/new_code?id=WasllerSouza_Outros-Creditos-Debitos)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=WasllerSouza_Outros-Creditos-Debitos&metric=code_smells)](https://sonarcloud.io/summary/new_code?id=WasllerSouza_Outros-Creditos-Debitos)
[![Duplicated Lines (%)](https://sonarcloud.io/api/project_badges/measure?project=WasllerSouza_Outros-Creditos-Debitos&metric=duplicated_lines_density)](https://sonarcloud.io/summary/new_code?id=WasllerSouza_Outros-Creditos-Debitos)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=WasllerSouza_Outros-Creditos-Debitos&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=WasllerSouza_Outros-Creditos-Debitos)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=WasllerSouza_Outros-Creditos-Debitos&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=WasllerSouza_Outros-Creditos-Debitos)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=WasllerSouza_Outros-Creditos-Debitos&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=WasllerSouza_Outros-Creditos-Debitos)
[![SonarQube Cloud](https://sonarcloud.io/images/project_badges/sonarcloud-light.svg)](https://sonarcloud.io/summary/new_code?id=WasllerSouza_Outros-Creditos-Debitos)

Aplicação web para consulta e manutenção de lotes de outros créditos e débitos. A interface permite filtrar lotes, incluir lançamentos em memória e acompanhar os dados em uma grade responsiva.

Desenvolvida com **Angular 17** e Angular CLI 17.3.

## 🚀 Instruções de Instalação e Execução

### Pré-requisitos

- [Node.js](https://nodejs.org/) **20 LTS** (recomendado para este projeto Angular 17).
- `npm`, instalado junto com o Node.js.
- Git.

### Instalação

Clone o repositório e acesse a pasta do projeto:

```bash
git clone <url-do-repositorio>
cd Outros-Creditos-Debitos
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
ng serve
```

O projeto estará disponível em [http://localhost:4200/](http://localhost:4200/). Como alternativa, é possível executar `npm start`.

## 🛠️ Decisões Técnicas Relevantes

### Arquitetura

- Estrutura orientada a _features_, com o domínio principal em `src/app/feature/outros-creditos-debitos`.
- Uso de **standalone components**, sem módulos Angular de feature.
- Componentes reutilizáveis e pipes compartilhados ficam em `src/app/shared`.

### Estado e fluxo de dados

- **NgRx Store** centraliza os dados da consulta, filtros, seleção, paginação, carregamento e erros simulados.
- O modal de lançamento agrega os itens em memória e, ao concluir, cria um novo lote no estado.
- A pesquisa possui debounce de 300 ms, indicador de carregamento e cenário de falha simulada para o valor `erro` no campo **Instituição**.

### Interface e responsividade

- **PrimeNG** fornece os componentes de interface, diálogos, tabelas, menus e mensagens.
- **PrimeFlex** é utilizado para o grid e utilitários responsivos.
- A navegação lateral permanece no desktop, vira drawer no tablet e celular; as ações do lote são condensadas em menu nas telas menores.
- Os estilos usam variáveis de tema do PrimeNG e tokens globais de aplicação definidos em `src/styles.scss`.

### Qualidade e acessibilidade

- Testes unitários com **Jest** e `jest-preset-angular`.
- ESLint, Prettier e integração com **SonarCloud** para qualidade contínua.
- Labels associados aos campos, atributos ARIA, cabeçalhos de tabela com `scope` e foco/fechamento por teclado nos diálogos.

## ✅ Comandos Úteis

```bash
# Executa os testes unitários
npm test

# Gera relatório de cobertura
npm run test:coverage

# Executa o lint
npm run lint

# Gera o build de produção
npm run build:production
```

## 📌 Links Úteis e Observações

- Não há variáveis de ambiente obrigatórias para executar a aplicação localmente.
- O relatório de cobertura é gerado em `coverage/lcov.info` e consumido pelo SonarCloud.
- Os dados atuais são mocks locais; integrações com APIs podem ser adicionadas preservando o fluxo NgRx existente.

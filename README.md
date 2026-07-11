# Outros Créditos/Débitos

> Aplicação web para consulta, filtragem e manutenção de lotes de outros créditos e débitos.

[![CI](https://github.com/WasllerSouza/Outros-Creditos-Debitos/actions/workflows/ci.yml/badge.svg)](https://github.com/WasllerSouza/Outros-Creditos-Debitos/actions/workflows/ci.yml)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=WasllerSouza_Outros-Creditos-Debitos&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=WasllerSouza_Outros-Creditos-Debitos)
[![Bugs](https://sonarcloud.io/api/project_badges/measure?project=WasllerSouza_Outros-Creditos-Debitos&metric=bugs)](https://sonarcloud.io/summary/new_code?id=WasllerSouza_Outros-Creditos-Debitos)
[![Licença: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Angular](https://img.shields.io/badge/Angular-17-DD0031?logo=angular)](https://angular.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.4-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-20-339933?logo=node.js&logoColor=white)](https://nodejs.org/)

## 📋 Sumário

- [Sobre o Projeto](#-sobre-o-projeto)
- [Principais Funcionalidades](#-principais-funcionalidades)
- [Tecnologias Utilizadas](#️-tecnologias-utilizadas)
- [Pré-requisitos e Configuração do Ambiente](#️-pré-requisitos-e-configuração-do-ambiente)
- [Como Instalar e Executar](#-como-instalar-e-executar)
- [Como Usar](#-como-usar)
- [Como Executar os Testes](#-como-executar-os-testes)
- [Como Contribuir](#-como-contribuir)
- [Licença](#-licença)
- [Contato e Links Úteis](#-contato-e-links-úteis)

## 🚀 Sobre o Projeto

O **Outros Créditos/Débitos** é uma aplicação web para centralizar a consulta e a manutenção de lotes financeiros. A interface permite pesquisar registros, aplicar filtros, visualizar informações em uma grade responsiva e incluir lançamentos em memória.

O projeto foi estruturado com foco em organização por funcionalidades, gerenciamento previsível de estado e experiência responsiva para desktop, tablet e dispositivos móveis.

## ✨ Principais Funcionalidades

- Consulta de lotes de outros créditos e débitos.
- Filtros de pesquisa com debounce.
- Paginação e seleção de registros.
- Inclusão de lançamentos em memória.
- Simulação de carregamento e cenários de erro.
- Gerenciamento centralizado de estado com NgRx Store.
- Interface responsiva construída com PrimeNG e PrimeFlex.
- Inspeção de actions e estado com Redux DevTools.
- Análise de qualidade contínua com SonarQube Cloud.

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
| --- | --- | --- |
| [Angular](https://angular.dev/) | 17.3 | Framework da aplicação |
| [TypeScript](https://www.typescriptlang.org/) | 5.4 | Linguagem de desenvolvimento |
| [NgRx Store](https://ngrx.io/guide/store) | 17.2 | Gerenciamento de estado |
| [NgRx Store Devtools](https://ngrx.io/guide/store-devtools) | 17.2 | Integração com Redux DevTools |
| [PrimeNG](https://primeng.org/) | 17.18 | Componentes de interface |
| [PrimeFlex](https://primeflex.org/) | 3.3 | Utilitários de layout responsivo |
| [Jest](https://jestjs.io/) | 29.7 | Testes unitários |
| [ESLint](https://eslint.org/) | 9.39 | Análise estática de código |
| [SonarQube Cloud](https://www.sonarsource.com/products/sonarcloud/) | — | Qualidade e cobertura de código |
| [GitHub Actions](https://github.com/features/actions) | — | Integração e entrega contínuas |

## ⚙️ Pré-requisitos e Configuração do Ambiente

Antes de iniciar, instale:

- [Node.js](https://nodejs.org/) 20 LTS ou superior.
- `npm`, instalado junto com o Node.js.
- [Git](https://git-scm.com/).

A URL pública da aplicação está centralizada em `src/environments/environment.ts`:

```ts
export const environment = {
  appUrl: 'https://wasllersouza.github.io/Outros-Creditos-Debitos/',
};
```

## 📦 Como Instalar e Executar

Clone o repositório:

```bash
git clone https://github.com/WasllerSouza/Outros-Creditos-Debitos.git
cd Outros-Creditos-Debitos
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm start
```

A aplicação estará disponível em `http://localhost:4200/`.

Para gerar o build de produção:

```bash
npm run build:production
```

Os arquivos gerados ficarão em `dist/outros-creditos-debitos/`.

## 🎮 Como Usar

1. Acesse a aplicação no navegador.
2. Utilize os filtros da tela de consulta para localizar os lotes desejados.
3. Selecione um lote na tabela para visualizar suas informações.
4. Utilize a ação de inclusão para adicionar novos lançamentos.
5. Após confirmar a inclusão, o novo lote será refletido no estado da aplicação.

### Inspecionando o estado com Redux DevTools

1. Instale a extensão [Redux DevTools](https://github.com/reduxjs/redux-devtools#redux-devtools-extension) no Chrome, Edge ou Firefox.
2. Execute a aplicação localmente com `npm start`.
3. Abra as ferramentas de desenvolvedor do navegador com `F12`.
4. Acesse a aba **Redux**.
5. Interaja com a aplicação e acompanhe as actions e o estado `consultaLotes`.

## 🧪 Como Executar os Testes

Execute os testes unitários:

```bash
npm test
```

Gere o relatório de cobertura:

```bash
npm run test:coverage
```

Execute os testes no modo de integração contínua:

```bash
npm run test:ci
```

Execute a análise de lint:

```bash
npm run lint
```

## 🤝 Como Contribuir

1. Faça um fork do projeto.
2. Crie uma branch para sua alteração:

   ```bash
   git checkout -b feature/minha-alteracao
   ```

3. Faça suas alterações e execute os testes:

   ```bash
   npm run lint
   npm test
   ```

4. Crie um commit seguindo o padrão de commits convencionais:

   ```bash
   git commit -m "feat: adiciona nova funcionalidade"
   ```

5. Envie sua branch:

   ```bash
   git push origin feature/minha-alteracao
   ```

6. Abra um Pull Request com uma descrição clara da alteração proposta.

## 📄 Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).

## 📬 Contato e Links Úteis

- Repositório: [github.com/WasllerSouza/Outros-Creditos-Debitos](https://github.com/WasllerSouza/Outros-Creditos-Debitos)
- Aplicação publicada: [Outros Créditos/Débitos](https://wasllersouza.github.io/Outros-Creditos-Debitos/)
- SonarQube Cloud: [Dashboard do projeto](https://sonarcloud.io/summary/new_code?id=WasllerSouza_Outros-Creditos-Debitos)
- GitHub: [@WasllerSouza](https://github.com/WasllerSouza)

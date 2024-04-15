# WORST-MOVIES

Este projeto é uma aplicação web para listar filmes baseados em diferentes critérios, como os produtores com o maior e o menor intervalo entre vitórias, estúdios com o maior número de vitórias, busca por vencedores por ano e anos com múltiplos vencedores.

## Estrutura do Projeto
src
├── assets
│   └── react.svg
├── components
│   └── Dashboard
│       ├── ProducersWithWinInterval.tsx
│       ├── StudiosWithMostWins.tsx
│       ├── WinnersByYearSearch.tsx
│       └── YearsWithMultipleWinners.tsx
│   └── List
│       └── WinnersList.tsx
│   └── LayoutSider.tsx
├── interfaces
│   ├── Movie.ts
│   ├── ProducerInterval.ts
│   ├── Studio.ts
│   └── YearData.ts
├── pages
│   ├── Dashboard.tsx
│   └── MovieList.tsx
├── repositories
│   ├── ProducersWithWinIntervalRepository.ts
│   ├── StudiosWithMostWinsRepository.ts
│   ├── WinnersByYearSearchRepository.ts
│   └── YearsWithMultipleWinnersRepository.ts
├── index.css
└── main.tsx

## Pré-requisitos

Antes de começar, você precisará ter instalado em sua máquina as seguintes ferramentas:
- [Git](https://git-scm.com)
- [Node.js](https://nodejs.org/en/) (que inclui [npm](http://npmjs.com))

## Instalação

Siga estas etapas para configurar o projeto localmente.
Primeiro, clone o repositório para a sua máquina local:

```bash
git clone https://github.com/buildsource/worst-movies.git
```


Então, vá para a pasta do projeto:
```bash
cd worst-movies
```


Instale as dependências necessárias:
```bash
npm install
```

## Configuração
Antes de executar o projeto, você precisará configurar as variáveis de ambiente:
Renomeie o arquivo **.env.example** para **.env**
```bash
cp .env.example .env
```
Abra o .env e preencha as variáveis de ambiente conforme necessário para o seu ambiente de desenvolvimento.

## Executando o Projeto
Com as dependências instaladas e as variáveis de ambiente configuradas, você pode iniciar o servidor de desenvolvimento:
```bash
npm run dev
```
O aplicativo estará disponível no seu navegador em **http://localhost:3000**.

## Construindo para Produção
Para construir o aplicativo para produção, execute o seguinte comando:
```bash
npm run build
```
Isso criará a versão de produção do seu aplicativo na pasta dist.

## Linting

Este projeto utiliza [ESLint](https://eslint.org/) para garantir a consistência do código e detectar padrões de código problemáticos.

### Executando o Lint

Para executar o lint em todos os arquivos TypeScript e TSX, você pode usar o comando npm script fornecido no `package.json`:

```bash
npm run lint
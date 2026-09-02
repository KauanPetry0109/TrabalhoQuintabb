# Manual Técnico — Speak Up

## 1. Visão geral

O Speak Up é dividido em duas aplicações:

- frontend React/Vite;
- backend Node.js/Express.

O Supabase fornece:

- PostgreSQL;
- autenticação da secretaria.

## 2. Comunicação

```text
Frontend
├── Supabase Auth → login/logout
└── Express API
       ↓
   Supabase Database
```

## 3. Backend

Arquivos principais:

### `server.js`

Responsável por:

- carregar variáveis de ambiente;
- iniciar Express;
- configurar CORS;
- interpretar JSON;
- registrar endpoints;
- iniciar servidor.

### `config/database.js`

Cria o cliente Supabase utilizado pelo backend.

Utiliza:

- `SUPABASE_URL`;
- `SUPABASE_SECRET_KEY`.

### `perguntas.js`

Contém as perguntas, alternativas e respostas corretas.

O endpoint público remove a resposta correta antes de enviar as questões.

### `controllers/nivelamentoController.js`

Responsável por:

- validar candidato;
- validar respostas;
- corrigir teste;
- calcular porcentagem;
- definir nível;
- recomendar curso;
- inserir registro em `candidates`.

### `controllers/candidatosController.js`

Responsável por:

- listar candidatos;
- alterar status.

### `auth.js`

Valida o token enviado em:

```http
Authorization: Bearer TOKEN
```

Rotas administrativas só continuam quando o token pertence a um usuário autenticado no Supabase.

## 4. Frontend

### `App.jsx`

Define as rotas:

- `/`
- `/nivelamento`
- `/login`
- `/dashboard`

Também protege o dashboard.

### `Inicio.jsx`

Landing page e apresentação dos cursos.

### `Nivelamento.jsx`

Contém:

- formulário;
- teste;
- navegação entre questões;
- envio ao backend;
- resultado.

### `Login.jsx`

Autenticação da secretaria com Supabase Auth.

### `Dashboard.jsx`

Contém:

- indicadores;
- lista;
- pesquisa;
- filtros;
- atualização de status;
- logout.

### `supabase.js`

Cria o cliente público do Supabase para autenticação.

## 5. API

### `GET /api/health`

Objetivo: verificar o funcionamento da API e conexão com o banco.

Autenticação: não.

### `GET /api/questions`

Objetivo: enviar questões ao candidato.

Autenticação: não.

Não retorna a resposta correta.

### `POST /api/placement`

Objetivo: corrigir o teste e registrar o candidato.

Autenticação: não.

O frontend envia dados pessoais e respostas.  
Nota, porcentagem e nível são calculados pelo backend.

### `GET /api/candidates`

Objetivo: listar candidatos.

Autenticação: sim.

### `PATCH /api/candidates/:id/status`

Objetivo: alterar o status.

Autenticação: sim.

Status aceitos:

- `novo`
- `contatado`
- `matriculado`
- `arquivado`

## 6. Regra de nivelamento

```text
0% a 30%         → A1
>30% a 50%       → A2
>50% a 75%       → B1
>75% a 100%      → B2
```

## 7. Banco

Tabela:

```text
public.candidates
```

O backend é responsável pelas operações de dados.

O Row Level Security está habilitado na tabela.

## 8. Segurança adotada

- credencial secreta somente no backend;
- chave pública no frontend;
- correção de questões no servidor;
- rotas administrativas protegidas;
- validação dos dados no backend;
- RLS habilitado;
- CORS configurado;
- arquivos `.env` ignorados pelo Git.

## 9. Desenvolvimento local

Backend:

```bash
cd backend
npm run dev
```

Frontend:

```bash
cd frontend
npm run dev
```

## 10. Build do frontend

```bash
cd frontend
npm run build
```

O Vite gera a pasta `dist`.

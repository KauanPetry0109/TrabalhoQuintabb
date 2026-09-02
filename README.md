# Speak Up — Portal Acadêmico e Sistema de Triagem

Projeto acadêmico desenvolvido por **Kauan Petry** para a Escola de Idiomas **Speak Up**.

## 1. Problema

A Speak Up enfrenta atrasos na formação de turmas porque novos alunos muitas vezes não sabem identificar o próprio nível de inglês.

## 2. Solução

O projeto oferece um portal acadêmico com:

- apresentação dos cursos;
- formulário de triagem;
- teste de nivelamento com 15 questões;
- cálculo automático do nível;
- recomendação de curso;
- registro do candidato no Supabase;
- login da secretaria;
- painel administrativo;
- alteração de status dos candidatos;
- endpoint de verificação de estabilidade.

## 3. Tecnologias

### Frontend
- React
- Vite
- JavaScript
- React Router
- CSS

### Backend
- Node.js
- Express

### Banco e autenticação
- Supabase
- PostgreSQL
- Supabase Auth

## 4. Arquitetura

```text
Candidato / Secretaria
        ↓
Frontend React + Vite
        ↓
Backend Node.js + Express
        ↓
Supabase
├── PostgreSQL
└── Auth
```

O frontend usa o Supabase diretamente apenas para autenticação da secretaria.  
Os dados dos candidatos são manipulados pelo backend.

## 5. Fluxo do candidato

```text
Portal
↓
Formulário
↓
Teste
↓
Backend corrige respostas
↓
Nível A1 / A2 / B1 / B2
↓
Curso recomendado
↓
Registro no Supabase
↓
Resultado exibido
```

## 6. Fluxo da secretaria

```text
Login
↓
Supabase Auth
↓
Dashboard protegido
↓
Lista de candidatos
↓
Pesquisa e filtros
↓
Alteração de status
```

## 7. Níveis utilizados

| Nível | Descrição | Faixa |
|---|---|---:|
| A1 | Iniciante | 0% a 30% |
| A2 | Básico | acima de 30% a 50% |
| B1 | Intermediário | acima de 50% a 75% |
| B2 | Intermediário Avançado | acima de 75% a 100% |

## 8. Status dos candidatos

- `novo`
- `contatado`
- `matriculado`
- `arquivado`

## 9. Endpoints principais

| Método | Endpoint | Uso | Autenticação |
|---|---|---|---|
| GET | `/api/health` | Verificar API e banco | Não |
| GET | `/api/questions` | Buscar perguntas do teste | Não |
| POST | `/api/placement` | Corrigir e registrar nivelamento | Não |
| GET | `/api/candidates` | Listar candidatos | Sim |
| PATCH | `/api/candidates/:id/status` | Alterar status | Sim |

## 10. Execução local

### Backend

```bash
cd backend
npm install
npm run dev
```

Por padrão:

```text
http://localhost:3000
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Por padrão:

```text
http://localhost:5173
```

## 11. Variáveis de ambiente

### `backend/.env`

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=
SUPABASE_SECRET_KEY=
```

### `frontend/.env`

```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
```

**Nunca publique a `SUPABASE_SECRET_KEY`.**

## 12. Banco

A tabela principal é `candidates`.

Campos principais:

- `id`
- `name`
- `email`
- `phone`
- `age`
- `city`
- `studied_before`
- `score`
- `total_questions`
- `percentage`
- `level`
- `recommended_course`
- `status`
- `consent`
- `created_at`

## 13. Documentação

- [Manual do Usuário](docs/MANUAL_USUARIO.md)
- [Kit de Implantação](docs/KIT_IMPLANTACAO.md)
- [Manual Técnico](docs/MANUAL_TECNICO.md)
- [Testes de Estabilidade](docs/TESTES_ESTABILIDADE.md)
- [Treinamento da Equipe](docs/TREINAMENTO_EQUIPE.md)
- [Simulação de Domínio](docs/DOMINIO.md)
- [Roteiro de Apresentação](docs/APRESENTACAO.md)

## 14. Situação atual

O sistema foi validado localmente com:

- frontend carregando;
- backend respondendo;
- conexão com Supabase;
- teste de nivelamento;
- persistência do candidato;
- login da secretaria;
- dashboard;
- alteração de status.

A implantação pública será feita posteriormente, com frontend e backend publicados em serviços de nuvem.

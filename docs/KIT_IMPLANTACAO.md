# Kit de Implantação — Speak Up

## 1. Objetivo

Este documento permite instalar e executar o sistema Speak Up em outro computador.

## 2. Pré-requisitos

O computador deve possuir:

- Node.js;
- npm;
- Git;
- navegador moderno;
- acesso à internet.

O projeto utiliza um banco Supabase já hospedado na nuvem.

## 3. Componentes

```text
frontend/
→ React + Vite

backend/
→ Node.js + Express

Supabase
→ PostgreSQL + Auth
```

## 4. Baixar o projeto

```bash
git clone URL_DO_REPOSITORIO
cd TrabalhoQuintabb
```

Também é possível transportar o projeto em arquivo ZIP.

## 5. Configurar o backend

Entre na pasta:

```bash
cd backend
```

Crie o arquivo:

```text
.env
```

Conteúdo:

```env
PORT=3000
FRONTEND_URL=http://localhost:5173
SUPABASE_URL=URL_DO_PROJETO
SUPABASE_SECRET_KEY=CHAVE_SECRETA
```

A chave secreta não deve ser salva no GitHub.

Instale as dependências:

```bash
npm install
```

Inicie:

```bash
npm run dev
```

## 6. Testar o backend

Abra:

```text
http://localhost:3000/api/health
```

Resultado esperado:

```json
{
  "status": "ok",
  "service": "Speak Up API",
  "database": "connected"
}
```

## 7. Configurar o frontend

Abra outro terminal:

```bash
cd frontend
```

Crie:

```text
.env
```

Conteúdo:

```env
VITE_API_URL=http://localhost:3000
VITE_SUPABASE_URL=URL_DO_PROJETO
VITE_SUPABASE_PUBLISHABLE_KEY=CHAVE_PUBLICA
```

Instale:

```bash
npm install
```

Inicie:

```bash
npm run dev
```

## 8. Abrir o portal

```text
http://localhost:5173
```

## 9. Supabase

O banco não precisa ser recriado em cada computador.

A infraestrutura de dados fica na nuvem e pode ser acessada por diferentes computadores, desde que as variáveis de ambiente estejam configuradas.

## 10. Criar o banco do zero

Somente se um novo projeto Supabase for criado:

1. abra o Supabase;
2. abra **SQL Editor**;
3. execute o arquivo `database/schema.sql`;
4. confira a tabela `candidates`.

## 11. Criar usuário da secretaria

No Supabase:

1. abra **Authentication**;
2. abra **Users**;
3. adicione um usuário;
4. informe e-mail e senha;
5. confirme o usuário.

A senha não deve ser colocada no código.

## 12. Verificação pós-instalação

Checklist:

- [ ] backend inicia sem erro;
- [ ] `/api/health` responde;
- [ ] banco aparece como `connected`;
- [ ] frontend abre;
- [ ] perguntas carregam;
- [ ] nivelamento pode ser concluído;
- [ ] candidato é salvo;
- [ ] login administrativo funciona;
- [ ] dashboard carrega;
- [ ] alteração de status funciona.

## 13. Implantação em nuvem

A arquitetura planejada é:

```text
Vercel
Frontend React
     ↓
Render
Backend Express
     ↓
Supabase
Banco + Auth
```

Esta seção deverá ser atualizada com as URLs reais após a publicação.

### Variáveis de produção do frontend

```env
VITE_API_URL=URL_PUBLICA_DO_BACKEND
VITE_SUPABASE_URL=URL_DO_SUPABASE
VITE_SUPABASE_PUBLISHABLE_KEY=CHAVE_PUBLICA
```

### Variáveis de produção do backend

```env
PORT=3000
FRONTEND_URL=URL_PUBLICA_DO_FRONTEND
SUPABASE_URL=URL_DO_SUPABASE
SUPABASE_SECRET_KEY=CHAVE_SECRETA
```

## 14. Segurança

Nunca publicar:

- `backend/.env`;
- `SUPABASE_SECRET_KEY`;
- senhas administrativas.

Os arquivos `.env.example` podem ser publicados, desde que estejam sem credenciais reais.

# Testes de Estabilidade — Speak Up

## 1. Objetivo

Comprovar que os principais componentes do sistema funcionam corretamente antes da apresentação e da implantação pública.

## 2. Testes realizados em ambiente local

| Teste | Procedimento | Resultado esperado | Resultado obtido | Status |
|---|---|---|---|---|
| Inicialização do backend | Executar `npm run dev` | API inicia na porta 3000 | API iniciou corretamente | Aprovado |
| Health check | Abrir `/api/health` | Status `ok` e banco `connected` | Resposta correta | Aprovado |
| Carregamento das perguntas | Abrir `/api/questions` | 15 perguntas sem respostas corretas | Perguntas carregadas | Aprovado |
| Inicialização do frontend | Executar `npm run dev` | Portal abre na porta 5173 | Portal carregado | Aprovado |
| Formulário de triagem | Preencher dados obrigatórios | Permitir iniciar teste | Funcionou | Aprovado |
| Navegação no teste | Avançar e voltar | Respostas permanecem selecionadas | Funcionou | Aprovado |
| Correção | Finalizar 15 questões | Backend calcula resultado | Resultado calculado | Aprovado |
| Persistência | Finalizar teste | Registro salvo em `candidates` | Registro criado | Aprovado |
| Resultado | Finalizar teste | Exibir nível e curso | Resultado exibido | Aprovado |
| Login | Entrar com usuário da secretaria | Abrir dashboard | Login realizado | Aprovado |
| Proteção administrativa | Usar dashboard autenticado | API validar token | Acesso autorizado corretamente | Aprovado |
| Listagem | Abrir dashboard | Exibir candidatos | Candidatos exibidos | Aprovado |
| Alteração de status | Trocar `novo` para outro status | Banco atualizar | Atualização realizada | Aprovado |
| Pesquisa e filtros | Pesquisar/filtrar tabela | Exibir registros compatíveis | Funcionou | Aprovado |

## 3. Ocorrência observada

Durante um primeiro envio do nivelamento foi exibida a mensagem:

```text
Failed to fetch
```

A tentativa foi repetida sem atualizar a página e funcionou normalmente.  
Um novo teste completo também foi realizado com sucesso.

Isso indica uma falha pontual de comunicação, sem evidência de erro persistente na aplicação.

## 4. Critérios de estabilidade

O ambiente é considerado adequado para demonstração quando:

1. frontend e backend iniciam sem erros;
2. health check confirma conexão;
3. teste pode ser concluído;
4. dados são persistidos;
5. usuário administrativo consegue entrar;
6. dashboard consulta e altera registros;
7. uma segunda execução completa confirma repetibilidade.

## 5. Testes após publicação

Após o deploy, repetir:

- [ ] URL pública do frontend;
- [ ] URL pública do backend;
- [ ] `/api/health`;
- [ ] CORS em produção;
- [ ] formulário;
- [ ] salvamento;
- [ ] login;
- [ ] dashboard;
- [ ] alteração de status;
- [ ] acesso por celular;
- [ ] HTTPS.

## 6. Evidências recomendadas para apresentação

Guardar capturas de tela de:

1. página inicial;
2. formulário;
3. teste;
4. resultado;
5. tabela `candidates` no Supabase;
6. login;
7. dashboard;
8. alteração de status;
9. `/api/health`;
10. aplicação publicada.

# Manual do Usuário — Secretaria Speak Up

## 1. Objetivo

Este manual ensina a equipe da secretaria a utilizar o sistema Speak Up sem precisar conhecer programação.

## 2. Acesso ao sistema

Abra o endereço do portal em um navegador.

Enquanto o sistema estiver em ambiente local:

```text
http://localhost:5173
```

Depois da implantação online, este endereço deverá ser substituído pelo endereço público do portal.

## 3. Entrar na área da secretaria

1. Abra o portal.
2. Clique em **Secretaria**.
3. Informe o e-mail administrativo.
4. Informe a senha.
5. Clique em **Entrar**.

Após o login, o sistema abrirá o **Painel da Secretaria**.

## 4. Painel da Secretaria

O painel mostra informações gerais dos candidatos, como:

- total de candidatos;
- quantidade de novos;
- candidatos com níveis B1 ou B2;
- matriculados.

Abaixo desses indicadores existe a tabela de candidatos.

## 5. Dados exibidos

Para cada candidato podem ser visualizados:

- nome;
- cidade;
- e-mail;
- telefone;
- nível;
- acertos;
- porcentagem;
- curso recomendado;
- status;
- data do teste.

## 6. Pesquisar candidato

No campo de pesquisa:

1. clique no campo **Pesquisar candidato**;
2. digite parte do nome;
3. a tabela será filtrada automaticamente.

## 7. Filtrar por nível

O filtro permite selecionar:

- A1;
- A2;
- B1;
- B2.

Selecione **Todos os níveis** para remover o filtro.

## 8. Filtrar por status

É possível filtrar por:

- Novo;
- Contatado;
- Matriculado;
- Arquivado.

## 9. Alterar o status

Na coluna **Status**:

1. localize o candidato;
2. abra a lista de status;
3. selecione a nova situação.

Significado:

| Status | Uso |
|---|---|
| Novo | Candidato ainda não atendido |
| Contatado | Secretaria já realizou contato |
| Matriculado | Candidato concluiu a matrícula |
| Arquivado | Atendimento encerrado sem matrícula ou registro arquivado |

A alteração é salva no banco de dados.

## 10. Atualizar os dados

Clique em **Atualizar** para consultar novamente os candidatos armazenados no banco.

## 11. Sair do sistema

Clique em **Sair** no topo da tela.

Ao sair, a sessão administrativa é encerrada.

## 12. Como interpretar os níveis

| Nível | Interpretação |
|---|---|
| A1 | Iniciante |
| A2 | Básico |
| B1 | Intermediário |
| B2 | Intermediário Avançado |

O sistema também mostra automaticamente um curso recomendado.

## 13. Problemas comuns

### E-mail ou senha inválidos

- confira os dados digitados;
- verifique se Caps Lock está ativado;
- tente novamente;
- se necessário, solicite ao responsável técnico a redefinição da conta.

### Candidato não aparece

1. clique em **Atualizar**;
2. remova filtros de nível e status;
3. apague o texto da pesquisa;
4. confirme se o candidato concluiu o teste.

### Página não abre

- confira a conexão com a internet;
- confirme se o endereço está correto;
- se estiver usando localmente, confirme se frontend e backend estão ligados.

### Erro ao carregar candidatos

Pode existir falha temporária entre o portal, a API ou o banco de dados. Aguarde alguns segundos e clique em **Atualizar**.

### Sessão expirada

Faça login novamente.

## 14. Boas práticas

- não compartilhe a senha administrativa;
- saia do sistema em computadores compartilhados;
- confira os dados antes de realizar contato;
- mantenha os status atualizados.

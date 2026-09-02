# Roteiro de Apresentação — Speak Up

## Duração sugerida

5 a 7 minutos.

## 1. Problema

"A Speak Up enfrenta atrasos na formação de turmas porque novos alunos muitas vezes não sabem qual é seu nível de inglês."

## 2. Solução

"Para resolver isso, desenvolvi um portal que apresenta os cursos, aplica um teste de nivelamento e registra o candidato para a secretaria."

## 3. Tecnologias

"O frontend foi desenvolvido em React com Vite. O backend utiliza Node.js e Express. O Supabase fornece o banco PostgreSQL e a autenticação da secretaria."

## 4. Demonstração do candidato

1. abrir a home;
2. mostrar os cursos;
3. clicar em nivelamento;
4. preencher formulário;
5. responder algumas questões;
6. explicar que a correção acontece no backend;
7. finalizar;
8. mostrar nível e curso recomendado.

## 5. Banco

Abrir o Supabase e mostrar o candidato na tabela `candidates`.

Explicar que são registrados:

- contato;
- pontuação;
- nível;
- curso;
- status.

## 6. Secretaria

1. abrir login;
2. entrar;
3. mostrar dashboard;
4. pesquisar candidato;
5. filtrar;
6. alterar status.

## 7. Segurança

"As respostas corretas não são enviadas para o navegador. A correção ocorre no backend. A área administrativa é protegida pelo Supabase Auth e as credenciais secretas ficam apenas no backend."

## 8. Estabilidade

Mostrar:

```text
/api/health
```

Explicar que o endpoint verifica a API e a conexão com o banco.

## 9. Infraestrutura

```text
Vercel → frontend
Render → backend
Supabase → banco e autenticação
```

## 10. Domínio

Explicar a simulação:

```text
www.speakupidiomas.com.br
```

e os conceitos de DNS, CNAME e HTTPS.

## 11. Documentação

Mostrar rapidamente:

- Manual do Usuário;
- Kit de Implantação;
- Manual Técnico;
- Testes de Estabilidade;
- Treinamento da Equipe.

## 12. Conclusão

"O sistema reduz a triagem manual, identifica automaticamente o nível do candidato e entrega à secretaria os dados necessários para organizar o atendimento e a formação de turmas."

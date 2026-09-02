# Simulação de Domínio — Speak Up

## 1. Objetivo

Atender à exigência acadêmica de simulação do registro e configuração de domínio.

## 2. Domínio proposto

```text
speakupidiomas.com.br
```

Endereço principal planejado:

```text
https://www.speakupidiomas.com.br
```

**Este domínio é utilizado como simulação acadêmica. Este documento não afirma que ele foi registrado.**

## 3. Registro

Para um domínio `.com.br`, o registro normalmente seria realizado pelo serviço Registro.br.

Processo simulado:

1. pesquisar disponibilidade;
2. criar ou utilizar conta;
3. solicitar registro;
4. realizar pagamento;
5. configurar DNS.

## 4. DNS

DNS é o sistema que associa um nome de domínio a um serviço hospedado na internet.

No projeto, o domínio apontaria para o frontend publicado.

## 5. CNAME

Um registro CNAME pode ser utilizado para associar:

```text
www.speakupidiomas.com.br
```

ao endereço indicado pela plataforma de hospedagem.

Exemplo conceitual:

```text
www → endereço fornecido pela Vercel
```

O valor real deverá ser obtido no painel da hospedagem.

## 6. Registro A

Um registro A associa um nome de domínio diretamente a um endereço IPv4.

Em plataformas como Vercel, a configuração exata deve seguir os valores apresentados pelo provedor no momento da associação do domínio.

## 7. HTTPS

Após a configuração correta do domínio e DNS, a hospedagem pode emitir certificado TLS para disponibilizar:

```text
https://
```

Isso protege a comunicação entre navegador e aplicação.

## 8. Propagação

Alterações DNS podem levar algum tempo para serem reconhecidas em toda a internet.

## 9. Arquitetura planejada

```text
www.speakupidiomas.com.br
          ↓
        Vercel
        React
          ↓
        Render
        Express
          ↓
       Supabase
```

## 10. Após o deploy

Este documento deverá ser atualizado com:

- URL real do frontend;
- URL real do backend;
- valores DNS indicados pela Vercel;
- evidência da configuração simulada ou real.

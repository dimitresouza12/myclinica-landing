# MyClínica — Landing Page

Landing page do [MyClínica](https://myclinica.online), sistema de gestão para clínicas e consultórios.

**URL de produção:** https://site.myclinica.online

## Stack

- [Next.js 16](https://nextjs.org/) (App Router, output standalone)
- TypeScript
- CSS Modules
- Deploy via Docker no EasyPanel

## Seções

| Seção | Descrição |
|---|---|
| Hero | Headline principal + CTAs |
| Features | Funcionalidades do produto |
| Specialties | Prontuário por especialidade (7 áreas) |
| Preview | Demo interativa da UI do SaaS |
| Plans | Planos e preços |
| Contact | CTA final via WhatsApp |

## Desenvolvimento local

```bash
npm install
npm run dev       # http://localhost:3000
```

## Build de produção

```bash
npm run build
npm start
```

## Deploy

O deploy é feito via EasyPanel com Docker. Após push na branch `main`, redeploy manual no painel.

O `next.config.ts` usa `output: 'standalone'` para gerar a imagem Docker otimizada.

## Variáveis de ambiente

Nenhuma variável de ambiente necessária para a landing page.

---

Repositório privado — [MyClínica](https://myclinica.online)

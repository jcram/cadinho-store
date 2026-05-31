# Cadinho — Board de Tarefas

> **Projeto:** E-commerce do Cadinho Cultural
> **Stack:** Monorepo (npm workspaces) · `apps/web` Next.js (App Router, TS, Tailwind) · `apps/api` NestJS + Prisma + SQLite · `packages/shared` (tipos) · Backoffice próprio em `/admin`
> **Fase atual:** Fase 1 — Vitrine + Conteúdo (MVP: validar marca e conteúdo, sem checkout)
> **Conceito:** "Música é Presença" — estética vintage, paleta sépia/preto sobre creme, tipografia de máquina de escrever.

---

## Como usar este arquivo

- Marque `[x]` ao concluir cada tarefa.
- Faça uma etapa por vez e revise antes de avançar.
- As Fases 2 (checkout de discos) e 3 (ingressos) ficam no fim como referência — **não** começar antes da Fase 1 estar publicada.
- **Conteúdo:** abandonamos o Sanity. O cadastro de discos é feito por um backend próprio (NestJS + Prisma + SQLite) com backoffice em `/admin`. A Etapa 2 abaixo reflete essa decisão.
- ⚠️ **Deploy:** SQLite (arquivo local) não roda em serverless da Vercel. A `apps/api` precisa de host com disco persistente (Railway / Render / Fly) ou trocar para Turso/Postgres. Decisão pendente.

---

## 0. Setup do projeto

- [x] Criar projeto: `npx create-next-app@latest cadinho --typescript --app --tailwind --eslint`
- [~] Inicializar Git e subir para o GitHub _(Git já iniciado; falta criar o repo remoto e dar push)_
- [ ] Conectar o repositório à Vercel (deploy automático a cada push)
- [~] Criar `.env.local` e configurar as env vars equivalentes no painel da Vercel _(arquivo criado; vars do Sanity vêm na Etapa 2)_
- [x] Definir estrutura de pastas: `apps/web/{app,components,lib}` · `apps/api/src` · `packages/shared`
- [x] Adicionar imagem do mockup e os PDFs em `/referencias` no repo (para consulta visual)

## 1. Identidade visual (a alma do Cadinho)

- [x] Configurar paleta (Tailwind v4: tokens via `@theme` no `globals.css`, não `tailwind.config`):
  - Fundo creme/bege (~`#EDEAE3`)
  - Preto fosco (~`#1A1A1A`)
  - Marrom sépia para títulos/acentos (~`#3D2E26`) + accent laranja (~`#C4622D`)
- [x] Adicionar fontes (via `next/font`):
  - **Títulos:** Special Elite (máquina de escrever)
  - **Corpo:** Courier Prime (monoespaçada)
- [x] Criar componentes base: `Button`, `Card`, `Container`, `SectionHeader`
- [x] Criar o motivo gráfico de **onda sonora** (waveform) usado nos cabeçalhos de seção
- [x] Montar `Header` (logo + menu: Loja, Discos, Rádio, Cadinho Songs, Open Deck, Agenda, Sobre, Contato)
- [x] Montar `Footer` ("Música é Presença" + newsletter + ícones de redes + links de rodapé)

## 2. Backend de conteúdo (NestJS + Prisma + SQLite)

- [x] Monorepo npm workspaces: `apps/web`, `apps/api`, `packages/shared`
- [x] API NestJS + Prisma + SQLite com schema **Disco** (título, artista, gênero, ano, preço, capa, descrição, estoque, status, destaque, slug único)
- [x] CRUD de Disco: `GET /discos` (filtros destaque/genero/status), `GET /discos/:id`, `GET /discos/slug/:slug`, `POST`, `PATCH`, `DELETE`
- [x] Upload de capa local (multer) + serving estático em `/uploads`
- [x] Auth admin (login via env + JWT) e guard nas rotas de escrita
- [x] `packages/shared`: tipos `Disco` / inputs reaproveitados por web e api
- [x] Backoffice em `/admin` (login, listagem, criar/editar/remover, upload de capa)
- [x] Home pública lendo a API ("Garimpo da Semana" = `destaque=true`)
- [x] Seed com os 5 discos do mockup:
  - João Donato — Quem É Quem (MPB, 1973, R$ 129)
  - Floating Points / Pharoah Sanders (Jazz, 2021, R$ 189)
  - RÛFÛS DU SOL — Surrender (Eletrônica, 2021, R$ 179)
  - Azymuth (Jazz, 1975, R$ 149)
  - J Dilla — Donuts (Hip Hop, 2006, R$ 159)
- [x] CRUD de **Evento** (nome, tipo, descrição, foto, link p/ botão "Saiba Mais", destaque, slug): `GET /eventos` (filtros destaque/tipo), `GET /eventos/:id`, `GET /eventos/slug/:slug`, `POST`, `PATCH`, `DELETE` (escrita com JWT)
- [x] Backoffice `/admin/eventos` (listagem, criar/editar/remover, upload de foto)
- [x] "Próximos Encontros" na home lendo a API (`destaque=true`); botão "Saiba Mais" usa o link (abre em nova aba)
- [x] Seed de encontros (Open Deck, Listening Session, Live Set, Workshop)
- [ ] **Cadinho Songs**: modelar quando sairmos dos placeholders

## 3. Páginas da Fase 1

- [ ] **Home** (`/`): hero rotativo · "Garimpo da Semana" (5 discos em destaque) · "Próximos Encontros" · bloco da Rádio · "Cadinho Songs" · seção Open Deck · footer
- [ ] **Catálogo** (`/discos`): grid com filtros por gênero/ano + busca
- [ ] **Disco** (`/discos/[slug]`): capa grande, infos, botão "Avise-me" / "Reservar" (sem checkout ainda)
- [ ] **Agenda** (`/agenda`): lista de eventos com data e descrição
- [ ] **Cadinho Songs** (`/songs`): grid de conteúdo com filtros (Todos / Sets / Podcasts / Entrevistas / Playlists)
- [ ] **Sobre** (`/sobre`) e **Contato** (`/contato`)

## 4. Rádio e player

- [ ] Definir a fonte de streaming (ex: Radio.co, Zeno.fm ou Icecast próprio)
- [ ] Componente de player com indicador "AO VIVO" e "Agora no ar"
- [ ] Decidir se o player fica fixo no rodapé enquanto navega (recomendado p/ reforçar "presença")

## 5. Captura de audiência (o que valida o MVP)

- [ ] Integrar a newsletter "Receba novidades" a um serviço (Brevo, Mailchimp ou Resend)
- [ ] Configurar analytics (Vercel Analytics ou Plausible)
- [ ] Tracking nos botões-chave: Explorar Discos, Ouvir Rádio, Inscrição na newsletter, Enviar Set (Open Deck)

## 6. Qualidade e lançamento

- [ ] SEO: metadados, Open Graph, `sitemap.xml`, favicon com o logo
- [ ] Responsividade mobile (o mockup é desktop — mobile exige atenção)
- [ ] Acessibilidade básica: contraste, `alt` nas imagens, navegação por teclado
- [ ] Otimização de imagens com `next/image` (capas pesam)
- [ ] Domínio próprio apontado na Vercel + HTTPS
- [ ] Revisão final e deploy de produção

---

## Backlog — Fases futuras (não iniciar agora)

### Fase 2 — Checkout de discos
- [ ] Carrinho de compras
- [ ] Pagamento (Mercado Pago ou Stripe)
- [ ] Controle de estoque
- [ ] Cálculo de frete
- [ ] E-mails transacionais (confirmação, envio)

### Fase 3 — Ingressos de eventos
- [ ] Evento como produto (lote, data, limite de vagas)
- [ ] Geração de ingresso com QR code
- [ ] Validação/check-in no evento

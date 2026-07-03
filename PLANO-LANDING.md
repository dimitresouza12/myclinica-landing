# Plano de Implementação — Landing MyClinica

Melhorias inspiradas na análise do guiaodonto.com, adaptadas à identidade teal da MyClinica.
Ordenado por impacto de conversão vs. esforço.

---

## 1. Cards flutuantes no Hero ⭐ (maior impacto)
**O que:** 4 cards com dados reais do sistema flutuando ao redor do título, mostrando o produto funcionando (não explicando em texto).

**Cards sugeridos:**
- `14 consultas · 12 confirmadas via WhatsApp` (automação da agenda)
- `R$ 42.800 · +18% este mês` (faturamento crescendo — mini gráfico de barras)
- `73% aprovados · 14 de 19 orçamentos` (conversão — barra de progresso)
- `47 pacientes inativos · Reativar via WhatsApp` (CRM)

**Como:** posicionamento absoluto ao redor do `.container` do Hero, animação `float` sutil (translateY em loop, 4-6s, delays diferentes por card). Em mobile: empilham abaixo do CTA ou somem.

**Esforço:** médio · **Impacto:** alto

---

## 2. Headline rotativa (texto que troca)
**O que:** a segunda linha do título troca entre frases, em teal, com transição suave.

**Frases sugeridas (loop):**
- `com prontuário eletrônico`
- `com agenda automática`
- `com CRM no WhatsApp`
- `com inteligência` (atual)

**Como:** componente client-side com estado + `setInterval`, fade/slide entre frases. Respeitar `prefers-reduced-motion` (para em frase fixa).

**Esforço:** baixo · **Impacto:** médio-alto

---

## 3. Seção "Jornada" — evolução em 5 passos
**O que:** linha de progresso horizontal com 5 ícones coloridos conectados, cada um um card abaixo.

**Passos sugeridos:**
1. 🔴 Agenda no papel → 2. 🔵 Agenda automatizada → 3. 🟣 Prontuário digital → 4. 🟡 Financeiro no controle → 5. 🟢 Clínica escalando

**Como:** linha SVG/gradiente conectando círculos, cada card com borda superior na cor do passo. Reveal em stagger ao rolar (RevealSection já existe). Vende transformação, não features.

**Esforço:** médio · **Impacto:** alto (storytelling)

---

## 4. Depoimentos com accordion hover
**O que:** cards de depoimento fechados (foto + nome + cargo + estrelas); ao passar o mouse, expande e mostra o texto completo.

**Regras de qualidade (aprendizado do concorrente):**
- Cargos específicos ("Implantodontista", "Adm. Clínica X"), não "Dentista"
- Priorizar depoimentos com **número concreto** ("reduzi 40% de faltas", "economizei 3h/dia")
- Melhor depoimento já vem expandido por padrão

**Como:** grid de cards, primeiro expandido, hover expande os demais (`max-height` transition). Mobile: todos abertos (sem hover).

**Esforço:** médio · **Impacto:** alto (prova social)
**⚠️ Depende de depoimentos reais — ver seção "Pendências de conteúdo".**

---

## 5. Faixa "Clientes por todo o Brasil" (marquee de logos)
**O que:** faixa com logos circulares dos clientes, com auto-scroll infinito.

**Como:** marquee CSS (translateX em loop), logos em avatares circulares com borda. Duplicar a lista para loop contínuo.

**Esforço:** baixo · **Impacto:** médio-alto (prova social)
**⚠️ Depende de logos reais + permissão — ver "Pendências de conteúdo".**

---

## 6. Animações de entrada em todas as seções
**O que:** garantir que todas as seções usem `RevealSection` (fade-up ao entrar na viewport). Concorrente não tem isso — é vantagem fácil.

**Esforço:** baixo · **Impacto:** médio (percepção de qualidade)

---

## Pendências de conteúdo (você precisa fornecer)

⚠️ **Importante:** para os itens 4 e 5, eu **não posso inventar nomes de clínicas reais** nem usar logos de terceiros como se fossem clientes — isso seria propaganda enganosa e uso indevido de marca.

Preciso que você forneça, **dos seus clientes reais que autorizaram**:
- Logos (PNG/SVG) das clínicas
- Nome da clínica + cargo/nome da pessoa
- Texto do depoimento (idealmente com resultado numérico)
- Cidade/estado (para a faixa "por todo o Brasil")

Enquanto não tiver, construo a **estrutura visual com placeholders** claramente marcados, prontos pra você trocar.

---

---

## 7. Vídeo demo (pendente)
**O que:** vídeo vertical (9:16) do sistema em uso, fornecido pelo usuário.

**Status:** aguardando o arquivo do vídeo. Formato 9:16 funciona bem em mockup de celular — não precisa ocupar a largura toda. Posição na página (Hero vs. seção dedicada) a decidir quando o vídeo for anexado.

**Esforço:** baixo (uma vez com o arquivo) · **Impacto:** alto

---

## Ordem de execução recomendada
1. ✅ Cards flutuantes (item 1) — FEITO
2. ✅ Headline rotativa (item 2) — FEITO
3. ✅ Jornada 5 passos (item 3) — FEITO
4. ✅ Revisão de animações (item 6) — FEITO (Faq + botões CTA teal)
5. ⏳ Faixa de logos + depoimentos (itens 5, 4) — quando tiver conteúdo real
6. ⏳ Vídeo demo (item 7) — quando o arquivo for fornecido

### Bônus feito nesta sessão
- Todos os botões CTA (Hero, Navbar, Sticky, Contato) migrados de preto → gradiente teal com glow/pulse/shimmer

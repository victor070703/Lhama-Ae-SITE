# Lhama Ae — Landing page para investidores

Landing page institucional e de captação desenvolvida manualmente com HTML5, CSS3 e JavaScript ES6. O projeto não utiliza frameworks ou bibliotecas externas.

## Como executar

Você pode abrir `index.html` diretamente no navegador. Para testar URLs, manifesto e service behavior de forma mais próxima da produção, use um servidor local:

```bash
python3 -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Arquivos principais

- `index.html`: conteúdo, semântica, SEO e dados estruturados.
- `style.css`: design system, componentes e seções.
- `responsive.css`: adaptações para notebook, tablet e celular.
- `animations.css`: animações e suporte a movimento reduzido.
- `app.js`: menu, ripple, demonstração e componentes interativos.
- `scroll.js`: scroll reveal, parallax e navegação ativa.
- `charts.js`: contadores, gráficos e timeline animada.
- `manifest.json`, `robots.txt`, `sitemap.xml` e `favicon.svg`: publicação e descoberta.

## Publicação

1. Substitua `https://lhamaae.com.br` pelo domínio definitivo, se necessário.
2. Confirme os e-mails e dados dos fundadores.
3. Valide ou atualize as métricas marcadas como ilustrativas.
4. Publique todos os arquivos preservando a estrutura.
5. Ative Brotli/Gzip e cache longo para CSS, JavaScript e SVG no servidor/CDN.

## Deploy no Cloudflare Workers

O projeto está configurado para atualizar o Worker existente `uselhama` usando Static Assets:

```bash
npx wrangler deploy
```

O arquivo `.assetsignore` impede que configurações, documentação e arquivos temporários sejam publicados como conteúdo do site.

## Performance e acessibilidade

- Não há fontes, imagens ou bibliotecas externas bloqueando a renderização.
- Mockups e gráficos são construídos com HTML, CSS e SVG.
- As animações são iniciadas por `IntersectionObserver` e respeitam `prefers-reduced-motion`.
- O conteúdo possui landmarks, navegação por teclado, foco visível e descrições de gráficos.
- As metas recomendadas são LCP abaixo de 2,5 s, CLS abaixo de 0,1 e Lighthouse acima de 95 em produção.

## Observação jurídica

Os números de mercado, projeções, preços e alocação são ilustrativos e devem ser validados antes da publicação pública ou de uma due diligence.

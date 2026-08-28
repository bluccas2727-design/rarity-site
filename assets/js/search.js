// RARITY — busca (depende de assets/js/products.js carregado antes deste arquivo)

function rarityFormatPrice(n) {
  return "R$ " + n.toFixed(2).replace(".", ",");
}

function rarityProductCatLabel(p) {
  return p.subcategory ? p.category + " · " + p.subcategory : p.category;
}

// Card completo, no mesmo formato usado na grade de produtos.
function rarityRenderCard(p) {
  const tag = p.isNew ? '<span class="product-tag">Novo</span>' : "";
  const priceHtml = p.oldPrice
    ? '<span class="price-old">' + rarityFormatPrice(p.oldPrice) + "</span>" + rarityFormatPrice(p.price)
    : rarityFormatPrice(p.price);
  return (
    '<a href="' + p.url + '" class="product-card">' +
      '<div class="product-thumb">' + tag + 'Foto do Produto<div class="product-quick">Adicionar ao Carrinho</div></div>' +
      '<div class="product-info"><div class="product-cat">' + rarityProductCatLabel(p) + '</div>' +
      '<div class="product-name">' + p.name + '</div>' +
      '<div class="product-price">' + priceHtml + '</div></div>' +
    '</a>'
  );
}

// Linha compacta usada no dropdown de resultados da busca rápida.
function rarityRenderResultRow(p) {
  return (
    '<a href="' + p.url + '" class="search-result">' +
      '<div class="sr-info">' +
        '<span class="sr-name">' + p.name + '</span>' +
        '<span class="sr-meta">' + rarityProductCatLabel(p) + '</span>' +
      '</div>' +
      '<span class="sr-price">' + rarityFormatPrice(p.price) + '</span>' +
    '</a>'
  );
}

document.addEventListener('DOMContentLoaded', () => {
  const searchWrap = document.querySelector('.header-search');
  const input = document.getElementById('searchInput');
  const form = document.getElementById('searchForm');
  const resultsBox = document.getElementById('searchResults');

  if (searchWrap && input && form && resultsBox) {
    function renderMatches() {
      const term = input.value.trim();
      if (!term) {
        resultsBox.innerHTML = "";
        return;
      }
      const matches = raritySearch(term).slice(0, 6);
      resultsBox.innerHTML = matches.length
        ? matches.map(rarityRenderResultRow).join("")
        : '<div class="search-empty">Nenhum produto, categoria ou subcategoria encontrado para "' + term + '".</div>';
    }

    input.addEventListener('input', renderMatches);
    input.addEventListener('focus', renderMatches);

    document.addEventListener('click', (e) => {
      if (!searchWrap.contains(e.target)) resultsBox.innerHTML = "";
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        resultsBox.innerHTML = "";
        input.blur();
      }
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const term = input.value.trim();
      if (!term) return;
      window.location.href = 'produtos.html?q=' + encodeURIComponent(term);
    });
  }

  // Página de listagem: renderiza resultados quando existe ?q=, ?cat= ou ?sub= na URL.
  const grid = document.querySelector('.shop-main .product-grid');
  if (grid) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
    const cat = params.get('cat');
    const sub = params.get('sub');
    if (q) {
      if (input) input.value = q;
      const matches = raritySearch(q);
      const toolbar = document.querySelector('.shop-toolbar span');
      if (toolbar) {
        toolbar.textContent = matches.length + (matches.length === 1 ? ' resultado' : ' resultados') + ' para "' + q + '"';
      }
      const summary = document.createElement('div');
      summary.className = 'search-summary';
      summary.innerHTML =
        '<span>Resultados da busca por <strong>"' + q + '"</strong></span>' +
        '<a href="produtos.html">Limpar busca e ver todos os produtos</a>';
      grid.parentElement.insertBefore(summary, grid);

      grid.innerHTML = matches.length
        ? matches.map(rarityRenderCard).join("")
        : '<div class="products-empty"><strong>Nenhum produto encontrado</strong>Tente buscar por outro nome, categoria ou subcategoria.</div>';

      const pagination = document.querySelector('.pagination');
      if (pagination) pagination.style.display = 'none';
    } else if (cat || sub) {
      const catLabel = rarityCategoryLabel(cat);
      const subLabel = raritySubcategoryLabel(cat, sub);
      const matches = rarityFilter(cat, sub);
      const heading = subLabel || catLabel || 'Produtos';

      const banner = document.querySelector('.page-banner h1');
      if (banner) banner.textContent = heading;

      const crumb = document.querySelector('.breadcrumb');
      if (crumb && (catLabel || subLabel)) {
        let html = '<a href="index.html">Início</a> / <a href="produtos.html">Produtos</a> / ';
        if (subLabel) {
          html += '<a href="produtos.html?cat=' + encodeURIComponent(cat) + '">' + catLabel + '</a> / <span>' + subLabel + '</span>';
        } else {
          html += '<span>' + catLabel + '</span>';
        }
        crumb.innerHTML = html;
      }

      const toolbar = document.querySelector('.shop-toolbar span');
      if (toolbar) {
        toolbar.textContent = matches.length === 1
          ? '1 produto'
          : matches.length + ' produtos';
      }

      const summary = document.createElement('div');
      summary.className = 'search-summary';
      summary.innerHTML =
        '<span>' + (subLabel ? 'Subcategoria' : 'Categoria') + ': <strong>' + heading + '</strong></span>' +
        '<a href="produtos.html">Ver todos os produtos</a>';
      grid.parentElement.insertBefore(summary, grid);

      const emptyMsg = subLabel
        ? 'Ainda não há produtos cadastrados nesta subcategoria.'
        : 'Ainda não há produtos cadastrados nesta categoria.';
      grid.innerHTML = matches.length
        ? matches.map(rarityRenderCard).join("")
        : '<div class="products-empty"><strong>Nenhum produto por aqui ainda</strong>' + emptyMsg + '</div>';

      const pagination = document.querySelector('.pagination');
      if (pagination) pagination.style.display = 'none';
    }
  }
});

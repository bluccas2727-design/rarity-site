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
  const overlay = document.getElementById('searchOverlay');
  const openBtn = document.querySelector('.icon-search');
  const closeBtn = document.querySelector('.search-close');
  const input = document.getElementById('searchInput');
  const form = document.getElementById('searchForm');
  const resultsBox = document.getElementById('searchResults');

  function openSearch() {
    overlay.classList.add('open');
    setTimeout(() => input.focus(), 50);
  }
  function closeSearch() {
    overlay.classList.remove('open');
  }

  if (openBtn && overlay) {
    openBtn.addEventListener('click', openSearch);
    closeBtn.addEventListener('click', closeSearch);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeSearch();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeSearch();
    });

    input.addEventListener('input', () => {
      const term = input.value.trim();
      if (!term) {
        resultsBox.innerHTML = "";
        return;
      }
      const matches = raritySearch(term).slice(0, 6);
      resultsBox.innerHTML = matches.length
        ? matches.map(rarityRenderResultRow).join("")
        : '<div class="search-empty">Nenhum produto, categoria ou subcategoria encontrado para "' + term + '".</div>';
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const term = input.value.trim();
      if (!term) return;
      window.location.href = 'produtos.html?q=' + encodeURIComponent(term);
    });
  }

  // Página de listagem: renderiza resultados quando existe ?q= na URL.
  const grid = document.querySelector('.shop-main .product-grid');
  if (grid) {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('q');
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
    }
  }
});

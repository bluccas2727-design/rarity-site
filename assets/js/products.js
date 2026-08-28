// RARITY — catálogo de produtos (fonte única usada pela busca e pela listagem)
// Ajuste/adicione produtos aqui — nome, categoria e subcategoria alimentam a busca automaticamente.

// Estrutura de categorias e subcategorias do site.
// O menu (dropdown/submenu) e os filtros da página de produtos seguem estes mesmos identificadores.
// Para criar uma nova subcategoria: adicione uma entrada em "subcategories" (slug: rótulo)
// e reproduza o mesmo padrão no <ul class="submenu"> do menu e nos filtros da sidebar.
const RARITY_CATEGORIES = {
  vestidos:   { label: "Vestidos" },
  blusas:     { label: "Blusas", subcategories: {
                  "basica": "Blusa Básica",
                  "cigana": "Blusa Cigana",
                  "manga-3-4": "Blusa Manga 3/4",
                  "manga-longa": "Blusa Manga Longa",
                } },
  calcas:     { label: "Calças" },
  saias:      { label: "Saias", subcategories: {
                  "longa": "Saia Longa",
                  "assimetrica": "Saia Assimétrica",
                } },
  conjuntos:  { label: "Conjuntos", subcategories: {
                  "conjunto-longo": "Conjunto Longo",
                  "conjunto-assimetrico": "Conjunto Assimétrico",
                } },
  acessorios: { label: "Acessórios" },
};

// Para cadastrar um produto numa das novas subcategorias de Conjuntos, adicione um item assim:
//   { id: 12, name: "Conjunto ...", category: "Conjuntos", categorySlug: "conjuntos",
//     subcategory: "Conjunto Longo", subcategorySlug: "conjunto-longo", price: 000.00, url: "produto.html" },
//   { id: 13, name: "Conjunto ...", category: "Conjuntos", categorySlug: "conjuntos",
//     subcategory: "Conjunto Assimétrico", subcategorySlug: "conjunto-assimetrico", price: 000.00, url: "produto.html" },
const RARITY_PRODUCTS = [
  { id: 1, name: "Vestido Midi Floral", category: "Vestidos", categorySlug: "vestidos", price: 249.90, isNew: true, url: "produto.html" },
  { id: 2, name: "Vestido Longo Alças", category: "Vestidos", categorySlug: "vestidos", price: 289.90, isNew: true, url: "produto.html" },
  { id: 3, name: "Blusa Cropped Canelada", category: "Blusas", categorySlug: "blusas", subcategory: "Blusa Básica", subcategorySlug: "basica", price: 99.90, oldPrice: 129.90, url: "produto.html" },
  { id: 4, name: "Blusa Cigana Estampada", category: "Blusas", categorySlug: "blusas", subcategory: "Blusa Cigana", subcategorySlug: "cigana", price: 119.90, isNew: true, url: "produto.html" },
  { id: 5, name: "Blusa Manga 3/4 Listrada", category: "Blusas", categorySlug: "blusas", subcategory: "Blusa Manga 3/4", subcategorySlug: "manga-3-4", price: 109.90, url: "produto.html" },
  { id: 6, name: "Blusa Manga Longa Gola Alta", category: "Blusas", categorySlug: "blusas", subcategory: "Blusa Manga Longa", subcategorySlug: "manga-longa", price: 89.90, url: "produto.html" },
  { id: 7, name: "Calça Wide Leg Alfaiataria", category: "Calças", categorySlug: "calcas", price: 219.90, url: "produto.html" },
  { id: 8, name: "Saia Longa Plissada", category: "Saias", categorySlug: "saias", subcategory: "Saia Longa", subcategorySlug: "longa", price: 179.90, url: "produto.html" },
  { id: 9, name: "Saia Assimétrica Fenda", category: "Saias", categorySlug: "saias", subcategory: "Saia Assimétrica", subcategorySlug: "assimetrica", price: 199.90, isNew: true, url: "produto.html" },
  { id: 10, name: "Conjunto Linho Bicolor", category: "Conjuntos", categorySlug: "conjuntos", price: 279.90, isNew: true, url: "produto.html" },
  { id: 11, name: "Bolsa Tiracolo Couro Sintético", category: "Acessórios", categorySlug: "acessorios", price: 159.90, url: "produto.html" },
];

function rarityNormalize(str) {
  return (str || "")
    .toString()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .trim();
}

// Filtra o catálogo por categoria e/ou subcategoria (usa os mesmos slugs de RARITY_CATEGORIES).
// Passar só categorySlug -> todos os produtos da categoria. Passar também subcategorySlug -> só a subcategoria.
function rarityFilter(categorySlug, subcategorySlug) {
  return RARITY_PRODUCTS.filter(p => {
    if (categorySlug && p.categorySlug !== categorySlug) return false;
    if (subcategorySlug && p.subcategorySlug !== subcategorySlug) return false;
    return true;
  });
}

// Rótulos legíveis a partir dos slugs da URL (?cat= / ?sub=).
function rarityCategoryLabel(categorySlug) {
  const c = RARITY_CATEGORIES[categorySlug];
  return c ? c.label : "";
}
function raritySubcategoryLabel(categorySlug, subcategorySlug) {
  const c = RARITY_CATEGORIES[categorySlug];
  return c && c.subcategories ? (c.subcategories[subcategorySlug] || "") : "";
}

// Busca por nome do produto, categoria ou subcategoria.
// Termo = nome específico -> só aquele produto. Termo = categoria -> tudo da categoria.
// Termo = subcategoria -> tudo daquela subcategoria (cada campo é comparado separadamente).
function raritySearch(query) {
  const q = rarityNormalize(query);
  if (!q) return [];
  return RARITY_PRODUCTS.filter(p =>
    rarityNormalize(p.name).includes(q) ||
    rarityNormalize(p.category).includes(q) ||
    rarityNormalize(p.subcategory).includes(q)
  );
}

// RARITY — catálogo de produtos (fonte única usada pela busca e pela listagem)
// Ajuste/adicione produtos aqui — nome, categoria e subcategoria alimentam a busca automaticamente.

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

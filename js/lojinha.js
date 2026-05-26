let produtos = [
  {
    id: 1,
    linkImg: "../assets/15pmx.jpg",
    sub: "Processador A17 Pro",
    nomeP: "iPhone 15 Pro Max",
    preco: 8999
  },
  {
    id: 2,
    linkImg: "../assets/mac4pro.png",
    sub: "Chip M3 Max",
    nomeP: "MacBook Pro 14",
    preco: 15499
  },
  {
    id: 3,
    linkImg: "../assets/ipadm2projpg.jpg",
    sub: "Chip M2, Tela Liquid Retina",
    nomeP: "iPad Pro 11",
    preco: 6299
  },
  {
    id: 4,
    linkImg: "../assets/apple-watch-series-9.png",
    sub: "Série 9, Caixa de Alumínio",
    nomeP: "Apple Watch Series 9",
    preco: 3199
  }
];
const produtosSalvos =
  JSON.parse(localStorage.getItem("produtos")) || [];
produtos = [...produtos, ...produtosSalvos];

let produtosCarregados = false;
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

const sectionProdutos = document.querySelector(".grade-produtos");
const itensCarrinho = document.querySelector(".itens-carrinho");
const totalCarrinho = document.querySelector(".carrinho-total");

function formatarPreco(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function salvarCarrinho() {
  localStorage.setItem("carrinho", JSON.stringify(carrinho));
}

function criarProduto(produto) {
  const articleProduto = document.createElement("article");
  articleProduto.classList.add("cartao-produto");

  const divImagem = document.createElement("div");
  divImagem.classList.add("produto-imagem");

  const img = document.createElement("img");
  img.src = produto.linkImg;
  img.alt = produto.nomeP;

  divImagem.append(img);

  const divInfo = document.createElement("div");
  divInfo.classList.add("produto-info");

  const nomeSecundario = document.createElement("h5");
  nomeSecundario.textContent = produto.sub;

  const nomePrincipal = document.createElement("h4");
  nomePrincipal.textContent = produto.nomeP;

  const preco = document.createElement("p");
  preco.textContent = formatarPreco(produto.preco);
  preco.classList.add("preco");

  divInfo.append(nomeSecundario, nomePrincipal, preco);

  const btnComprar = document.createElement("button");
  btnComprar.classList.add("btn-comprar");
  btnComprar.textContent = "Comprar";

  btnComprar.addEventListener("click", () => {
    adicionarAoCarrinho(produto.id);
  });

  articleProduto.append(divImagem, divInfo, btnComprar);
  sectionProdutos.append(articleProduto);
}

function carregarProdutos() {
  if (produtosCarregados) return;

  produtos.forEach(criarProduto);
  produtosCarregados = true;
}

function adicionarAoCarrinho(idProduto) {
  const produto = produtos.find((produto) => produto.id === idProduto);

  if (!produto) return;

  const itemExistente = carrinho.find((item) => item.id === idProduto);

  if (itemExistente) {
    itemExistente.quantidade++;
  } else {
    carrinho.push({
      id: produto.id,
      nome: produto.nomeP,
      preco: produto.preco,
      quantidade: 1
    });
  }

  salvarCarrinho();
  renderizarCarrinho();
  abrirCarrinho();
}

function removerDoCarrinho(idProduto) {
  carrinho = carrinho.filter((item) => item.id !== idProduto);

  salvarCarrinho();
  renderizarCarrinho();
}

function alterarQuantidade(idProduto, quantidade) {
  const item = carrinho.find((item) => item.id === idProduto);

  if (!item) return;

  item.quantidade += quantidade;

  if (item.quantidade <= 0) {
    removerDoCarrinho(idProduto);
    return;
  }

  salvarCarrinho();
  renderizarCarrinho();
}

function calcularTotal() {
  return carrinho.reduce((total, item) => {
    return total + item.preco * item.quantidade;
  }, 0);
}

function renderizarCarrinho() {
  itensCarrinho.innerHTML = "";

  carrinho.forEach((item) => {
    const itemCarrinho = document.createElement("div");
    itemCarrinho.classList.add("item-no-carrinho");

    const itemDetalhes = document.createElement("div");
    itemDetalhes.classList.add("item-detalhes");

    const itemNome = document.createElement("p");
    itemNome.classList.add("item-nome");
    itemNome.textContent = item.nome;

    const itemPreco = document.createElement("p");
    itemPreco.classList.add("item-preco");
    itemPreco.textContent = `${formatarPreco(item.preco)} x ${item.quantidade}`;

    const controlesQuantidade = document.createElement("div");
    controlesQuantidade.classList.add("controles-quantidade");

    const btnMenos = document.createElement("button");
    btnMenos.textContent = "-";
    btnMenos.classList.add("btn-quantidade");
    btnMenos.addEventListener("click", () => alterarQuantidade(item.id, -1));

    const quantidade = document.createElement("span");
    quantidade.textContent = item.quantidade;

    const btnMais = document.createElement("button");
    btnMais.textContent = "+";
    btnMais.classList.add("btn-quantidade");
    btnMais.addEventListener("click", () => alterarQuantidade(item.id, 1));

    controlesQuantidade.append(btnMenos, quantidade, btnMais);

    const btnRemover = document.createElement("button");
    btnRemover.classList.add("btn-remover-item");
    btnRemover.setAttribute("aria-label", "Remover item");

    btnRemover.addEventListener("click", () => {
      removerDoCarrinho(item.id);
    });

    const iconeLixeira = document.createElement("i");
    iconeLixeira.classList.add("bx", "bx-trash");

    btnRemover.append(iconeLixeira);
    itemDetalhes.append(itemNome, itemPreco, controlesQuantidade);
    itemCarrinho.append(itemDetalhes, btnRemover);
    itensCarrinho.append(itemCarrinho);
  });

  atualizarTotal();
}

function atualizarTotal() {
  let valorTotal = totalCarrinho.querySelector("#valor-total-carrinho");

  if (!valorTotal) {
    valorTotal = document.createElement("span");
    valorTotal.id = "valor-total-carrinho";
    totalCarrinho.append(valorTotal);
  }

  valorTotal.textContent = formatarPreco(calcularTotal());
}

function finalizarCompra() {
  if (carrinho.length === 0) {
    alert("Seu carrinho está vazio.");
    return;
  }

  alert("Compra finalizada com sucesso!");

  carrinho = [];
  salvarCarrinho();
  renderizarCarrinho();
}

function abrirCarrinho() {
  document.querySelector("#carrinho-lateral").classList.add("carrinho-aberto");
  document.querySelector("#overlay-carrinho").classList.add("aberto");
}

function fecharCarrinho() {
  document.querySelector("#carrinho-lateral").classList.remove("carrinho-aberto");
  document.querySelector("#overlay-carrinho").classList.remove("aberto");
}

carregarProdutos();
document.querySelector("#btn-carrinho-nav").addEventListener("click", abrirCarrinho);
document.querySelector("#btn-fechar-carrinho").addEventListener("click", fecharCarrinho);

renderizarCarrinho();

document
  .querySelector("#btn-finalizar-compra")
  .addEventListener("click", finalizarCompra);
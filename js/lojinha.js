const produtos = [
  {
    linkImg: "../assets/15pmx.jpg",
    sub: "Processador A17 Pro",
    nomeP: "iPhone 15 Pro Max",
    preco: 8999
  },
  {
    linkImg: "../assets/mac4pro.png",
    sub: "Chip M3 Max",
    nomeP: "MacBook Pro 14",
    preco: 15499
  },
  {
    linkImg: "../assets/ipadm2projpg.jpg",
    sub: "Chip M2, Tela Liquid Retina",
    nomeP: "iPad Pro 11",
    preco: 6299
  },
  {
    linkImg: "../assets/apple-watch-series-9.png",
    sub: "Série 9, Caixa de Alumínio",
    nomeP: "Apple Watch Series 9",
    preco: 3199
  }
];

let cont = 0;
let id = 0;
let idCarrinho = 0;
let valorTotal = 0;

const sectionProdutos = document.querySelector(".grade-produtos");
const itensCarrinho = document.querySelector(".itens-carrinho");
const totalCarrinho = document.querySelector(".carrinho-total");

function criarProduto(imagem, subNome, nome, preco) {
  const articleProduto = document.createElement("article");
  articleProduto.classList.add("cartao-produto");

  let idAtual = id;
  articleProduto.dataset.id = idAtual;
  id++;

  const divImagem = document.createElement("div");
  divImagem.classList.add("produto-imagem");
  const imag = document.createElement("img");
  imag.src = imagem;
  imag.alt = nome;
  divImagem.append(imag);

  const divInfo = document.createElement("div");
  divInfo.classList.add("produto-info");

  const nomeSecundario = document.createElement("h5");
  nomeSecundario.innerHTML = subNome;

  const nomePrincipal = document.createElement("h4");
  nomePrincipal.innerHTML = nome;

  const prec = document.createElement("p");
  prec.innerHTML = `R$ ${preco},00`;
  prec.classList.add("preco");

  divInfo.append(nomeSecundario, nomePrincipal, prec);

  const btnComprar = document.createElement("button");
  btnComprar.classList.add("btn-comprar");
  btnComprar.textContent = "Comprar";
  btnComprar.addEventListener("click", () => {
    comprar(idAtual);
  });

  articleProduto.append(divImagem, divInfo, btnComprar);
  sectionProdutos.append(articleProduto);
}

function comprar(idElemento) {
  const elementoAtual = document.querySelector(`[data-id="${idElemento}"]`);

  if (!elementoAtual) return;

  const nome = elementoAtual.querySelector("h4").innerText;
  let preco = elementoAtual.querySelector("p").innerText;

  preco = preco.slice(2).slice(0, -3);
  const valor = Number(preco);
  valorTotal += valor;

  const itemCarrinho = document.createElement("div");
  itemCarrinho.classList.add("item-no-carrinho");

  const idAtualCarrinho = idCarrinho;
  itemCarrinho.dataset.id = idAtualCarrinho;
  idCarrinho++;

  const itemDetalhes = document.createElement("div");
  itemDetalhes.classList.add("item-detalhes");

  const itemNome = document.createElement("p");
  itemNome.classList.add("item-nome");
  itemNome.append(nome);

  const itemPreco = document.createElement("p");
  itemPreco.classList.add("item-preco");
  itemPreco.append(`R$ ${preco},00`);

  const btnRemover = document.createElement("button");
  btnRemover.classList.add("btn-remover-item");
  btnRemover.setAttribute("aria-label", "Remover item");
  btnRemover.addEventListener("click", () => {
    removerItem(idAtualCarrinho, valor);
  });

  const iconeLixeira = document.createElement("i");
  iconeLixeira.classList.add("bx", "bx-trash");

  itemDetalhes.append(itemNome, itemPreco);
  btnRemover.append(iconeLixeira);
  itemCarrinho.append(itemDetalhes, btnRemover);
  itensCarrinho.append(itemCarrinho);

  atualizarTotal();
  abrirCarrinho();
}

function atualizarTotal() {
  const valTot = totalCarrinho.querySelector("#valor-total-carrinho");

  if (valTot) {
    valTot.remove();
  }

  const valorT = document.createElement("span");
  valorT.id = "valor-total-carrinho";
  valorT.append(`R$ ${valorTotal},00`);
  totalCarrinho.append(valorT);
}

function removerItem(idElemento, preco) {
  const elementoAtual = itensCarrinho.querySelector(`[data-id="${idElemento}"]`);

  if (elementoAtual) {
    elementoAtual.remove();
    valorTotal -= preco;
    atualizarTotal();
  }
}

function abrirCarrinho() {
  const carrinhoLateral = document.querySelector("#carrinho-lateral");
  carrinhoLateral.classList.add("carrinho-aberto");
  document.querySelector("#overlay-carrinho").classList.add("aberto");
}

function fecharCarrinho() {
  const carrinhoLateral = document.querySelector("#carrinho-lateral");
  carrinhoLateral.classList.remove("carrinho-aberto");
  document.querySelector("#overlay-carrinho").classList.remove("aberto");
}

document.querySelector(".btn-adicionar-nav").addEventListener("click", () => {
  if (cont === 0) {
    produtos.forEach((produto) => {
      criarProduto(produto.linkImg, produto.sub, produto.nomeP, produto.preco);
    });
    cont = 1;
  }
});

document.querySelector("#btn-carrinho-nav").addEventListener("click", abrirCarrinho);
document.querySelector("#btn-fechar-carrinho").addEventListener("click", fecharCarrinho);

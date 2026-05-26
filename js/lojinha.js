const produtos = [{
  linkImg: "../assets/15pmx.jpg",
  sub: "Processador A17 Pro",
    nomeP: "iPhone 15 Pro Max",
    preco: 8999},
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
let cont = 0
let id = 0
const sectionProdutos = document.querySelector(".grade-produtos");

document.querySelector(".btn-adicionar-nav").addEventListener("click", () => {
  if (cont === 0) {
    produtos.forEach((produto) => {
      criarProduto(produto.linkImg, produto.sub, produto.nomeP, produto.preco);
    });
    cont = 1;
  }
});


    function criarProduto(imagem, subNome, nome, preco) {
      const articleProduto = document.createElement("article");
      articleProduto.classList.add("cartao-produto");
      let idAtual = id
      articleProduto.dataset.id = idAtual;
      id++;
      const divImagem = document.createElement("div");
      divImagem.classList.add("produto-imagem");
      let imag = document.createElement("img")
      imag.src = imagem
      imag.alt = nome
      divImagem.append(imag)


      const divInfo = document.createElement("div");
      divInfo.classList.add("produto-info");
      let nomeSecundario = document.createElement("h5")
      nomeSecundario.innerHTML = subNome
      let nomePrincipal = document.createElement("h4")
      nomePrincipal.innerHTML = nome
      let prec = document.createElement("p")
      prec.innerHTML = `R$ ${preco},00`
      prec.classList.add("preco")
      divInfo.append(nomeSecundario, nomePrincipal, prec)

      const btnComprar = document.createElement("button");
      btnComprar.classList.add("btn-comprar");
      btnComprar.textContent = "Comprar";
      btnComprar.addEventListener("click", ()=>{
    comprar(idAtual)
})

      articleProduto.append(divImagem, divInfo, btnComprar);
      sectionProdutos.append(articleProduto);
    }
function comprar(idElemento){
    let elementoAtual = document.querySelector(`[data-id="${idElemento}"]`)
    if(elementoAtual){
        let nome = elementoAtual.querySelector("h4").innerText
        let preco = elementoAtual.querySelector("p").innerText
        preco = preco.slice(2)
        preco = preco.slice(0, -2)


        console.log(preco, nome)
    }
}
document.querySelector("#btn-carrinho-nav").addEventListener("click", ()=>{
  abrirCarrinho()
})
document.querySelector("#btn-fechar-carrinho").addEventListener("click", ()=>{
  fecharCarrinho()
})
function abrirCarrinho(){
  let carrinhoLateral = document.querySelector("#carrinho-lateral");
  carrinhoLateral.classList.add("carrinho-aberto");
  document.querySelector("#overlay-carrinho").classList.add("aberto");
}
function fecharCarrinho(){
  let carrinhoLateral = document.querySelector("#carrinho-lateral");
  carrinhoLateral.classList.remove("carrinho-aberto");
  document.querySelector("#overlay-carrinho").classList.remove("aberto");
}

const produtos = [{
  linkImg: "../assets/apple-watch-series-9.png",
  sub: "Série 9, Caixa de Alumínio",
  nomeP: "Apple Watch Series 9",
  preco: 3199
}];

const sectionProdutos = document.querySelector(".grade-produtos");

document.querySelector(".btn-adicionar-nav").addEventListener("click", () => {
  produtos.forEach((produto) => {
    const imgEach = produto.linkImg;
    const subEach = produto.sub;
    const nomeEach = produto.nomeP;
    const precoEach = produto.preco;

    criarProduto(imgEach, subEach, nomeEach, precoEach);
  });
});

    function criarProduto(imagem, subNome, nome, preco) {
      const articleProduto = document.createElement("article");
      articleProduto.classList.add("cartao-produto");

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

      articleProduto.append(divImagem, divInfo, btnComprar);
      sectionProdutos.append(articleProduto);
    }

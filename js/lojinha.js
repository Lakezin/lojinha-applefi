
const produtosPromo = [
    {
        name: "Placa de Vídeo RTX 3 Triple Fan",
        image: "../assets/Gu_a_de_compra_de_GPU_c_mo_elegir_la_tarjeta_gr_fica_ideal.avif",
        preco: "R$ 3.499,00"
    },
    {
        name: "Gabinete Gamer Open Case RGB",
        image: "../assets/images.jpg",
        preco: "R$ 890,00"
    },
    {
        name: "Placa de Vídeo Gigabyte GeForce RTX 3060",
        image: "../assets/imafdages.jpg",
        preco: "R$ 1.850,00"
    },
    {
        name: "Processador Intel Core i7 10ª Geração",
        image: "../assets/images-proc.jpg",
        preco: "R$ 1.200,00"
    },
    {
        name: "Processador Intel Core i9 Unlocked",
        image: "../assets/imagess.jpg",
        preco: "R$ 2.600,00"
    },
    {name: "Gabinete RedDragon", image:   "../assets/gabinete_gamer_mini_tower_mini_itx_matx_aco_e_vidro_preto_290x190x375mm_clanm_megalon_7967_1_3834405ee84353f1da11c602876f5911.webp", preco: "R$ 450,00"}
];

const produtos = [
    {
        name: "Placa de Vídeo RTX 3 Triple Fan",
        image: "../assets/Gu_a_de_compra_de_GPU_c_mo_elegir_la_tarjeta_gr_fica_ideal.avif",
        preco: "R$ 3.499,00"
    },
    {
        name: "Gabinete Gamer Open Case RGB",
        image: "../assets/images.jpg",
        preco: "R$ 890,00"
    },
    {
        name: "Placa de Vídeo Gigabyte GeForce RTX 3060",
        image: "../assets/imafdages.jpg",
        preco: "R$ 1.850,00"
    },
    {
        name: "Processador Intel Core i7 10ª Geração",
        image: "../assets/images-proc.jpg",
        preco: "R$ 1.200,00"
    },
    {
        name: "Processador Intel Core i9 Unlocked",
        image: "../assets/imagess.jpg",
        preco: "R$ 2.600,00"
    },
    {name: "Gabinete RedDragon", image:   "../assets/gabinete_gamer_mini_tower_mini_itx_matx_aco_e_vidro_preto_290x190x375mm_clanm_megalon_7967_1_3834405ee84353f1da11c602876f5911.webp", preco: "R$ 450,00"}
];
const productsPromo = document.querySelector(".products--promotion");

produtosPromo.forEach(produtosPromo =>{
    const div_prod = document.createElement("div");
    div_prod.classList.add("product--square");

    div_prod.innerHTML = `<img src = ${produtosPromo.image}>
    <h4>${produtosPromo.name}</h4>
    <h5>${produtosPromo.preco}</h5>
    <button>Comprar</button>
    `
   
    productsPromo.appendChild(div_prod);
})

const products = document.querySelector(".products");

produtos.forEach(produtos =>{
    const div_prod = document.createElement("div");
    div_prod.classList.add("product--square");

    div_prod.innerHTML = `<img src = ${produtos.image}>
    <h4>${produtos.name}</h4>
    <h5>${produtos.preco}</h5>
    <button>Comprar</button>
    `
   
    products.appendChild(div_prod);
})


const imageAdd = document.querySelector("#fotoProduct");
const addProduct = document.querySelector("#addProduct");
const btnClose = document.querySelector("#close");

btnClose.onclick = () =>{
    document.querySelector(".quadrado").style.display = "none";
}
addProduct.onclick = () => {
    const productsPromo = document.querySelector(".products--promotion");
    const nameProduct = document.querySelector("#nameProduct").value;
    const valAdd = document.querySelector("#valProduct").value;

    if (imageAdd.files && imageAdd.files[0]) {
        const leitor = new FileReader();

        leitor.onload = function(e) {
            const fotoUrl = e.target.result;

            const div_prod = document.createElement("div");
            div_prod.classList.add("product--square");

            div_prod.innerHTML = `
                <img src="${fotoUrl}">
                <h4>${nameProduct}</h4>
                <h5>R$ ${valAdd}</h5>
                <button>Comprar</button>
            `;
            productsPromo.appendChild(div_prod);

            document.querySelector(".quadrado").style.display = "none";
        };


        leitor.readAsDataURL(imageAdd.files[0]); 
        
    } else {
        alert("Por favor, selecione uma imagem antes de adicionar!");
    }
};
const linkAdd = document.querySelector(".add");
const modal = document.querySelector(".quadrado");

linkAdd.onclick = (e) => {
    e.preventDefault(); 
    modal.style.display = "flex"; 
};
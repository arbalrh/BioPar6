const plantas = [
    {
        nome: "Amora",
        nomeCientifico: "amorae do vale",
        imgSrc: "./imagens/plantaExemplo.jpg"
    },
    {
        nome: "Grama do Deserto",
        nomeCientifico: "gramae do vale",
        imgSrc: "./imagens/plantaExemplo.jpg"
    },
    {
        nome: "Amora",
        nomeCientifico: "amorae do vale",
        imgSrc: "./imagens/plantaExemplo.jpg"
    },
    {
        nome: "Amora",
        nomeCientifico: "amorae do vale",
        imgSrc: "./imagens/plantaExemplo.jpg"
    },
    {
        nome: "Amora",
        nomeCientifico: "amorae do vale",
        imgSrc: "./imagens/plantaExemplo.jpg"
    },
    {
        nome: "Amora",
        nomeCientifico: "amorae do vale",
        imgSrc: "./imagens/plantaExemplo.jpg"
    },
    {
        nome: "Grama do Deserto",
        nomeCientifico: "gramae do vale",
        imgSrc: "./imagens/plantaExemplo.jpg"
    },
    {
        nome: "Amora",
        nomeCientifico: "amorae do vale",
        imgSrc: "./imagens/plantaExemplo.jpg"
    },
    {
        nome: "Amora",
        nomeCientifico: "amorae do vale",
        imgSrc: "./imagens/plantaExemplo.jpg"
    },
    {
        nome: "Amora",
        nomeCientifico: "amorae do vale",
        imgSrc: "./imagens/plantaExemplo.jpg"
    },
];

const secaoPlantas = document.querySelector(".plantas");

for(let i = 0; i < plantas.length; i++){
    const divPlanta = document.createElement('a');
    const nomePlanta = document.createElement('span');
    const nomeCientifico = document.createElement('p');
    const imgPlanta = document.createElement('img');

    nomePlanta.textContent = plantas[i].nome.toUpperCase();
    nomeCientifico.textContent = 'Nome científico: ' + plantas[i].nomeCientifico;
    imgPlanta.src = plantas[i].imgSrc;
    divPlanta.href = "#";

    divPlanta.appendChild(nomePlanta);
    divPlanta.appendChild(nomeCientifico);
    divPlanta.appendChild(imgPlanta);

    secaoPlantas.appendChild(divPlanta);
};


let paginaAtual = 1;

const secaoPlantas = document.querySelector(".plantas");
const form = document.querySelector("form");
const grupo = document.getElementsByName("grupo");
const frutos = document.getElementsByName("frutos");
const porte = document.getElementsByName("porte");
const luzSolar = document.getElementsByName("luzSolar");
const habito = document.getElementsByName("habito");

const botaoOpcoesFiltro = document.getElementById("botaoOpcoesFiltro");
const botaoFecharFiltro = document.getElementById("botaoFecharFiltro");
const secaoFiltro = document.querySelector(".filtro");

const botaoPaginaAnterior = document.getElementById('botaoPaginaAnterior');
const botaoProximaPagina = document.getElementById('botaoProximaPagina');

function exibirPlantas(plantas){
    secaoPlantas.textContent = "";
        for(let i = 0; i < plantas.length; i++){
            const divPlanta = document.createElement('a');
            const nomePlanta = document.createElement('span');
            const nomeCientifico = document.createElement('p');
            const imgPlanta = document.createElement('img');
                        
            nomePlanta.textContent = plantas[i].nomesPopulares[0].toUpperCase();
            nomeCientifico.textContent = 'Nome científico: ' + plantas[i].nomeCientifico;
            imgPlanta.src = '/imagens/plantaExemplo.jpg';
            divPlanta.href = "/plantas/" + plantas[i]._id;
                        
            divPlanta.appendChild(nomePlanta);
            divPlanta.appendChild(nomeCientifico);
            divPlanta.appendChild(imgPlanta);
                        
            secaoPlantas.appendChild(divPlanta);
        };
}

fetch('/api/plantas/1')
    .then(plantas => plantas.json())
    .then(plantas => exibirPlantas(plantas));

botaoOpcoesFiltro.addEventListener("click", function(event){
    secaoFiltro.style.display = "block";
    event.target.style.display = "none";
})

botaoFecharFiltro.addEventListener("click", function(){
    secaoFiltro.style.display = "none";
    botaoOpcoesFiltro.style.display = "block";
})

form.addEventListener("submit", function(event){
    event.preventDefault();

    let json = {
        grupo: [],
        frutos: [],
        porte: [],
        luzSolar: [],
        habito: [],
        pagina: 1
    };

    for(let i = 0; i < grupo.length; i++){
        if(grupo[i].checked) json.grupo.push(grupo[i].defaultValue); 
    }

    for(let i = 0; i < frutos.length; i++){
        if(frutos[i].checked) json.frutos.push(frutos[i].defaultValue); 
    }

    for(let i = 0; i < porte.length; i++){
        if(porte[i].checked) json.porte.push(porte[i].defaultValue); 
    }

    for(let i = 0; i < luzSolar.length; i++){
        if(luzSolar[i].checked) json.luzSolar.push(luzSolar[i].defaultValue); 
    }

    for(let i = 0; i < habito.length; i++){
        if(habito[i].checked) json.habito.push(habito[i].defaultValue); 
    }

    fetch('/api/plantas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(json)
    })
        .then(resposta => resposta.json())
        .then(plantas => {
            exibirPlantas(plantas)

            botaoProximaPagina.removeEventListener("click", passarPagina);
            botaoPaginaAnterior.removeEventListener("click", voltarPagina);

            botaoProximaPagina.addEventListener("click", function(){
                json.pagina += 1;
                fetch('/api/plantas', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(json)
                })
                    .then(resposta => resposta.json())
                    .then(plantas => {
                        if(plantas.length === 0) return;
                        else {
                            paginaAtual++;
                            exibirPlantas(plantas)
                        };
                    })
            });

            botaoPaginaAnterior.addEventListener("click", function(){
                if(json.pagina - 1 <= 0) return 
                else {
                    json.pagina -= 1;
                    fetch('/api/plantas', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(json)
                    })
                        .then(resposta => resposta.json())
                        .then(plantas => {
                            if(plantas.length === 0) return;
                            else {
                                paginaAtual --;
                                exibirPlantas(plantas)
                            };
                        })
                }  
            })
        })
})

function passarPagina(){
    const urlApi = '/api/plantas/' + (paginaAtual + 1);
    fetch(urlApi)
    .then(resposta => resposta.json())
    .then(plantas => {
        if(plantas.length === 0){
            return;
            } else {
                paginaAtual++;
                exibirPlantas(plantas);
            }
        })
}

function voltarPagina(){
    if(paginaAtual - 1 <= 0) return
    else {
        const urlApi = '/api/plantas/' + (paginaAtual - 1);
        fetch(urlApi)
        .then(resposta => resposta.json())
        .then(plantas => {
            paginaAtual--;
            exibirPlantas(plantas);
        })
    }
}

botaoProximaPagina.addEventListener("click", passarPagina);

botaoPaginaAnterior.addEventListener("click", voltarPagina);
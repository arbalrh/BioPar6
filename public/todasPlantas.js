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
        habito: []
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
        .then((plantas) => {
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
        })
})



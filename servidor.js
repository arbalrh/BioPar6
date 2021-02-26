const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config({
    path: path.join(__dirname, ".env")
});
const {Schema} = mongoose;
const autoIncrement = require('mongoose-auto-increment');

/* ********** Configurando Banco de Dados ********** */

const connection = mongoose.createConnection(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

autoIncrement.initialize(connection);

const schemaPlanta = new Schema({
    grupo: {
        type: String,
        enum: ['briofita', 'pteridofita', 'gimnosperma', 'angiosperma'],
        required: true
    },
    nomeCientifico: {
        type: String,
        required: true
    },
    nomesPopulares: {
        type: [String],
        required: true
    },
    frutos: {
        possui: {
            type: Boolean,
            required: true
        },
        epoca: {
            inicio: Date,
            fim: Date,
        },
        beneficios: String,
    },
    porte: {
        type: String,
        enum: ['pequeno', 'medio', 'grande'],
        required: true
    },
    habito: {
        type: String,
        enum: ['erva', 'subarbusto', 'arbusto', 'arvore', 'liana', 'epifita', 'hemiepifita', 'parasita', 'naoSeAplica']
    },
    clima: String,
    necessidadeLuzSolar: {
        type: String, 
        enum: ['pouca', 'media', 'alta']
    },
    cuidados: String,
}) 

schemaPlanta.plugin(autoIncrement.plugin, 'Planta');

const Planta = connection.model('Planta', schemaPlanta);

function exibirPlantas(pagina, done){
    Planta.find({
        _id: {
            $gte: ((pagina*10) - 10),
            $lt: pagina*10
        }
    })
        .exec(function(err, plantas){
            if(err) return console.error(err);
            else done(null, plantas);
        })
}

function buscarPlanta(id, done){
    Planta.findById(id, function(err, planta){
        if(err) return console.error(err);
        else done(null, planta);
    })
}

function filtrarPlantas(filtroObj, done){
    Planta.find({
        porte: {
            $in: filtroObj.porte
        },
        habito: {
            $in: filtroObj.habito
        },
        grupo: {
            $in: filtroObj.grupo
        },
        necessidadeLuzSolar: {
            $in: filtroObj.luzSolar
        },
        "frutos.possui": {
            $in: filtroObj.frutos
        }
    })
    .select('nomeCientifico nomesPopulares')
    .exec(function(err, plantas){
        if(err) return console.error(err);
        else done(null, plantas);
    })
}

function salvarPlanta(plantaObj, done){
    const plantaParaSalvar = new Planta({
        grupo: plantaObj.grupo,
        nomeCientifico: plantaObj.nomeCientifico,
        nomesPopulares: plantaObj.nomesPopulares,
        porte: plantaObj.porte,
        habito: plantaObj.habito,
        clima: plantaObj.clima,
        necessidadeLuzSolar: plantaObj.necessidadeLuzSolar,
        cuidados: plantaObj.cuidados,
        frutos: plantaObj.frutos
    })

    plantaParaSalvar.save(function(err, planta){
        if(err) return console.error(err);
        else done(null, planta);
    })
}

/* ********** ********** */

app.use(cors());
app.use(express.static('public'));
app.use(express.json());

/* ****** Rotas das paginas do site ****** */

app.get("/", function(req, res){
    res.sendFile(__dirname + "/views/principal.html");
})

app.get("/plantas/", function(req, res){
    res.sendFile(__dirname + "/views/todasPlantas.html");
})

/* ****** Rotas da Api pra consulta e postagem de dados ****** */

app.get("/api/planta/:id", function(req, res){
    if(req.params.id){
        try{
            buscarPlanta(req.params.id, function(err, planta){
                if(err) return console.error(err);
                else {
                    res.json(planta);
                }
            })
        } catch(error){
            res.json({"erro": error});
        }
    } else {
        res.json({"erro": "Planta nao encontrada"});
    }
})

app.get("/api/plantas/:pagina", function(req, res){
    if(req.params.pagina){
        exibirPlantas(req.params.pagina, function(err, plantas){
            if(err) return console.error(err);
            else res.json(plantas);
        })
    } else {
        res.json({"erro": "pagina nao informada"});
    }
});

app.post("/api/plantas", function(req, res){
    const objJson = {};

    for(let prop in req.body){
        if(typeof req.body[prop] === "object") {
            objJson[prop] = req.body[prop];
        } else {
            objJson[prop] = [];
            objJson[prop].push(req.body[prop]);
        }
    }

    if(req.body.grupo.length === 0) objJson.grupo = ["briofita", "pteridofita", "gimnosperma", "angiosperma"];
    if(req.body.frutos.length === 0) objJson.frutos = [true, false];
    if(req.body.porte.length === 0) objJson.porte = ["pequeno", "medio", "grande"];
    if(req.body.luzSolar.length === 0) objJson.luzSolar = ["pouca", "media", "alta"];
    if(req.body.habito.length === 0) objJson.habito = ['erva', 'subarbusto', 'arbusto', 'arvore', 'liana', 'epifita', 'hemiepifita', 'parasita', 'naoSeAplica']

    if(req.body.frutos === ['true']) objJson.frutos = [true];
    if(req.body.frutos === ['false']) objJson.frutos = [false];
    if(req.body.frutos === ['true', 'false']) objJson.frutos = [true, false];


    filtrarPlantas(objJson, function(err, plantas){
        if(err) console.error(err);
        else res.json(plantas)
    })
})







const listener = app.listen(3000, ()=> {
    console.log("Funcionando na porta 3000");
})
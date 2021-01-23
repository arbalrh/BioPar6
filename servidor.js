const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({
    path: path.join(__dirname, ".env")
});
const {Schema} = mongoose;

/* ********** Configurando Banco de Dados ********** */

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

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

const Planta = mongoose.model('Planta', schemaPlanta);



app.get("/", function(req, res){
    res.sendFile(__dirname + "/principal.html");
})

app.get("/PaginaTodasAsPlantas/", function(req, res){
    res.sendFile(__dirname + "/PaginaTodasAsPlantas/todasPlantas.html");
})










const listener = app.listen(3000, ()=> {
    console.log("Funcionando na porta 3000");
})
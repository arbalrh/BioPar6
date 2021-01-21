const path = require('path');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config({
    path: path.join(__dirname, ".env")
});
const {Schema} = mongoose;

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});



app.get("/", function(req, res){
    res.sendFile(__dirname + "/principal.html");
})

app.get("/PaginaTodasAsPlantas/", function(req, res){
    res.sendFile(__dirname + "/PaginaTodasAsPlantas/todasPlantas.html");
})










const listener = app.listen(3000, ()=> {
    console.log("Funcionando na porta 3000");
})
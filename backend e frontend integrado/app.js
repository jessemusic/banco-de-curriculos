const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParse = require('body-parser');

const rotaCandidatos = require('./routes/candidatos');

const Candidato = require('./models/Candidato');

app.use(morgan('dev'));
app.use(bodyParse.urlencoded({ extended: false}));// dados simples
app.use(bodyParse.json());// json de entrada no body

app.get("/formulario", (req, res)=>{
    res.sendFile(__dirname + "/html/index.html")
})
app.post("/enviar", (req, res)=>{
    Candidato.create({
        nomeCompleto: req.body.nomeCompleto, 
        cargoPretendido: req.body.cargoPretendido,
        dataDeNascimento: req.body.dataDeNascimento,
        estadoCivil: req.body.estadoCivil,
        genero: req.body.genero,
        endereco: req.body.endereco,
        bairro: req.body.bairro,
        cidade: req.body.cidade,
        cep: req.body.cep,
        telefoneFixo1: req.body.telefoneFixo1,
        telefoneFixo2: req.body.telefoneFixo2,
        celular: req.body.celular,
        contato: req.body.contato,
        email: req.body.email,
        identidade: req.body.identidade,
        cpf: req.body.cpf,
        temVeiculo: req.body.temVeiculo,
        naoTemVeiculo: req.body.naoTemVeiculo,
        habilitacao: req.body.habilitacao
    }).then(() => {
        res.send("Candidato criado com sucesso")
    }).catch((err) => {
        res.send("Falha ao cadastrar", err)
    });
    
})

app.use((req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Origin, Content-Type, X=Requrested-With, Accept, Authorization'
        );
        if(req.method === 'OPTIONS'){
            res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).send({});
        }
        next();
})

app.use('/candidatos', rotaCandidatos);
// Quando não encontramos a rota
app.use((req,res,next) => {
    const erro = new Error('Arquivo não encontrado');
    erro.status = 404;
    next(erro);
});


app.use((error, req,res,next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            message: error.message
        }
    });
});
module.exports = app;

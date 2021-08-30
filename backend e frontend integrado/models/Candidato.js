const db = require('./db')

const Candidato  = db.sequelize.define('candidatos', {
    nomeCompleto: {
        type: db.Sequelize.STRING
    },
    cargoPretendido: {
        type: db.Sequelize.STRING
    },
    dataDeNascimento: {
        type: db.Sequelize.STRING
    },
    estadoCivil: {
        type: db.Sequelize.STRING
    },

    genero: {
        type: db.Sequelize.STRING
    },
    endereco: {
        type: db.Sequelize.STRING
    },
    bairro: {
        type: db.Sequelize.STRING
    },
    cidade: {
        type: db.Sequelize.STRING
    },
    cep: {
        type: db.Sequelize.STRING
    },
    telefoneFixo1: {
        type: db.Sequelize.STRING
    },
    telefoneFixo2: {
        type: db.Sequelize.STRING
    },
    celular: {
        type: db.Sequelize.STRING
    },
    contato: {
        type: db.Sequelize.STRING
    },
    email: {
        type: db.Sequelize.STRING
    },
    emidentidadeail: {
        type: db.Sequelize.STRING
    },
    cpf: {
        type: db.Sequelize.STRING
    },
    temVeiculo: {
        type: db.Sequelize.STRING
    },
    habilitacao: {
        type: db.Sequelize.STRING
    }

})
module.exports = Candidato;
// Candidato.sync({force: true})

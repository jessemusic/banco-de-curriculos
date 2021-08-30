const { Sequelize } = require('sequelize');
const sequelize = new Sequelize('candidatodb', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

sequelize.authenticate().then(()=>{
    console.log("Banco conectado com sucesso")
}).catch((err)=>{
    console.log("Falha ao conectar no banco", err )
})

module.exports = {
    Sequelize: Sequelize,
    sequelize: sequelize
}
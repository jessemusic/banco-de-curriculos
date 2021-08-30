const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

// Retorna todos os candidatos
router.get('/', (req,res,next) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({ error: error })}
            conn.query(
                'SELECT * FROM dadospessoais;',
                (error,resultado, field) => {
                if (error) { return res.status(500).send({ error: error })}
                return res.status(200).send({response: resultado})
            }

        )
    })
});



// router.post("/enviar", (req, res)=>{
//     Candidato.create({
//         nomeCompleto: req.body.nomeCompleto, 
//         cargoPretendido: req.body.cargoPretendido,
//         dataDeNascimento: req.body.dataDeNascimento,
//         estadoCivil: req.body.estadoCivil,
//         genero: req.body.genero,
//         endereco: req.body.endereco,
//         bairro: req.body.bairro,
//         cidade: req.body.cidade,
//         cep: req.body.cep,
//         telefoneFixo1: req.body.telefoneFixo1,
//         telefoneFixo2: req.body.telefoneFixo2,
//         celular: req.body.celular,
//         contato: req.body.contato,
//         email: req.body.email,
//         identidade: req.body.identidade,
//         cpf: req.body.cpf,
//         temVeiculo: req.body.temVeiculo,
//         naoTemVeiculo: req.body.naoTemVeiculo,
//         habilitacao: req.body.habilitacao
//     }).then(() => {
//         res.send("Candidato criado com sucesso")
//     }).catch((err) => {
//         res.send("Falha ao cadastrar", err)
//     });
    
// })


// Cadastra os candidatos
router.post('/', (req,res,next) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'INSERT INTO dadospessoais ( nomeCompleto, cargoPretendido, dataDeNascimento, estadoCivil, genero,'+ 
             'endereco, bairro, cidade, cep, telefoneFixo1, telefoneFixo2, celular,'+
             'contato, email, identidade, cpf, temVeiculo, naoTemVeiculo, habilitacao)'+ 
            'VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [req.body.nomeCompleto, req.body.cargoPretendido,req.body.dataDeNascimento,
            req.body.estadoCivil,req.body.genero,req.body.endereco,req.body.bairro,req.body.cidade,
            req.body.cep,req.body.telefoneFixo1,req.body.telefoneFixo2,req.body.celular,req.body.contato,req.body.email,
            req.body.identidade,req.body.cpf,req.body.temVeiculo,req.body.naoTemVeiculo,req.body.habilitacao],
            (error,resultado, field) =>{
                conn.release();
                if(error){ return res.status(500).send({  error: error, response: null });
                }
                res.status(201).send({
                    mensagem: 'Candidato cadastrado com sucesso!',
                    id_dadospessoais: resultado.insertId
                });
            }

        )
    });
    
   
});


//Retorna um candidato por id
router.get('/:id_dadospessoais', (req,res,next) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'SELECT * FROM dadospessoais WHERE id = ?;',
            [req.params.id_dadospessoais],
            (error,resultado, field) => {
            if (error) { return res.status(500).send({ error: error })}
            return res.status(200).send({response: resultado})
        }
        
        )
    })
});
// Altera um candidato por partes 
router.patch('/', (req,res,next) => {
    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'UPDATE dadospessoais SET nomeCompleto =? , cargoPretendido =? , dataDeNascimento = ?, estadoCivil =?, genero =?,'+ 
             'endereco =? , bairro = ?, cidade = ?, cep = ?, telefoneFixo1 = ?, telefoneFixo2 = ?, celular = ?,'+
             'contato = ?, email = ?, identidade = ?, cpf = ?, temVeiculo = ?, naoTemVeiculo = ?, habilitacao = ?' + 
            'WHERE id = ?',
            [req.body.nomeCompleto, req.body.cargoPretendido,req.body.dataDeNascimento,
            req.body.estadoCivil,req.body.genero,req.body.endereco,req.body.bairro,req.body.cidade,
            req.body.cep,req.body.telefoneFixo1,req.body.telefoneFixo2,req.body.celular,req.body.contato,req.body.email,
            req.body.identidade,req.body.cpf,req.body.temVeiculo,req.body.naoTemVeiculo,req.body.habilitacao, req.body.id],
            (error,resultado, field) =>{
                conn.release();
                if(error){
                    return res.status(500).send({
                        error: error,
                        response: null
                    });
                }
                res.status(202).send({
                    mensagem: 'Candidato alterado com sucesso!',
                    id_dadospessoais: resultado.insertId
                });
            }

        )
    });

    
});

// Altera um candidatos completo
router.put('/', (req,res,next) => {
    res.status(201).send({
        mensagem: 'Atualiza um candidato'
    });
});

// Remove um candidato
router.delete('/', (req,res,next) => {

    mysql.getConnection((error, conn) => {
        if(error){ return res.status(500).send({ error: error })}
        conn.query(
            'DELETE FROM dadospessoais WHERE id = ?',
            [ req.body.id],
            (error,resultado, field) =>{
                conn.release();
                if(error){return res.status(500).send({ error: error})}
                res.status(202).send({
                    mensagem: 'Candidato removido com sucesso!',
                });
            }

        )
    });
});




module.exports = router;

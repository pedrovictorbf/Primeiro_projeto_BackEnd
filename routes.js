var express = require('express');
const app = express();
app.use(express.json());
var sql = require("mssql");
const parse = require('nodemon/lib/cli/parse');
var sqlConfig = require('./dbConnection');


app.get('/listar', function (req, res) {
    sql.connect(sqlConfig.dbConnection()).then(() => {
        return sql.query("SELECT Vendedor,Marca,Chassi,UF,Quantidade,Cod,Ano FROM FT_Maquinas;");
    }).then(result => {
        res.status(200).send(result.recordset).json;
    }).catch(err => {
        res.status(500).send("ERRO");
    })
});

app.post('/inserir', function (req, res) {
    sql.connect(sqlConfig.dbConnection()).then(() => {
        return sql.query("INSERT INTO FT_Maquinas (Vendedor,Marca,Chassi,UF,Quantidade,Cod,Ano) VALUES ('" + req.body.Vendedor + "', '" + req.body.Marca + "', '" + req.body.Chassi + "','" + req.body.UF + "','" + req.body.Quantidade + "','" + req.body.Cod + "', " + req.body.Ano + ")");
    }).then(result => { 
        res.status(201).send()
    }).catch(err => {
        res.status(415).send("ERRO");
        console.log(err)
    })
});

app.delete('/deletar/:Cod', function (req, res) {
    sql.connect(sqlConfig.dbConnection()).then(() => {
        return sql.query("DELETE FROM FT_Maquinas WHERE Cod='" + req.params.Cod + "'");
    }).then(result => {
        res.status(200).send()
    }).catch(err => {
        res.status(500).send("ERRO");
    })
});
app.patch('/editar/:Cod', function (req, res) {
    sql.connect(sqlConfig.dbConnection()).then(() => {
        return sql.query("UPDATE  FT_Maquinas SET Vendedor = '" + req.body.vendedor + "' WHERE Cod = '" + req.params.Cod + "'");
    }).then(result => {
        res.status(200).send(result.recordset).json;
    }).catch(err => {
        res.status(500).send("ERRO");
    })
});

app.listen(8092);
console.log('rodando!')


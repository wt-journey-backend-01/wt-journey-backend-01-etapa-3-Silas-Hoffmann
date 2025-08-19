const express = require('express')
const app = express();
app.use(express.json());

const agentesRouter = require("./routes/agentesRoutes")
app.use('/agentes', agentesRouter);

const casosRouter = require("./routes/casosRoutes")
app.use('/casos', casosRouter);

const PORT = 3000;

/*
 ______________
|    status    |
|--------------|
|  GET   | 200 |
|  POST  | 201 |
|  PUT   | 200 |
| PATCH  | 200 |
| DELETE | 204 |
 --------------
*/

/*--------------------------------------------
-----------------Rotas raiz-------------------
--------------------------------------------*/
app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});

app.get('/', (req, res) => {
    res.status(200).send('Bem vindo ao Departamento de Policia!');
});
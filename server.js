const express = require('express')
const app = express();

app.use(express.json());

const agentesRouter = require("./routes/agentesRoutes")
const casosRouter = require("./routes/casosRoutes")

app.use('/agentes', agentesRouter);
app.use('/casos', casosRouter);

app.get('/', (req, res) => {
    res.status(200).send('Bem vindo ao Departamento de Policia!');
});

const errorHandler = require("./utils/errorHandler");
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor do Departamento de Polícia rodando em localhost:${PORT}`);
});
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
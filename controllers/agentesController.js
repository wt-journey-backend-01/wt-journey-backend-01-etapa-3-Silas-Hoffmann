const agentesRepository = require('../repositories/agentesRepository');
const { validate: isUUID } = require("uuid");

// --- funções auxiliares de validação ---

function validacaoData(dataStr) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dataStr)) return 0;
    const data = new Date(dataStr);
    const hoje = new Date();
    data.setHours(0,0,0,0);
    hoje.setHours(0,0,0,0);
    if (data > hoje) return -1;
    return 1;
}

// --- Controllers ---

// GET /agentes
async function getAllAgentes(req, res, next) {
    try {
        const agentes = await agentesRepository.read();
        return res.status(200).json(agentes);
    } catch (error) {
        next(error);
    }
}

// GET /agentes/:id
async function getAgenteById(req, res, next) {
    try {
        const id = req.params.id;
        if (!isUUID(id)) return res.status(400).send("ID inválido (UUID esperado)");

        const agente = await agentesRepository.read({ id });
        if (!agente) {
            return res.status(404).send("Agente não encontrado");
        }
        return res.status(200).json(agente);
    } catch (error) {
        next(error);
    }
}

// POST /agentes
async function create(req, res, next) {
    try {
        const { nome, cargo, dataDeIncorporacao } = req.body;

        if (!nome) return res.status(400).send("Nome obrigatório");
        if (!cargo) return res.status(400).send("Cargo obrigatório");
        if (!dataDeIncorporacao) return res.status(400).send("Data de incorporação obrigatória");

        const datavalida = validacaoData(dataDeIncorporacao);
        if (datavalida === 0) return res.status(400).send("Data inválida (YYYY-MM-DD)");
        if (datavalida === -1) return res.status(400).send("Data não pode ser futura");

        const newAgente = await agentesRepository.create({ nome, cargo, dataDeIncorporacao });
        return res.status(201).json(newAgente[0]); // retorno do Knex com returning('*') é array
    } catch (error) {
        next(error);
    }
}

// PUT /agentes/:id
async function update(req, res, next) {
    try {
        const uuid = req.params.id;
        if (!isUUID(uuid)) return res.status(400).send("ID inválido (UUID esperado)");

        const { nome, cargo, dataDeIncorporacao } = req.body;

        if ('id' in req.body) return res.status(400).send("ID não pode ser alterado");
        if (!nome) return res.status(400).send("Nome obrigatório");
        if (!cargo) return res.status(400).send("Cargo obrigatório");
        if (!dataDeIncorporacao) return res.status(400).send("Data de incorporação obrigatória");

        const datavalida = validacaoData(dataDeIncorporacao);
        if (datavalida === 0) return res.status(400).send("Data inválida YYYY-MM-DD");
        if (datavalida === -1) return res.status(400).send("Data não pode ser futura");

        const updatedAgente = await agentesRepository.update(uuid, { nome, cargo, dataDeIncorporacao });
        if (!updatedAgente) {
            return res.status(404).send("Agente não encontrado");
        }

        return res.status(200).json(updatedAgente);
    } catch (error) {
        next(error);
    }
}

// PATCH /agentes/:id (parcial)
async function updateParcial(req, res, next) {
    try {
        const uuid = req.params.id;
        if (!isUUID(uuid)) return res.status(400).send("ID inválido (UUID esperado)");
        if ('id' in req.body) return res.status(400).send("ID não pode ser alterado");

        const { nome, cargo, dataDeIncorporacao } = req.body;

        if (dataDeIncorporacao) {
            const datavalida = validacaoData(dataDeIncorporacao);
            if (datavalida === 0) return res.status(400).send("Data inválida YYYY-MM-DD");
            if (datavalida === -1) return res.status(400).send("Data não pode ser futura");
        }

        const updateObj = {};
        if (nome) updateObj.nome = nome;
        if (cargo) updateObj.cargo = cargo;
        if (dataDeIncorporacao) updateObj.dataDeIncorporacao = dataDeIncorporacao;

        const updatedAgente = await agentesRepository.update(uuid, updateObj);
        if (!updatedAgente) {
            return res.status(404).send("Agente não encontrado");
        }

        return res.status(200).json(updatedAgente);
    } catch (error) {
        next(error);
    }
}

// DELETE /agentes/:id
async function deleteAgente(req, res, next) {
    try {
        const id = req.params.id;
        if (!isUUID(id)) return res.status(400).send("ID inválido (UUID esperado)");

        const sucesso = await agentesRepository.remove(id);
        if (!sucesso) {
            return res.status(404).send("Agente não encontrado");
        }

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    create,
    update,
    updateParcial,
    deleteAgente
};
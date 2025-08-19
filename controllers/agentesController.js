const agentesRepository = require("../repositories/agentesRepository");
const { isUUID } = require("validator");

async function create(req, res, next) {
    try {
        const { nome, cargo, dataDeIncorporacao } = req.body;
        if (!nome || !cargo || !dataDeIncorporacao) {
            return res.status(400).json({ message: "Todos os campos são obrigatórios" });
        }

        const newAgente = await agentesRepository.create({ nome, cargo, dataDeIncorporacao });
        return res.status(201).json(newAgente); // ✅ sem [0]
    } catch (err) {
        next(err);
    }
}

async function read(req, res, next) {
    try {
        const { id } = req.params;

        if (!isUUID(id)) {
            return res.status(400).json({ message: "ID inválido (UUID esperado)" });
        }

        const agente = await agentesRepository.read({ id });
        if (!agente) {
            return res.status(404).json({ message: "Agente não encontrado" });
        }

        return res.status(200).json(agente);
    } catch (err) {
        next(err);
    }
}

async function update(req, res, next) {
    try {
        const { id } = req.params;
        const data = req.body;

        if (!isUUID(id)) {
            return res.status(400).json({ message: "ID inválido (UUID esperado)" });
        }

        const updatedAgente = await agentesRepository.update(id, data);
        if (!updatedAgente) {
            return res.status(404).json({ message: "Agente não encontrado para atualização" });
        }

        return res.status(200).json(updatedAgente); // ✅ sem [0]
    } catch (err) {
        next(err);
    }
}

async function remove(req, res, next) {
    try {
        const { id } = req.params;
        if (!isUUID(id)) {
            return res.status(400).json({ message: "ID inválido (UUID esperado)" });
        }

        const deleted = await agentesRepository.remove(id);
        if (!deleted) {
            return res.status(404).json({ message: "Agente não encontrado para exclusão" });
        }

        return res.status(204).send(); // sucesso sem body
    } catch (err) {
        next(err);
    }
}

module.exports = {
    create,
    read,
    update,
    remove,
};
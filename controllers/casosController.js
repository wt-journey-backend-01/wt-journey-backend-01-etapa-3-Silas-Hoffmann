const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { validate: isUUID } = require("uuid");

// GET /casos
async function getAllCasos(req, res, next) {
    try {
        const casos = await casosRepository.read();
        return res.status(200).json(casos);
    } catch (error) {
        next(error);
    }
}

// GET /casos/:id
async function getCasoById(req, res, next) {
    try {
        const id = req.params.id;
        if (!isUUID(id)) {
            return res.status(400).json({ message: "ID inválido (UUID esperado)" });
        }

        const caso = await casosRepository.read({ id });
        if (!caso) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }

        return res.status(200).json(caso);
    } catch (error) {
        next(error);
    }
}

// POST /casos
async function create(req, res, next) {
    try {
        const { titulo, descricao, status, agente_id } = req.body;

        if (!titulo) return res.status(400).json({ message: "Título obrigatório" });
        if (!descricao) return res.status(400).json({ message: "Descrição obrigatória" });
        if (!status) return res.status(400).json({ message: "Status obrigatório (aberto / solucionado)" });
        if (status !== "aberto" && status !== "solucionado") {
            return res.status(400).json({ message: "Status deve ser 'aberto' ou 'solucionado'" });
        }
        if (!agente_id) return res.status(400).json({ message: "Agente responsável obrigatório" });

        // valida se agente existe
        const agente = await agentesRepository.read({ id: agente_id });
        if (!agente) return res.status(404).json({ message: "Agente não encontrado" });

        const newCaso = await casosRepository.create({ titulo, descricao, status, agente_id });
        return res.status(201).json(newCaso); // ✅ newCaso já é objeto
    } catch (error) {
        next(error);
    }
}

// PUT /casos/:id
async function update(req, res, next) {
    try {
        const uuid = req.params.id;
        if (!isUUID(uuid)) {
            return res.status(400).json({ message: "ID inválido (UUID esperado)" });
        }

        const { titulo, descricao, status, agente_id } = req.body;
        
        if ('id' in req.body) {
            return res.status(400).json({ message: "ID não pode ser alterado" });
        }

        if (!titulo) return res.status(400).json({ message: "Título obrigatório" });
        if (!descricao) return res.status(400).json({ message: "Descrição obrigatória" });
        if (!status) return res.status(400).json({ message: "Status obrigatório (aberto / solucionado)" });
        if (status !== "aberto" && status !== "solucionado") {
            return res.status(400).json({ message: "Status deve ser 'aberto' ou 'solucionado'" });
        }
        if (!agente_id) return res.status(400).json({ message: "Agente responsável obrigatório" });

        const agente = await agentesRepository.read({ id: agente_id });
        if (!agente) return res.status(404).json({ message: "Agente não encontrado" });

        const updatedCaso = await casosRepository.update(uuid, {
            titulo, descricao, status, agente_id
        });

        if (!updatedCaso) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }

        return res.status(200).json(updatedCaso); // ✅ já retorna objeto
    } catch (error) {
        next(error);
    }
}

// PATCH /casos/:id -> atualização parcial
async function updateParcial(req, res, next) {
    try {
        const uuid = req.params.id;
        if (!isUUID(uuid)) {
            return res.status(400).json({ message: "ID inválido (UUID esperado)" });
        }

        if ('id' in req.body) {
            return res.status(400).json({ message: "ID não pode ser alterado" });
        }

        const { titulo, descricao, status, agente_id } = req.body;
        const updateObj = {};

        if (titulo) updateObj.titulo = titulo;
        if (descricao) updateObj.descricao = descricao;

        if (status) {
            if (status !== "aberto" && status !== "solucionado") {
                return res.status(400).json({ message: "Status deve ser 'aberto' ou 'solucionado'" });
            }
            updateObj.status = status;
        }

        if (agente_id) {
            const agente = await agentesRepository.read({ id: agente_id });
            if (!agente) {
                return res.status(404).json({ message: "Agente não encontrado" });
            }
            updateObj.agente_id = agente.id;
        }

        const updatedCaso = await casosRepository.update(uuid, updateObj);
        if (!updatedCaso) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }

        return res.status(200).json(updatedCaso);
    } catch (error) {
        next(error);
    }
}

// DELETE /casos/:id
async function deleteCaso(req, res, next) {
    try {
        const id = req.params.id;
        if (!isUUID(id)) {
            return res.status(400).json({ message: "ID inválido (UUID esperado)" });
        }

        const sucesso = await casosRepository.remove(id);
        if (!sucesso) {
            return res.status(404).json({ message: "Caso não encontrado" });
        }

        return res.status(204).send(); // ✅ sucesso, sem body
    } catch (error) {
        next(error);
    }
}

module.exports = {
    getAllCasos,
    getCasoById,
    create,
    update,
    updateParcial,
    deleteCaso,
};
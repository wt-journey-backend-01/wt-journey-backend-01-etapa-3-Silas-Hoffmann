const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');

// --- Função auxiliar ---
function isUUID(str) {
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(str);
}

// --- Controllers ---

// GET /casos
async function getAllCasos(req, res) {
    try {
        const casos = await casosRepository.read();
        return res.status(200).json(casos);
    } catch (error) {
        next(error);
    }
}

// GET /casos/:id
async function getCasoById(req, res) {
    try {
        const id = req.params.id;
        if (!isUUID(id)) return res.status(400).send("ID inválido (UUID esperado)");

        const caso = await casosRepository.read({ id });
        if (!caso) return res.status(404).send("Caso não encontrado");

        return res.status(200).json(caso);
    } catch (error) {
        next(error);
    }
}

// POST /casos
async function create(req, res) {
    try {
        const { titulo, descricao, status, agente_id } = req.body;

        if (!titulo) return res.status(400).send("Título obrigatório");
        if (!descricao) return res.status(400).send("Descrição obrigatória");
        if (!status) return res.status(400).send("Status obrigatório (aberto / solucionado)");
        if (status !== "aberto" && status !== "solucionado") {
            return res.status(400).send("Status deve ser 'aberto' ou 'solucionado'");
        }
        if (!agente_id) return res.status(400).send("Agente responsável obrigatório");

        // valida se agente existe
        const agente = await agentesRepository.read({ id: agente_id });
        if (!agente) return res.status(404).send("Agente não encontrado");

        const newCaso = await casosRepository.create({ titulo, descricao, status, agente_id });
        return res.status(201).json(newCaso[0]);
    } catch (error) {
        next(error);
    }
}

// PUT /casos/:id
async function update(req, res) {
    try {
        const uuid = req.params.id;
        if (!isUUID(uuid)) return res.status(400).send("ID inválido (UUID esperado)");

        const { titulo, descricao, status, agente_id } = req.body;
        if ('id' in req.body) return res.status(400).send("ID não pode ser alterado");

        if (!titulo) return res.status(400).send("Título obrigatório");
        if (!descricao) return res.status(400).send("Descrição obrigatória");
        if (!status) return res.status(400).send("Status obrigatório (aberto / solucionado)");
        if (status !== "aberto" && status !== "solucionado") {
            return res.status(400).send("Status deve ser 'aberto' ou 'solucionado'");
        }
        if (!agente_id) return res.status(400).send("Agente responsável obrigatório");

        const agente = await agentesRepository.read({ id: agente_id });
        if (!agente) return res.status(404).send("Agente não encontrado");

        const updatedCaso = await casosRepository.update(uuid, {
            titulo, descricao, status, agente_id
        });

        if (!updatedCaso) return res.status(404).send("Caso não encontrado");

        return res.status(200).json(updatedCaso);
    } catch (error) {
        next(error);
    }
}

// PATCH /casos/:id -> atualização parcial
async function updateParcial(req, res) {
    try {
        const uuid = req.params.id;
        if (!isUUID(uuid)) return res.status(400).send("ID inválido (UUID esperado)");
        if ('id' in req.body) return res.status(400).send("ID não pode ser alterado");

        const { titulo, descricao, status, agente_id } = req.body;
        const updateObj = {};

        if (titulo) updateObj.titulo = titulo;
        if (descricao) updateObj.descricao = descricao;

        if (status) {
            if (status !== "aberto" && status !== "solucionado") {
                return res.status(400).send("Status deve ser 'aberto' ou 'solucionado'");
            }
            updateObj.status = status;
        }

        if (agente_id) {
            const agente = await agentesRepository.read({ id: agente_id });
            if (!agente) return res.status(404).send("Agente não encontrado");
            updateObj.agente_id = agente.id;
        }

        const updatedCaso = await casosRepository.update(uuid, updateObj);
        if (!updatedCaso) return res.status(404).send("Caso não encontrado");

        return res.status(200).json(updatedCaso);
    } catch (error) {
        next(error);
    }
}

// DELETE /casos/:id
async function deleteCaso(req, res) {
    try {
        const id = req.params.id;
        if (!isUUID(id)) return res.status(400).send("ID inválido (UUID esperado)");

        const sucesso = await casosRepository.remove(id);
        if (!sucesso) return res.status(404).send("Caso não encontrado");

        return res.status(204).send();
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
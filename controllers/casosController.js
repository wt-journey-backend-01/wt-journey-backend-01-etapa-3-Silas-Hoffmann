const casosRepository = require('../repositories/casosRepository');
const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

function isUUID(str) { // valida o formato do id para UUID
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(str);
}
function getAllCasos(req, res) {
    const casos = casosRepository.findAll();
    res.status(200).send(casos);
}
function getCasoById(req, res) {
    const id = req.params.id;
    const caso = casosRepository.findById(id);
    if (!caso) {
        return res.status(404).send("Caso não encontrado");
    } else {
        res.status(200).send(caso);
    }
}
function create(req, res) {
    const { titulo, descricao, status, agente_id } = req.body;
    if (!titulo) {
        return res.status(400).send("Titulo obrigatorio");
    }
    if (!descricao) {
        return res.status(400).send("Descrição obrigatoria");
    }
    if (!status) {
        return res.status(400).send("Status obrigatorio (aberto / solucionado)");
    }
    if (status != 'aberto' && status != 'solucionado') {
        return res.status(400).send("Status deve ser 'aberto' ou 'solucionado'");
    }
    if (!agente_id) {
        return res.status(400).send("Agente responsável obrigatorio");
    }
    const agente = agentesRepository.findById(agente_id);
    if (!agente) {
        return res.status(404).send("Agente nao encontrado");
    }

    let newId = uuidv4();
    while (!isUUID(newId) || casosRepository.findById(newId)) {
        newId = uuidv4()
    }

    const newCaso = { id: newId, titulo, descricao, status, agente_id: agente.id };
    casosRepository.add(newCaso);
    res.status(201).json(newCaso);
}
function update(req, res) {
    const uuid = req.params.id;
    if (!isUUID(uuid)) {
        return res.status(400).send("ID invalido (formato UUID)");
    }
    const caso = casosRepository.findById(uuid);
    const { titulo, descricao, status, agente_id, id } = req.body;
    if (!caso) {
        return res.status(404).send("Caso não encontrado");
    } else {
        if (!titulo) {
            return res.status(400).send("Titulo obrigatorio");
        }
        if (!descricao) {
            return res.status(400).send("Descrição obrigatoria");
        }
        if (!status) {
            return res.status(400).send("Status obrigatorio (aberto / solucionado)");
        }
        if (status != 'aberto' && status != 'solucionado') {
            return res.status(400).send("Status deve ser 'aberto' ou 'solucionado'");
        }
        if (!agente_id) {
            return res.status(400).send("Agente responsável obrigatorio");
        }
        if ('id' in req.body) {
            return res.status(400).send("ID nao pode ser alterado");
        }

        const agente = agentesRepository.findById(agente_id);
        if (!agente) {
            return res.status(404).send("Agente nao encontrado");
        }
        caso.titulo = titulo;
        caso.descricao = descricao;
        caso.status = status;
        caso.agente_id = agente.id;
        res.status(200).json(caso);
    }
}
function updateParcial(req, res) {
    const uuid = req.params.id;
    if (!isUUID(uuid)) {
        return res.status(400).send("ID invalido (formato UUID)");
    }
    const caso = casosRepository.findById(uuid);
    const { titulo, descricao, status, agente_id, id } = req.body;
    if (!caso) {
        return res.status(404).send("Caso não encontrado");
    } else {
        if ('id' in req.body) {
            return res.status(400).send("ID nao pode ser alterado");
        }
        if (agente_id) {
            const agente = agentesRepository.findById(agente_id);
            if (!agente) {
                return res.status(404).send("Agente nao encontrado");
            } else {
                caso.agente_id = agente.id;
            }
        }
        if (titulo) {
            caso.titulo = titulo;
        }
        if (descricao) {
            caso.descricao = descricao;
        }
        if (status) {
            if (status != 'aberto' && status != 'solucionado') {
                return res.status(400).send("Status deve ser 'aberto' ou 'solucionado'");
            }
            caso.status = status;
        }
        res.status(200).json(caso);
    }
}
function deleteCaso(req, res) {
    const id = req.params.id;
    const sucesso = casosRepository.removeById(id);
    if (!sucesso) {
        return res.status(404).send("Caso não encontrado");
    }
    res.status(204).send();
}

module.exports = {
    getAllCasos,
    getCasoById,
    create,
    update,
    deleteCaso,
    updateParcial
}
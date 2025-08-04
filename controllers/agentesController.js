const agentesRepository = require('../repositories/agentesRepository');
const { v4: uuidv4 } = require('uuid');

function isUUID(str) { // valida o formato do id para UUID
    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    return regex.test(str);
}
function validacaoData(dataStr) { // 1 = valida | 0 = fora do formato | -1 = data futura
    // Verifica o formato com regex: YYYY-MM-DD
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    if (!regex.test(dataStr)) {
        return 0; // Formato inválido
    }

    const data = new Date(dataStr);
    const hoje = new Date();
    data.setHours(0, 0, 0, 0);
    hoje.setHours(0, 0, 0, 0);
    if (data > hoje) {
        return -1; // Data no futuro
    }

    return 1; // Data válida e não está no futuro
}
function getAllAgentes(req, res) {
    const agentes = agentesRepository.findAll();
    res.status(200).send(agentes);
}
function getAgenteById(req, res) {
    const id = req.params.id;
    const agente = agentesRepository.findById(id);
    if (!agente) {
        return res.status(404).send("Agente nao encontrado");
    }
    res.status(200).send(agente);
}
function create(req, res) {
    const { nome, cargo, dataDeIncorporacao } = req.body;
    if (!nome) {
        return res.status(400).send("Nome obrigatório");
    }
    if (!cargo) {
        return res.status(400).send("Cargo obrigatório");
    }
    if (!dataDeIncorporacao) {
        return res.status(400).send("Data de Incorporacao obrigatória");
    } else if (dataDeIncorporacao) {
        const datavalida = validacaoData(dataDeIncorporacao);
        if (datavalida == 0) {
            return res.status(400).send("Data invalida YYYY-MM-DD");
        } else if (datavalida == -1) {
            return res.status(400).send("Data nao pode ser futura");
        }
    }
    let newId = uuidv4();
    while (!isUUID(newId) || agentesRepository.findById(newId)) {
        newId = uuidv4()
    }

    const newAgente = { id: newId, nome, dataDeIncorporacao, cargo };
    agentesRepository.add(newAgente);
    res.status(201).json(newAgente);
}
function update(req, res) {
    const uuid = req.params.id;
    if (!isUUID(uuid)) {
        return res.status(400).send("ID invalido (formato UUID)");
    }
    const { nome, cargo, dataDeIncorporacao, id } = req.body;
    const agente = agentesRepository.findById(uuid);
    if (!agente) {
        return res.status(404).send("Agente nao encontrado");
    }
    if (!nome) {
        return res.status(400).send("Nome obrigatório");
    }
    if (!cargo) {
        return res.status(400).send("Cargo obrigatório");
    }
    if (!dataDeIncorporacao) {
        return res.status(400).send("Data de Incorporacao obrigatória");
    }
    if ('id' in req.body) {
        return res.status(400).send("ID nao pode ser alterado");
    }
    if (dataDeIncorporacao) {
        const datavalida = validacaoData(dataDeIncorporacao);
        if (datavalida == 0) {
            return res.status(400).send("Data invalida YYYY-MM-DD");
        } else if (datavalida == -1) {
            return res.status(400).send("Data nao pode ser futura");
        }
    }

    agente.nome = nome;
    agente.cargo = cargo;
    agente.dataDeIncorporacao = dataDeIncorporacao;
    res.status(200).json(agente);
}
function deleteAgente(req, res) {
    const id = req.params.id;
    const sucesso = agentesRepository.removeById(id);
    if (!sucesso) {
        return res.status(404).send("Agente nao encontrado");
    }
    res.status(204).send();
}
function updateParcial(req, res) {
    const uuid = req.params.id;
    if (!isUUID(uuid)) {
        return res.status(400).send("ID invalido (formato UUID)");
    }
    const agente = agentesRepository.findById(uuid);
    if (!agente) {
        return res.status(404).send("Agente não encontrado");
    }
    if ('id' in req.body) {
        return res.status(400).send("ID nao pode ser alterado");
    }
    const { nome, cargo, dataDeIncorporacao } = req.body;
    if (dataDeIncorporacao) {
        const datavalida = validacaoData(dataDeIncorporacao);
        if (datavalida == 0) {
            return res.status(400).send("Data invalida YYYY-MM-DD");
        } else if (datavalida == -1) {
            return res.status(400).send("Data nao pode ser futura");
        }
    }
    if (nome) {
        agente.nome = nome;
    }
    if (cargo) {
        agente.cargo = cargo;
    }
    if (dataDeIncorporacao){
        agente.dataDeIncorporacao = dataDeIncorporacao;
    }
    res.status(200).json(agente);
}

module.exports = {
    getAllAgentes,
    getAgenteById,
    create,
    update,
    deleteAgente,
    updateParcial
};
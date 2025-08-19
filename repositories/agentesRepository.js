const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

async function create(object) {
    try {
        object.id = uuidv4();
        const createdAgente = await db("agentes").insert(object).returning("*");
        return createdAgente[0];
    } catch (error) {
        const err = new Error("Erro ao criar agente");
        err.statusCode = 500;
        throw err;
    }
}

async function read(query = {}) {
    try {
        const result = await db("agentes").where(query);
        const isSingular = Object.keys(query).length === 1 && "id" in query;

        if (isSingular && result.length === 0) {
            const err = new Error("Agente não encontrado");
            err.statusCode = 404;
            throw err;
        }

        return isSingular ? result[0] : result;
    } catch (error) {
        if (error.statusCode) throw error;
        const err = new Error("Erro ao buscar agente(s)");
        err.statusCode = 500;
        throw err;
    }
}

async function update(id, object) {
    try {
        const updatedAgente = await db("agentes")
            .where({ id })
            .update(object)
            .returning("*");

        if (!updatedAgente || updatedAgente.length === 0) {
            const err = new Error("Agente não encontrado para atualização");
            err.statusCode = 404;
            throw err;
        }

        return updatedAgente[0];
    } catch (error) {
        if (error.statusCode) throw error;
        const err = new Error("Erro ao atualizar agente");
        err.statusCode = 500;
        throw err;
    }
}

async function remove(id) {
    try {
        const deletedAgente = await db("agentes").where({ id }).del();

        if (!deletedAgente) {
            const err = new Error("Agente não encontrado para exclusão");
            err.statusCode = 404;
            throw err;
        }

        return true;
    } catch (error) {
        if (error.statusCode) throw error;
        const err = new Error("Erro ao excluir agente");
        err.statusCode = 500;
        throw err;
    }
}

module.exports = {
    create,
    read,
    update,
    remove,
};
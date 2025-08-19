const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

async function create(object) {
    try {
        object.id = uuidv4();
        const createdAgente = await db("agentes").insert(object).returning("*");
        return createdAgente[0];  // retorna o objeto direto
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
        return isSingular ? result[0] || null : result; // null se não encontrado
    } catch (error) {
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
        return updatedAgente[0] || null; // null se não encontrou
    } catch (error) {
        const err = new Error("Erro ao atualizar agente");
        err.statusCode = 500;
        throw err;
    }
}

async function remove(id) {
    try {
        const deletedAgente = await db("agentes").where({ id }).del();
        return deletedAgente > 0; // true se deletou, false se não achou
    } catch (error) {
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
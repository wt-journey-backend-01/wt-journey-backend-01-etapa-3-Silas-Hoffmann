const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

async function create(object) {
    try {
        object.id = uuidv4();
        const createdCaso = await db("casos").insert(object).returning("*");
        return createdCaso[0]; // retorna objeto
    } catch (error) {
        const err = new Error("Erro ao criar caso");
        err.statusCode = 500;
        throw err;
    }
}

async function read(query = {}) {
    try {
        const result = await db("casos").where(query);
        const isSingular = Object.keys(query).length === 1 && "id" in query;
        return isSingular ? result[0] || null : result; // null se não encontrado
    } catch (error) {
        const err = new Error("Erro ao buscar caso(s)");
        err.statusCode = 500;
        throw err;
    }
}

async function update(id, object) {
    try {
        const updatedCaso = await db("casos").where({ id }).update(object).returning("*");
        return updatedCaso[0] || null; // null se não encontrou
    } catch (error) {
        const err = new Error("Erro ao atualizar caso");
        err.statusCode = 500;
        throw err;
    }
}

async function remove(id) {
    try {
        const deletedCaso = await db("casos").where({ id }).del();
        return deletedCaso > 0; // true se deletou, false se não
    } catch (error) {
        const err = new Error("Erro ao excluir caso");
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
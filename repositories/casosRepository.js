const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

async function create(object) {
    try {
        object.id = uuidv4();
        const createdCaso = await db("casos").insert(object).returning("*");
        return createdCaso[0];
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

        if (isSingular && result.length === 0) {
            const err = new Error("Caso não encontrado");
            err.statusCode = 404;
            throw err;
        }

        return isSingular ? result[0] : result;
    } catch (error) {
        if (error.statusCode) throw error;
        const err = new Error("Erro ao buscar caso(s)");
        err.statusCode = 500;
        throw err;
    }
}

async function update(id, object) {
    try {
        const updatedCaso = await db("casos")
            .where({ id })
            .update(object)
            .returning("*");

        if (!updatedCaso || updatedCaso.length === 0) {
            const err = new Error("Caso não encontrado para atualização");
            err.statusCode = 404;
            throw err;
        }

        return updatedCaso[0];
    } catch (error) {
        if (error.statusCode) throw error;
        const err = new Error("Erro ao atualizar caso");
        err.statusCode = 500;
        throw err;
    }
}

async function remove(id) {
    try {
        const deletedCaso = await db("casos").where({ id }).del();

        if (!deletedCaso) {
            const err = new Error("Caso não encontrado para exclusão");
            err.statusCode = 404;
            throw err;
        }

        return true;
    } catch (error) {
        if (error.statusCode) throw error;
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
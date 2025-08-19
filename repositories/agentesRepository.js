const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

async function create(object){
    try {
        object.id = uuidv4();
        const createdAgente = await db("agentes").insert(object).returning("*");
        return createdAgente;
    } catch (error) {
        console.error("Error creating agente:", error);
        err.statusCode = 500;
        throw err;
    }
}

async function read(query={}){
    try {
        const result = await db("agentes").where(query);
        const isSingular = Object.keys(query).length == 1 && 'id' in query;
        return isSingular ? result[0] : result;

    }catch (error) {
        console.error("Error reading agente:", error);
        err.statusCode = 500;
        throw err;
    }
}

async function update(id, object){
    try {
        const updatedAgente = await db("agentes")
            .where({id: id})
            .update(object)
            .returning("*");
        
        if (!updatedAgente || updatedAgente.length === 0) {
            err.statusCode = 404;
            throw err;
        }
        return updatedAgente[0];
    }catch (error) {
        console.error("Error updating agente:", error);
        err.statusCode = 500;
        throw err;
    }
}

async function remove(id){
    try {
        const deletedAgente = await db("agentes").where({id: id}).del();
        if (!deletedAgente) {
            err.statusCode = 404;
            throw err;
        }
        return true;
    }catch (error) {
        console.error("Error deleting agente:", error);
        err.statusCode = 500;
        throw err;
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}
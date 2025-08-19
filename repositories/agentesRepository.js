const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

async function create(object){
    try {
        object.id = uuidv4();
        const createdAgente = await db("agentes").insert(object).returning("*");
        return createdAgente;
    } catch (error) {
        console.error("Error creating agente:", error);
        return false;
    }
}

async function read(query={}){
    try {
        const result = await db("agentes").where(query);
        const isSingular = Object.keys(query).length == 1 && 'id' in query;
        return isSingular ? result[0] : result;

    }catch (error) {
        console.error("Error reading agente:", error);
        return false;
    }
}

async function update(id, object){
    try {
        const updatedAgente = await db("agentes")
            .where({id: id})
            .update(object)
            .returning("*");
        
        if (!updatedAgente || updatedAgente.length === 0) {
            return false;
        }
        return updatedAgente[0];
    }catch (error) {
        console.error("Error updating agente:", error);
        return false;
    }
}

async function remove(id){
    try {
        const deletedAgente = await db("agentes").where({id: id}).del();
        if (!deletedAgente) {
            return false;
        }
        return true;
    }catch (error) {
        console.error("Error deleting agente:", error);
        return false;
    }
}

module.exports = {
    create,
    read,
    update,
    remove
}
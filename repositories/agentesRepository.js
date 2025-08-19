const db = require("../db/db");

async function create(object){
    try {
        const createdAgente = await db("agentesRepository").insert(object).returning("*");
        return createdAgente;
    } catch (error) {
        console.error("Error creating agente:", error);
        return false;
    }
}

async function read(id){
    try {
        const result = await db("agentesRepository").where({id: id}).first();
        if (!result) {
            return false;
        }
        return result[0];
    }catch (error) {
        console.error("Error reading agente:", error);
        return false;
    }
}

async function update(id, object){
    try {
        const  updatedAgente = await db("agentesRepository").where({id: id}).update(object, ["*"]).returning("*");
        if (!updatedAgente) {
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
        const deletedAgente = await db("agentesRepository").where({id: id}).del();
        if (!deletedAgente) {
            return false;
        }
        return true;
    }catch (error) {
        console.error("Error deleting agente:", error);
        return false;
    }
}

create({nome: "Agente Teste", cargo: "Testador", dataDeIncorporacao: "2023-01-01"})
    .then(result => console.log("Created Agente:", result))
    .catch(error => console.error("Error in create:", error));
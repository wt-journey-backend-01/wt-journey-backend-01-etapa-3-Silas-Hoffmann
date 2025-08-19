const db = require("../db/db");
const { v4: uuidv4 } = require("uuid");

async function create(object){
    try {
        object.id = uuidv4(); // gera UUID para o caso
        const createdCaso = await db("casos").insert(object).returning("*");
        return createdCaso;
    } catch (error) {
        const err = new Error("Error reading entity");
        err.statusCode = 500;
        throw err;
    }
}

async function read(query={}){
    try {
        const result = await db("casos").where(query);
        const isSingular = Object.keys(query).length == 1 && 'id' in query;
        return isSingular ? result[0] : result;
    } catch (error) {
        const err = new Error("Error reading entity");
        err.statusCode = 500;
        throw err;
    }
}

async function update(id, object){
    try {
        const updatedCaso = await db("casos").where({id: id}).update(object).returning("*");
        if (!updatedCaso || updatedCaso.length === 0) {
            const err = new Error("Error reading entity");
            err.statusCode = 404;
            throw err;
        }
        return updatedCaso[0];
    } catch (error) {
        const err = new Error("Error reading entity");
        err.statusCode = 500;
        throw err;
    }
}

async function remove(id){
    try {
        const deletedCaso = await db("casos").where({id: id}).del();
        if (!deletedCaso) {
            const err = new Error("Error reading entity");
            err.statusCode = 404;
            throw err;
        }
        return true;
    } catch (error) {
        const err = new Error("Error reading entity");
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

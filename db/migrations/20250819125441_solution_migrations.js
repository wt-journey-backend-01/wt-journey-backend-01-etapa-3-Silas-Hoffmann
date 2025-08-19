/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('agentes', (table) => {
        table.uuid('id').primary();
        table.string('nome').notNullable();
        table.date('dataDeIncorporacao').notNullable();
        table.string('cargo').notNullable();
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable("agentesrepository");
};

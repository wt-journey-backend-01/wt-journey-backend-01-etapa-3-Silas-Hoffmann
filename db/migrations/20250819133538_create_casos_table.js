/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('casos', (table) => {
        table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
        table.string('titulo').notNullable();
        table.string('descricao').notNullable();
        table.string('status').notNullable();
        table.uuid('agente_id').notNullable();
        table.foreign('agente_id').references('id').inTable('agentes').onDelete('CASCADE');
        table.timestamps(true, true);
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable("casos");
};

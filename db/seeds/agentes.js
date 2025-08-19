/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  await knex('agentes').del();

  const agente1 = uuidv4();
  const agente2 = uuidv4();

  await knex('agentes').insert([
    { id: agente1, nome: 'Agente Silva', dataDeIncorporacao: '2020-01-10', cargo: 'Investigador' },
    { id: agente2, nome: 'Agente Souza', dataDeIncorporacao: '2019-05-20', cargo: 'Delegado' }
  ]);

  return { agente1, agente2 };
};


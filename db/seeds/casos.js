/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
const { v4: uuidv4 } = require('uuid');

exports.seed = async function(knex) {
  await knex('casos').del();

  // Pegando agentes existentes
  const agentes = await knex('agentes').select('id');

  await knex('casos').insert([
    {
      id: uuidv4(),
      titulo: 'Roubo de Carro',
      descricao: 'Carro roubado no centro da cidade',
      status: 'aberto',
      agente_id: agentes[0].id
    },
    {
      id: uuidv4(),
      titulo: 'Fraude Bancária',
      descricao: 'Suspeita de fraude em contas digitais',
      status: 'em andamento',
      agente_id: agentes[1].id
    }
  ]);
};



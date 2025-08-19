/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Apaga dados anteriores (reset do seed)
  await knex('agentes').del();

  // Insere 3 agentes fixos
  await knex('agentes').insert([
    {
      id: '595d2fc2-81c3-43ec-9c76-ab09b1a56a19',
      nome: 'João Silva',
      cargo: 'Detetive',
      dataDeIncorporacao: '2018-05-12'
    },
    {
      id: 'b08bbf40-a890-4a09-93d9-d586ea682425',
      nome: 'Maria Souza',
      cargo: 'Inspetora',
      dataDeIncorporacao: '2019-07-23'
    },
    {
      id: '2aa4579d-4bc3-47dc-9742-13caaf89a244',
      nome: 'Carlos Pereira',
      cargo: 'Agente Especial',
      dataDeIncorporacao: '2020-11-03'
    }
  ]);
};
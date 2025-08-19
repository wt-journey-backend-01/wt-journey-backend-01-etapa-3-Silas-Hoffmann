/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Apaga casos anteriores
  await knex('casos').del();

  // Insere 3 casos vinculados a agentes fixos
  await knex('casos').insert([
    {
      id: 'eb317123-ccf9-487a-9c61-8497517b0664',
      titulo: 'Investigação de Roubo',
      descricao: 'Roubo a banco ocorrido no centro da cidade',
      status: 'aberto',
      agente_id: '595d2fc2-81c3-43ec-9c76-ab09b1a56a19' // João Silva
    },
    {
      id: 'fe43e0de-b61e-4722-bf80-6f219e0b76d2',
      titulo: 'Caso de Desaparecimento',
      descricao: 'Pessoa desaparecida relatada na Zona Norte',
      status: 'aberto',
      agente_id: 'b08bbf40-a890-4a09-93d9-d586ea682425' // Maria Souza
    },
    {
      id: 'f8dc84b7-5d05-4b2f-b003-e473378b6444',
      titulo: 'Fraude Financeira',
      descricao: 'Investigação em empresa acusada de fraude contábil',
      status: 'solucionado',
      agente_id: '2aa4579d-4bc3-47dc-9742-13caaf89a244' // Carlos Pereira
    }
  ]);
};
exports.seed = async function (knex) {
  // Apaga registros antigos
  await knex("agentesrepository").del();

  // Insere registros novos
  await knex("agentesrepository").insert([
    { name: "João", cargo: "Investigador", dataDeIncorporacao: "2020-01-01" },
    { name: "Maria", cargo: "Delegada", dataDeIncorporacao: "2019-05-20" }
  ]);
};


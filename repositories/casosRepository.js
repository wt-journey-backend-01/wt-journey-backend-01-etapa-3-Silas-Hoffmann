const casos = [
    {
        id: "f5fb2ad5-22a8-4cb4-90f2-8733517a0d46",
        titulo: "Homicidio",
        descricao: "Disparos foram reportados às 22:33 do dia 10/07/2007 na região do bairro União, resultando na morte da vítima, um homem de 45 anos.",
        status: "aberto",
        agente_id: "d3471f83-7c7f-4609-a892-bbcad6b36294"
    },
    {
        id: "a3e913a7-52b3-41df-a26f-3f9f6eafbd7a",
        titulo: "Roubo a mão armada",
        descricao: "Uma padaria foi assaltada às 18:10 do dia 05/06/2012, no bairro Santo Antônio. Dois suspeitos armados fugiram em uma moto preta.",
        status: "solucionado",
        agente_id: "d3471f83-7c7f-4609-a892-bbcad6b36294"
    },
    {
        id: "b97d2dc4-70cf-46c7-9c6a-78e981749fba",
        titulo: "Furto de veículo",
        descricao: "Um carro modelo Fiat Palio, cor vermelha, foi furtado na madrugada de 14/09/2019 no estacionamento do shopping central.",
        status: "aberto",
        agente_id: "2b62a6f4-1b23-4c82-87de-8cdb8ae987bc"
    }
]

function findAll() {
    return casos
}
function findById(id) {
    return casos.find(caso => caso.id === id);
}
function add(newCaso) {
    casos.push(newCaso);
}
function removeById(id) {
    const index = casos.findIndex(c => c.id === id);
    if (index === -1){
        return false;
    } else {
        casos.splice(index, 1);
        return true;
    }
}

module.exports = {
    findAll,
    findById,
    add,
    removeById
}
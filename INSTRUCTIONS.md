# 🚓 API do Departamento de Polícia

Esta aplicação é uma API REST construída com **Node.js**, **Express**, **PostgreSQL** e **Knex.js**.  
Ela gerencia agentes e casos policiais, permitindo **CRUD completo** em ambas as entidades.

---

## 📁 Estrutura do Projeto
📦 projeto  
│  
├── controllers/ # Lógica de controle das rotas  
├── db/  
│ ├── migrations/ # Scripts para criação das tabelas  
│ ├── seeds/ # Dados iniciais (agentes e casos)  
│ └── db.js # Configuração de conexão com o banco  
├── repositories/ # Camada de acesso ao banco (Knex)  
├── routes/ # Definição das rotas da API  
├── utils/ # Middleware de tratamento de erros  
│  
├── knexfile.js  
├── server.js  
├── package.json  
└── INSTRUCTIONS.md  

---

## ⚙️ Pré-Requisitos

- [Node.js](https://nodejs.org/) **versão 16 ou superior**
- [Docker](https://www.docker.com/) e [Docker Compose](https://docs.docker.com/compose/)
- NPM ou Yarn para gerenciar pacotes

---

## 🚀 Como Rodar o Projeto

### 1. Clone o Repositório
```
git clone https://github.com/seu-usuario/seu-repositorio.git  
cd seu-repositorio
```
### 2. Crie um arquivo .env  
O .env não deve ser versionado (adicione no .gitignore), mas é obrigatório para rodar a API.  

Crie um arquivo .env na raiz do projeto com o seguinte conteúdo:
```
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=policia_db
DB_HOST=localhost
DB_PORT=5432
```
💡 Caso esteja rodando no Docker Compose, o DB_HOST pode ser postgres (nome do serviço definido no docker-compose).

### 3. Suba o banco de dados com Docker  
```
docker-compose up -d
```
Isso iniciará um container com PostgreSQL rodando em localhost:5432.

### 4. Instale as dependências  
```
npm install
```

### 5. Rode as Migrations
```
npx knex migrate:latest
```
Isso criará automaticamente as tabelas agentes e casos.

### 6. Rode os Seeds  
```
npx knex seed:run
```
Isso populá o banco com dados iniciais de agentes e casos para teste.

### 7. Inicie o Servidor  
```
npm start
```
O servidor ficará disponível em:
```
http://localhost:3000
```

## 📌 Endpoints Disponíveis
### 👮 Agentes
``GET /agentes`` → Lista todos os agentes  
``GET /agentes/:id`` → Busca um agente por ID  
``POST /agentes`` → Cria um novo agente  
``PUT /agentes/:id`` → Atualiza agente (todos os campos)  
``PATCH /agentes/:id`` → Atualiza agente (campos parciais)  
``DELETE /agentes/:id`` → Remove um agente  

### 🕵️ Casos
``GET /casos`` → Lista todos os casos  
``GET /casos/:id`` → Busca um caso por ID  
``POST /casos`` → Cria um novo caso  
``PUT /casos/:id`` → Atualiza caso (todos os campos)  
``PATCH /casos/:id`` → Atualiza caso (campos parciais)  
``DELETE /casos/:id`` → Remove um caso  

## 🧪 Testando rapidamente com curl
Criar um agente:

```
curl -X POST http://localhost:3000/agentes \
  -H "Content-Type: application/json" \
  -d '{"nome":"João Silva","cargo":"Detetive", "dataDeIncorporacao":"2020-01-15"}'
```
Listar agentes:

```
curl http://localhost:3000/agentes
```

## ⚠️ Observações Importantes
- Certifique-se de que o container do PostgreSQL está ativo e acessível.
- Se der erro de conexão, verifique se o DB_HOST no .env está correto (localhost ou postgres no Docker Compose).
- Caso use gen_random_uuid() nas migrations, é necessário habilitar a extensão pgcrypto:
```
exports.up = function(knex) {
  return knex.raw('CREATE EXTENSION IF NOT EXISTS "pgcrypto";');
};
```

## 📚 Recursos Úteis
- **[Documentação do Knex](https://knexjs.org/)**  
- **[Express.js Documentation](https://expressjs.com/pt-br/)**  
- **[PostgreSQL Docs](https://www.postgresql.org/docs/)**  

---
# API de gerenciamento de carros

![Repo Size](https://img.shields.io/github/repo-size/joaodutra88/API-Carro)
![Linguagens usadas](https://img.shields.io/github/languages/count/joaodutra88/API-Carro)
![Linguagem mais usada](https://img.shields.io/github/languages/top/joaodutra88/API-Carro)
![Última atualização](https://img.shields.io/github/last-commit/joaodutra88/API-Carro)

Essa é uma API que permite o gerenciamento de carros, permitindo as operações de criar, listar, atualizar e excluir carros.

# **Configuração** ⚙️

Clone o repositório:

```
git clone https://github.com/joaodutra88/API-Carro.git
```

Entre no diretório do projeto:

```
cd nome-do-repositorio
```

Instale as dependências:

```
npm install
```

Inicie o servidor:

```
npm start
```

# **Endpoints** 📊

## `GET /carros`

Retorna uma lista de todos os carros cadastrados.

**Exemplo de resposta:**

```
[
   {
      "_id":"60a7d4f170b0f1cd8a2c4924",
      "marca":"Ford",
      "modelo":"Fiesta",
      "ano":2018,
      "preco":40000,
      "cor":"Azul"
   },
   {
      "_id":"60a7d59c70b0f1cd8a2c4925",
      "marca":"Chevrolet",
      "modelo":"Onix",
      "ano":2020,
      "preco":50000,
      "cor":"Vermelho"
   }
]
```

## **`GET /carros/:id`**

Retorna um carro específico pelo seu ID.

**Exemplo de resposta:**

```
{
  "_id": "60a7d4f170b0f1cd8a2c4924",
  "marca": "Ford",
  "modelo": "Fiesta",
  "ano": 2018,
  "preco": 40000,
  "cor": "Azul"
}
```

## **`POST /carros`**

Cria um novo carro com os dados informados no corpo da requisição.

**Exemplo de corpo da requisição:**

```
{
  "marca": "Volkswagen",
  "modelo": "Gol",
  "ano": 2019,
  "preco": 45000,
  "cor": "Preto"
}
```

**Exemplo de resposta:**

```
{
  "_id": "60a7d7a570b0f1cd8a2c4926",
  "marca": "Volkswagen",
  "modelo": "Gol",
  "ano": 2019,
  "preco": 45000,
  "cor": "Preto"
}
```

# **`PUT /carros/:id`**

Atualiza um carro existente com os dados informados no corpo da requisição.

**Exemplo de corpo da requisição:**

```
{
  "marca": "Ford",
  "modelo": "Fiesta",
  "ano": 2018,
  "preco": 45000,
  "cor": "Azul"
}
```

**Exemplo de resposta:**

```
{
  "_id": "60a7d4f170b0f1cd8a2c4924",
  "marca": "Ford",
  "modelo": "Fiesta",
  "ano": 2018,
  "preco": 45000,
  "cor": "Azul"
}
```

# **`DELETE /carros/:id`**

Exclui um carro existente pelo seu ID.

**Exemplo de resposta:**

```
DELETE /carros/616ce2eb3a3f2900144e4a4d
```

**Exemplo de resposta:**

```
HTTP/1.1 204 No Content
```

_Caso o carro não seja encontrado, a API retorna uma resposta com status 404 (Not Found) e uma mensagem de erro._

**Exemplo de resposta:**

```
HTTP/1.1 404 Not Found
Content-Type: application/json

{
"message": "Carro não encontrado."
}
```

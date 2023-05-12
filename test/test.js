const request = require("supertest");
const app = require("../src/routes/carro");
const Carro = require("../src/models/carro");

describe("Carros", () => {
   let carro;

   beforeEach(async () => {
      carro = new Carro({
         marca: "Chevrolet",
         modelo: "Camaro",
         ano: 2022,
         preco: 299900,
         cor: "Vermelho",
      });
      await carro.save();
   });

   afterEach(async () => {
      await Carro.deleteMany();
   });

   describe("GET /carros", () => {
      test("Deve retornar todos os carros", async () => {
         const res = await request(app).get("/carros");
         expect(res.status).toBe(200);
         expect(res.body.length).toBe(1);
         expect(res.body[0]._id).toBe(carro.id);
      });
   });

   describe("GET /carros/:id", () => {
      test("Deve retornar um único carro", async () => {
         const res = await request(app).get(`/carros/${carro.id}`);
         expect(res.status).toBe(200);
         expect(res.body._id).toBe(carro.id);
      });

      test("Deve retornar um erro se o id do carro não for válido", async () => {
         const res = await request(app).get("/carros/abc");
         expect(res.status).toBe(400);
      });

      test("Deve retornar um erro se o carro não existir", async () => {
         const res = await request(app).get("/carros/123456789012");
         expect(res.status).toBe(404);
      });
   });

   describe("POST /carros", () => {
      test("Deve criar um novo carro", async () => {
         const carroData = {
            marca: "Fiat",
            modelo: "Uno",
            ano: 2021,
            preco: 55000,
            cor: "Branco",
         };
         const res = await request(app).post("/carros").send(carroData);
         expect(res.status).toBe(201);
         expect(res.body.marca).toBe(carroData.marca);
         expect(res.body.modelo).toBe(carroData.modelo);
         expect(res.body.ano).toBe(carroData.ano);
         expect(res.body.preco).toBe(carroData.preco);
         expect(res.body.cor).toBe(carroData.cor);
      });

      test("Deve retornar um erro se os dados do carro forem inválidos", async () => {
         const carroData = {
            marca: "Fiat",
            modelo: "Uno",
            ano: "abc",
            preco: "def",
            cor: "",
         };
         const res = await request(app).post("/carros").send(carroData);
         expect(res.status).toBe(400);
      });
   });

   describe("PUT /carros/:id", () => {
      test("Deve atualizar um carro existente", async () => {
         const carroData = {
            marca: "Fiat",
            modelo: "Uno",
            ano: 2021,
            preco: 55000,
            cor: "Branco",
         };
         const res = await request(app)
            .put(`/carros/${carro.id}`)
            .send(carroData);
         expect(res.status).toBe(200);
         expect(res.body.marca).toBe(carroData.marca);
         expect(res.body.modelo).toBe(carroData.modelo);
         expect(res.body.ano).toBe(carroData.ano);
         expect(res.body.preco).toBe(carroData.preco);
         expect(res.body.cor).toBe(carroData.cor);
         // Verifica se o carro foi atualizado no banco de dados
         const carroAtualizado = await Carro.findById(carro.id);
         expect(carroAtualizado).not.toBeNull();
         expect(carroAtualizado.marca).toBe(carroData.marca);
         expect(carroAtualizado.modelo).toBe(carroData.modelo);
         expect(carroAtualizado.ano).toBe(carroData.ano);
         expect(carroAtualizado.preco).toBe(carroData.preco);
         expect(carroAtualizado.cor).toBe(carroData.cor);
      });

      test("Deve retornar erro 404 se o carro não existe", async () => {
         const res = await request(app).put(`/carros/${carro.id}`).send({
            marca: "Fiat",
            modelo: "Uno",
            ano: 2021,
            preco: 55000,
            cor: "Branco",
         });
         expect(res.status).toBe(404);
         expect(res.body.message).toBe("Carro não encontrado.");
      });

      test("Deve retornar erro 400 se os dados enviados forem inválidos", async () => {
         const res = await request(app).put(`/carros/${carro.id}`).send({
            marca: "",
            modelo: "",
            ano: "",
            preco: "",
            cor: "",
         });
         expect(res.status).toBe(400);
         expect(res.body.message).not.toBeNull();
      });
   });

   describe("DELETE /carros/:id", () => {
      test("Deve excluir um carro existente", async () => {
         const res = await request(app).delete(`/carros/${carro.id}`);
         expect(res.status).toBe(204);
         // Verifica se o carro foi excluído do banco de dados
         const carroExcluido = await Carro.findById(carro.id);
         expect(carroExcluido).toBeNull();
      });

      test("Deve retornar erro 404 se o carro não existe", async () => {
         const res = await request(app).delete(`/carros/${carro.id}`);
         expect(res.status).toBe(404);
         expect(res.body.message).toBe("Carro não encontrado.");
      });
   });
});

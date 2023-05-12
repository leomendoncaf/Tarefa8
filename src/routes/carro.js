const express = require("express");
const HttpStatus = require("http-status-codes");
const validate = require("validate.js");
const Carro = require("../models/carro");

const router = express.Router();

// GET /carros
router.get("/carros", async (req, res) => {
   try {
      const carros = await Carro.find();
      res.status(HttpStatus.OK).json(carros);
   } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
         message: err.message,
      });
   }
});

// GET /carros/:id
router.get("/carros/:id", async (req, res) => {
   try {
      const carro = await Carro.findById(req.params.id);
      if (carro) {
         res.status(HttpStatus.OK).json(carro);
      } else {
         res.status(HttpStatus.NOT_FOUND).json({
            message: "Carro não encontrado.",
         });
      }
   } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
         message: err.message,
      });
   }
});

// POST /carros
router.post("/carros", async (req, res) => {
   const constraints = {
      marca: { presence: true },
      modelo: { presence: true },
      ano: { presence: true, numericality: { onlyInteger: true } },
      preco: { presence: true, numericality: true },
      cor: { presence: true },
   };

   const validation = validate(req.body, constraints);

   if (validation) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: validation });
      return;
   }

   const carro = new Carro({
      marca: req.body.marca,
      modelo: req.body.modelo,
      ano: req.body.ano,
      preco: req.body.preco,
      cor: req.body.cor,
   });

   try {
      const newCarro = await carro.save();
      res.status(HttpStatus.CREATED).json(newCarro);
   } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
         message: err.message,
      });
   }
});

// PUT /carros/:id
router.put("/carros/:id", async (req, res) => {
   const constraints = {
      marca: { presence: true },
      modelo: { presence: true },
      ano: { presence: true, numericality: { onlyInteger: true } },
      preco: { presence: true, numericality: true },
      cor: { presence: true },
   };

   const validation = validate(req.body, constraints);

   if (validation) {
      res.status(HttpStatus.BAD_REQUEST).json({ message: validation });
      return;
   }

   try {
      const carro = await Carro.findById(req.params.id);
      if (carro) {
         carro.marca = req.body.marca;
         carro.modelo = req.body.modelo;
         carro.ano = req.body.ano;
         carro.preco = req.body.preco;
         carro.cor = req.body.cor;

         const updatedCarro = await carro.save();
         res.status(HttpStatus.OK).json(updatedCarro);
      } else {
         res.status(HttpStatus.NOT_FOUND).json({
            message: "Carro não encontrado.",
         });
      }
   } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
         message: err.message,
      });
   }
});

// DELETE /carros/:id
router.delete("/carros/:id", async (req, res) => {
   try {
      const carro = await Carro.findById(req.params.id);
      if (carro) {
         await carro.remove();
         res.status(HttpStatus.NO_CONTENT).send();
      } else {
         res.status(HttpStatus.NOT_FOUND).json({
            message: "Carro não encontrado.",
         });
      }
   } catch (err) {
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
         message: err.message,
      });
   }
});

module.exports = router;

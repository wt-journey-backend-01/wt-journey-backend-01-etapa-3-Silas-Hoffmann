const express = require('express');
const router = express.Router();
const casosController = require('../controllers/casosController');

router.get('/', casosController.getAllCasos);
router.get('/:id', casosController.getCasoById);
router.post('/', casosController.create);
router.put('/:id', casosController.update);
router.patch('/:id', casosController.updateParcial);
router.delete('/:id', casosController.deleteCaso);

module.exports = router;

const express = require('express');
const router = express.Router();
const agentesController = require('../controllers/agentesController');

router.get('/', agentesController.getAllAgentes);
router.get('/:id', agentesController.getAgenteById);
router.post('/', agentesController.create);
router.put('/:id', agentesController.update);
router.patch('/:id', agentesController.updateParcial);
router.delete('/:id', agentesController.deleteAgente);

module.exports = router;

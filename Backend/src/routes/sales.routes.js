const express = require('express');
const router = express.Router();

const { getSales, getSaleById, createSale, deleteSale, createOrder, getMyOrders } =
    require('../controllers/sales.controllers');

const { authMiddleware, adminMiddleware } =
    require('../middlewares/auth.middleware');

// Rutas específicas ANTES de los wildcards (/:id captura cualquier segmento)
router.post('/ordenes', authMiddleware, createOrder);
router.get('/ordenes', authMiddleware, getSales);
router.get('/mis-ordenes', authMiddleware, getMyOrders);

// Rutas legacy con wildcard
router.get('/', getSales);
router.get('/:id', getSaleById);
router.post('/', createSale);
router.delete('/:id', deleteSale);

module.exports = router;
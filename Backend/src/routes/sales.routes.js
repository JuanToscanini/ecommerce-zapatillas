const express = require('express');
const router = express.Router();

const { getSales, getSaleById, createSale, deleteSale, createOrder, getMyOrders } =
    require('../controllers/sales.controllers');

const { authMiddleware, adminMiddleware } =
    require('../middlewares/auth.middleware');

// Rutas legacy (mantener para compatibilidad)
router.get('/', getSales);
router.get('/:id', getSaleById);
router.post('/', createSale);
router.delete('/:id', deleteSale);

// Rutas de Orden de Compra
router.post('/ordenes', authMiddleware, createOrder);
router.get('/ordenes', authMiddleware, getSales);
router.get('/mis-ordenes', authMiddleware, getMyOrders);

module.exports = router;
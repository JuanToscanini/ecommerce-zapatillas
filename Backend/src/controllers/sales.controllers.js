const Sales = require('../models/sale.model');

const getSales = async (req, res) => {
    try {
        const sale = await Sales.find();
        res.json(sale);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }

};

const getSaleById = async (req, res) => {
    try {
        const sale = await Sales.findById(req.params.id);
        if (!sale) {
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json(sale);
    } catch (error) {
        if (error.name === 'CastError') {
           res.status(400).json({ error: 'ID inválido' });
           return;
        }
        res.status(500).json({ message: error.message });
    }
};

const createSale = async (req, res) => {
    try {
        const newSale = new Sales(req.body);
        await newSale.save();
        res.status(201).json(newSale);

    } catch (error) {
        if(error.name === 'ValidationError') {
            res.status(400).json({ error: 'Datos obligatorios no válidos' });
            return;
        }
        res.status(500).json({ error: 'Error al crear la venta' });
    }
};

const deleteSale = async (req, res) => {
    try {
        const sale = await Sales.findByIdAndDelete(req.params.id);
        if(!sale){
            return res.status(404).json({ error: 'Venta no encontrada' });
        }
        res.json(sale)
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ error: 'ID inválido' });
        }
        res.status(500).json({ message: error.message });
    }
};


module.exports = {
    getSales,
    getSaleById,
    createSale,
    deleteSale
};      
const Cart = require('../models/cart.model');

const getCarts = async (req, res) => {
    try {
        const carts = await Cart.find();
        res.json(carts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getCartById = async (req, res) => {
    try {
        const cart = await cart.findById(req.params.id);
        if (!cart) {
            return res.status(404).json({error: "carrito no encontrado" });
        }
        res.json(cart);
    } catch (error) {
        if(error.name === "CastError"){
            res.status(400).json({error: "carrito no encontrado"})
            return
        }
        res.status(500).json({ message: error.message });
    }
};

const createCart = async (req, res) => {
    try {
        const cart = new Cart(req.body);
        await cart.save();
        res.json(cart);
    } catch (error) {
        if(error.name === "CastError"){
            res.status(400).json({error: "carrito no encontrado"})
            return
        }   
        if (error.code === 11000){
            res.status(409).json({error: "carrito ya existe"})
        }
        res.status(500).json({ message: error.message });
    }
};

const updateCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!cart){
            res.status(400).json({error: "carrito no encontrada"})
        }
        res.json(cart);
    } catch (error) {
        if(error.name === "CastError"){
            res.status(409).json({error: "id de carrito invalido"})
            return
        }
        if(error.code === 11000)
        res.status(500).json({ message: error.message });
    }
};

const deleteCart = async (req, res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        if(!cart){
            res.status(404).json({error: "carrito no encontrado"})
            return
        }
        res.json(cart);
    } catch (error) {
        if(error.name === "CastError"){
            res.status(404).json({error: "id carrito invalido"})
            return
        }
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCarts,
    getCartById,
    createCart,
    updateCart,
    deleteCart
};  
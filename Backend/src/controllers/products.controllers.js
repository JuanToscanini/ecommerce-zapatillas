const Product = require('../models/product.model');

const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if(!user){
            res.status(400).json({error: "el producto no se encontro"})
            return
        }
        res.json(product);
    } catch (error) {
        if(error.name === "CastError"){
            res.status(409).json({error: "ID de producto invalido"})
            return
        }
        res.status(500).json({ message: error.message });
    }
};

const createProduct = async (req, res) => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.json(product);
    } catch (error) {
        if(error.code === 11000){
            res.status(400).json({error:"El producto ya existe"})
            return
        }
        if(error.name === "CastError"){
            res.status(409).json({error: "datos obligatorios no validos"})
            return
        }
        res.status(500).json({ message: error.message });
    }
};

const deleteProduct = async (req, res) => {
    try {
        const product = await product.findByIdAndDelete(req.params.id); // Obtener el ID del producto a eliminar
        if(!product){
            res.status(400).json({error:"producto no encontrada"})
        }
        res.json(product);
    } catch (error) {
        if(error.name === "CastError"){
            res.status(409).json({error: "datos obligatorios no validos"})
            return
        }
        res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const product = await product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if(!product){
            res.status(400).json({error:"producto no encontrado"})
            return
        }
        res.json(product);
    } catch (error) {
        if(error.name === "CastError"){
            res.status(409).json({error: "datos obligatorios no validos"})
            return
        }
        res.status(500).json({ message: error.message });
    }
};



module.exports = {
    getProducts,
    getProductById,
    createProduct,
    deleteProduct,
    updateProduct
};
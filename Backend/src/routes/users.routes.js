const express = require('express');
const router = express.Router();
const { authMiddleware, adminMiddleware } = require('../middlewares/auth.middleware');

const {
    getUsers,
    getUserById,
    getMe,
    createUser,
    deleteUser,
    updateUserById
} = require('../controllers/users.controllers');

router.get('/', authMiddleware, adminMiddleware, getUsers);
router.get('/me', authMiddleware, getMe);
router.get('/:id', authMiddleware, getUserById);
router.post('/', createUser);
router.put('/:id', authMiddleware, updateUserById);
router.delete('/:id', authMiddleware, adminMiddleware, deleteUser);

module.exports = router;

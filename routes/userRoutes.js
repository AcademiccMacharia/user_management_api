const express = require('express');
const { Home, getUser, postUser, singleUser, deleteUser, updateUser } = require('../controllers/userContollers');

const router = express.Router();


router.get('/', Home)
router.get('/users', getUser)
router.get('/users/:id', singleUser)
router.post('/users', postUser)
router.delete('/users/:id', deleteUser)
router.put('/users/:id', updateUser)

module.exports = {
    router
};
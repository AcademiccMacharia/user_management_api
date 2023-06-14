const express = require('express');
const { Home, getUser, singleUser, deleteUser, updateUser, signupUser, loginUser } = require('../controllers/userContollers');

const router = express.Router();


router.get('/', Home)
router.get('/users', getUser)
router.get('/users/:id', singleUser)
router.post('/users', signupUser)
router.post('/login', loginUser)
router.delete('/users/:id', deleteUser)
router.put('/users/:id', updateUser)

module.exports = {
    router
};
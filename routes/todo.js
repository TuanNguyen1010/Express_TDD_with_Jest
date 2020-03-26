const express = require('express')
const router = express.Router();
const ToDoController = require('../controllers/todo')


router.post('/', ToDoController.createToDo)
router.get('/', ToDoController.getToDo)

module.exports = router
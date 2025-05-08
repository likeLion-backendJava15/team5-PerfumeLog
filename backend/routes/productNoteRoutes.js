
const express = require('express');
const router = express.Router();
const controller = require('../controllers/productNoteController');

router.get('/:id', controller.get);

module.exports = router;

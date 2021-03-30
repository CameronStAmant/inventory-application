let express = require('express');
let router = express.Router();

let item_controller = require('../controllers/itemController');
const item = require('../models/item');

router.get('/', item_controller.item_list);

router.get('/:id', item_controller.item_detail);

module.exports = router;

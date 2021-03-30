let express = require('express');
let router = express.Router();

let category_controller = require('../controllers/categoryController');

router.get('/', category_controller.category_list);

router.get('/:id', category_controller.category_detail);

module.exports = router;

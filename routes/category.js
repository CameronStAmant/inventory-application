let express = require('express');
let router = express.Router();

let category_controller = require('../controllers/categoryController');

router.get('/create', category_controller.category_create_get);

router.get('/create', category_controller.category_create_post);

router.get('/', category_controller.category_list);

router.get('/:id', category_controller.category_detail);

router.get('/:id/delete', category_controller.category_delete_get);

router.get('/:id/delete', category_controller.category_delete_post);

router.get('/:id/update', category_controller.category_update_get);

router.get('/:id/update', category_controller.category_update_post);

module.exports = router;

let express = require('express');
let router = express.Router();

let wiki_controller = require('../controllers/wikiController');

/* GET home page. */
router.get('/', wiki_controller.index);

module.exports = router;

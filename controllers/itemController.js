const Item = require('../models/item');
const Category = require('../models/category');
const { body, validationResult } = require('express-validator');

exports.item_list = (req, res, next) => {
  Item.find().exec((err, list_items) => {
    if (err) {
      return next(err);
    }
    res.render('item_list', {
      title: 'Item List',
      item_list: list_items,
    });
  });
};

exports.item_detail = async (req, res, next) => {
  const item = await Item.findById(req.params.id).exec();
  const category = await Category.findById(item.category).exec();

  res.render('item_detail', {
    item: item,
    category: category,
  });
};

exports.item_create_get = (req, res, next) => {
  Category.find().exec((err, list_categories) => {
    if (err) {
      return next(err);
    }
    res.render('item_form', {
      title: 'Create Item',
      categories: list_categories,
    });
  });
};

exports.item_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Item name must be specified.'),
  body('description')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Item description must be specified.'),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('item_form', {
        title: 'Create Item',
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        number_in_stock: req.body.number_in_stock,
        errors: errors.array(),
      });
      return;
    } else {
      let item = new Item({
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        number_in_stock: req.body.number_in_stock,
      });
      item.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect(item.url);
      });
    }
  },
];

exports.item_delete_get = (req, res, next) => {
  res.send('Item delete GET');
};

exports.item_delete_post = (req, res, next) => {
  res.send('Item delete POST');
};

exports.item_update_get = (req, res, next) => {
  res.send('Item update GET');
};

exports.item_update_post = (req, res, next) => {
  res.send('Item update POST');
};

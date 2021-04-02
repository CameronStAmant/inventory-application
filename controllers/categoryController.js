const Category = require('../models/category');
const Item = require('../models/item');
const { body, validationResult } = require('express-validator');

exports.category_list = async (req, res, next) => {
  Category.find().exec((err, list_categories) => {
    if (err) {
      return next(err);
    }
    res.render('category_list', {
      title: 'Category List',
      category_list: list_categories,
    });
  });
};

// async await example
exports.category_detail = async (req, res, next) => {
  try {
    let category = await Category.findById(req.params.id).exec();
    let items = await Item.find(
      { category: req.params.id },
      'name description'
    ).exec();
    if (category === null) {
      let err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }
    res.render('category_detail', {
      category: category.name,
      category_items: items,
    });
  } catch (e) {
    console.log(e);
  }
};

// promise example
/*
exports.category_detail = (req, res, next) => {
  let category = Category.findById(req.params.id).exec();
  let items = Item.find({ category: req.params.id }, 'name description').exec();
  
  Promise.all([category, items]).then((values) => {
    if (values[0] === null) {
      let err = new Error('Category not found');
      err.status = 404;
      return next(err);
    }
    res.render('category_detail', {
      category: values[0].name,
      category_items: values[1],
    });
  });
};
*/
exports.category_create_get = (req, res, next) => {
  res.render('category_form', { title: 'Create Category' });
};

exports.category_create_post = [
  body('name')
    .trim()
    .isLength({ min: 1 })
    .escape()
    .withMessage('Category name must be specified.'),
  body('description').trim().isLength({ min: 1 }).escape(),

  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render('category_form', {
        title: 'Create Category',
        name: req.body.name,
        description: req.body.description,
        errors: errors.array(),
      });
      return;
    } else {
      let category = new Category({
        name: req.body.name,
        description: req.body.description,
      });
      category.save((err) => {
        if (err) {
          return next(err);
        }
        res.redirect(category.url);
      });
    }
  },
];

exports.category_delete_get = (req, res, next) => {
  res.send('Category delete GET');
};

exports.category_delete_post = (req, res, next) => {
  res.send('Category delete POST');
};

exports.category_update_get = (req, res, next) => {
  res.send('Category update GET');
};

exports.category_update_post = (req, res, next) => {
  res.send('Category update POST');
};

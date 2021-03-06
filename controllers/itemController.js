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

// promise example
// exports.item_delete_get = (req, res, next) => {
//   let item = Item.findById(req.params.id).exec();
//   let category = item.then((value) => {
//     return Category.findById(value.category[0]).exec();
//   });

//   Promise.all([item, category]).then((values) => {
//     if (values[0] === null) {
//       let err = new Error('Item not found');
//       err.status = 404;
//       return next(err);
//     } else if (values[1] === null) {
//       let err = new Error('Category not found');
//       err.status = 404;
//       return next(err);
//     }
//     res.render('item_delete', {
//       title: 'Delete Item',
//       item: values[0],
//       category: values[1],
//     });
//   });
// };

// async example
exports.item_delete_get = async (req, res, next) => {
  let item = await Item.findById(req.params.id).exec();
  let category = await Category.findById(item.category).exec();

  if (item === null) {
    let err = new Error('Item not found');
    err.status = 404;
    return next(err);
  } else if (category === null) {
    let err = new Error('Category not found');
    err.status = 404;
    return next(err);
  }
  res.render('item_delete', {
    title: 'Delete Item',
    item: item,
    category: category,
  });
};

//promise example
exports.item_delete_post = (req, res, next) => {
  let item = Item.findById(req.params.id)
    .exec()
    .then((value) => {
      if (value === null) {
        let err = new Error('Item not found');
        err.status = 404;
        return next(err);
      }
      Item.findByIdAndDelete(req.params.id, (err) => {
        if (err) {
          return next(err);
        }
        if (req.header('Referer').includes('category')) {
          res.redirect(req.header('Referer'));
        } else {
          res.redirect('/item');
        }
      });
    });
};

// promise example
exports.item_update_get = (req, res, next) => {
  let item = Item.findById(req.params.id).exec();
  let category = Category.find().exec();

  Promise.all([item, category]).then((values) => {
    if (values[0] === null) {
      let err = new Error('Item not found');
      err.status = 404;
      return next(err);
    } else if (values[1] === null) {
      let err = new Error('Categories not found');
      err.status = 404;
      return next(err);
    }

    res.render('item_form', {
      title: 'Update Item',
      item: values[0],
      categories: values[1],
    });
  });
};

exports.item_update_post = [
  body('name', 'Item name must be specified.')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('description', 'Description must be specified.')
    .trim()
    .isLength({ min: 1 })
    .escape(),

  (req, res, next) => {
    const errors = validationResult(req);
    let item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
      _id: req.params.id,
    });

    if (!errors.isEmpty()) {
      res.render('item_form', {
        title: 'Update Item',
        name: req.body.name,
        description: req.body.description,
        category: req.body.category,
        price: req.body.price,
        number_in_stock: req.body.number_in_stock,
        errors: errors.array(),
      });
      return;
    } else {
      Item.findOne({ name: req.body.name }).exec((err, found_item) => {
        if (err) {
          return next(err);
        }
        if (found_item !== null && found_item.id !== req.params.id) {
          console.log('found');
          res.redirect(found_item.url);
        } else {
          Item.findByIdAndUpdate(req.params.id, item, {}, (err, theItem) => {
            if (err) {
              return next(err);
            }
            console.log(theItem);
            res.redirect(theItem.url);
          });
        }
      });
    }
  },
];

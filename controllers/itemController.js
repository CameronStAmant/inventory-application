const Item = require('../models/item');
const Category = require('../models/category');

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

exports.item_create_get = function (req, res, next) {
  res.send('Item create GET');
};

exports.item_create_post = function (req, res, next) {
  res.send('Item create POST');
};

exports.item_delete_get = function (req, res, next) {
  res.send('Item delete GET');
};

exports.item_delete_post = function (req, res, next) {
  res.send('Item delete POST');
};

exports.item_update_get = function (req, res, next) {
  res.send('Item update GET');
};

exports.item_update_post = function (req, res, next) {
  res.send('Item update POST');
};

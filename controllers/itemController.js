let Item = require('../models/item');

exports.item_list = function (req, res, next) {
  res.send('Item list page');
};

exports.item_detail = function (req, res, next) {
  res.send('Item detail: ' + req.params.id);
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

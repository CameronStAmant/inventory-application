const Item = require('../models/item');
const Category = require('../models/category');

exports.index = async (req, res, next) => {
  let categoryCount = await Item.countDocuments({});
  let itemCount = await Category.countDocuments({});
  res.render('index', {
    title: 'Home',
    categoryTotal: categoryCount,
    itemTotal: itemCount,
  });
};

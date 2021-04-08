const Item = require('../models/item');
const Category = require('../models/category');

exports.index = async (req, res, next) => {
  let categoryCount = await Category.countDocuments({});
  let itemCount = await Item.countDocuments({});
  res.render('index', {
    title: 'Welcome!',
    categoryTotal: categoryCount,
    itemTotal: itemCount,
  });
};

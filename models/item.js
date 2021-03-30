let mongoose = require('mongoose');

let Schema = mongoose.Schema;

let ItemSchema = new Schema({
  name: { type: String, required: true, maxlength: 50 },
  description: { type: String, laxlength: 200 },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  price: { type: Number, required: true },
  number_in_stock: { type: Number, required: true },
});

ItemSchema.virtual('url').get(function () {
  return '/item/' + this._id;
});

module.exports = mongoose.model('Item', ItemSchema);

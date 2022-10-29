const mongoose = require('mongoose')

var LegoSchema = new mongoose.Schema(
  {
    name: String,
    year: String,
    content: String,
    image: String,
    country: String,
    price: Number
  },
  {
    versionKey: false //optional (to remove _v: 0 when add new data)
  }
)

//Note: tham số cuối cùng bắt buộc phải là tên của collection (table) trong DB
var LegoModel = mongoose.model('LeGo', LegoSchema, 'lego')
module.exports = LegoModel

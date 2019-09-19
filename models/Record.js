const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RecordSchema = new Schema({
  label: String,
  date: {
    type: Date,
    default: Date.now
  },
  labelDisplay: String,
  email: String,
  gender: String,
  filename: String,
  url: String
});

const Record = mongoose.model('record', RecordSchema);

module.exports = Record;

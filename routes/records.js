const express = require('express');
const router = express.Router();
const Record = require('../models/Record');

router.get('/', (req, res, next) => {
  Record.find({}).then(users => {
    res.send(users);
  }).catch(next);
});

router.post('/', (req, res, next) => {
  Record.create(req.body)
    .then(record => res.send(record))
    .catch(next);
});

router.delete('/:id', (req, res, next) => {
  const deleteCode = req.body.code;

  console.log(process.env.DEL_CODE);

  if (deleteCode != process.env.DEL_CODE) {
    res.status(404).send('fuck you');
  } else {
    Record.findByIdAndRemove({_id: req.params.id})
      .then(record => res.send(record))
      .catch(next);
  }
});

module.exports = router;

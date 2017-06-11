const Point = require('../models/point');


function pointsIndex(req, res) {
  Point
  .find()
  .exec()
  .then((points) => {
    res.render('points/index', { points });
  })
  .catch((err) => {
    res.status(500).render('error', { err });
  });
}

function pointsNew(req, res) {
  res.render('points/new');
}

function pointsShow(req, res) {
  Point
    .findById(req.params.id)
    .exec()
    .then((point) => {
      if(!point) return status(404).end('Not Found');
      res.render('points/show', { point });
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}

function pointsCreate(req, res) {
  Point
    .create(req.body)
    .then(() => {
      res.redirect('/points');
    })
    .catch((err) => {
      res.status(500).render('error', { err });
    });
}


function pointsEdit(req, res) {
  Point
  .findById(req.params.id)
  .exec()
  .then((point) => {
    if(!point) return res.status(404).end('Not Found');
    res.render('points/edit', { point });
  })
  .catch((err) => {
    res.status(500).render('error', { err });
  });
}

function pointsUpdate(req, res) {
  Point
  .findById(req.params.id)
  .exec()
  .then((point) => {
    if(!point) return res.status(404).send('Not Found');

    for(const field in req.body) {
      point[field] = req.body[field];
    }

    return point.save();
  })
  .then((point) => {
    res.redirect(`/points/${point.id}`);
  })
  .catch((err) => {
    res.status(500).render('error', { err });
  });
}

function pointsDelete(req, res) {
  Point
  .findById(req.params.id)
  .exec()
  .then((point) => {
    if(!point) return res.status(404).send('Not Found');

    return point.remove();
  })
  .then(() => {
    res.redirect('/points');
  })
  .catch((err) => {
    res.status(500).render('error', { err });
  });
}

module.exports = {
  index: pointsIndex,
  new: pointsNew,
  show: pointsShow,
  create: pointsCreate,
  edit: pointsEdit,
  update: pointsUpdate,
  delete: pointsDelete
};

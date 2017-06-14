const Point = require('../models/point');


function pointsIndex(req, res) {
  Point
  .find()
  .populate('createdBy')
  .exec()
  .then((points) => {
    res.render('points/index', { points });
  })
  .catch((err) => {
    res.status(500).render('statics/error', { err });
  });
}

function pointsNew(req, res) {
  res.render('points/new');
}

function pointsShow(req, res) {
  Point
    .findById(req.params.id)
    .populate('createdBy bookings.bookedBy')
    .exec()
    .then((point) => {
      if(!point) {
        const err = new Error('Not Found');
        err.status = 404;
        throw err;
      }
      res.render('points/show', { point });
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
    });
}

function pointsCreate(req, res) {
  req.body.createdBy = req.user;
  if(req.file) req.body.image = req.file.key;

  console.log('REQ BODY FOR POINTS CREATE', req.body);
  Point
    .create(req.body)
    .then(() => {
      res.redirect('/points');
    })
    .catch((err) => {
      res.status(500).render('statics/error', { err });
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
  if(req.file) req.body.image =req.file.key;
  console.log('REQ BODY', req.body);
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

function pointsEditBooking(req, res) {
  Point
  .findById(req.params.id)
  .exec()
  .then((point) => {
    if(!point) return res.status(404).send('Not Found');
    res.render('points/booking', { point });
  })
  .catch((err) => {
    res.status(500).render('error', { err });
  });
}

function pointsNewBooking(req, res) {
  Point
    .findById(req.params.id)
    .exec()
    .then((point) => {
      if(!point) return res.status(404).send('Not Found');
      res.render('bookings/new', { point });
    });
}

function pointsCreateBooking (req, res, next) {
  console.log('req body', req.body);
  req.body.bookedBy = req.user;

  Point
  .findById(req.params.id)
  .exec()
  .then((point) => {
    if(!point) return res.status(404).send('Not Found');

    point.bookings.push(req.body);
    return point.save();
  })
  .then((point) => {
    res.redirect(`/points/${point.id}`);
  })
  .catch(next);
}

function pointsDeleteBooking (req, res) {
  Point
  .findById(req.params.id)
  .exec()
  .then((point) => {
    if(!point) return res.status(404).send('Not Found');
    const bookings = point.bookings.id(req.params.bookingId);

    bookings.remove();
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

function createComment(req, res, next) {

  req.body.createdBy = req.user;

  Point
  .findById(req.params.id)
  .populate('createdBy')
  .exec()
  .then((point) => {
    if(!point) return res.notFound();

    point.comments.push(req.body);
    return point.save();
  })
  .then((point) => res.redirect(`/points/${point.id}`))
  .catch(next);
}

function editComment(req, res, next) {
  Point
.findById(req.params.id)
.exec()
.then((point) => {
  if(!point) return res.notFound();
  const comment = point.comments.id(req.params.commentId);

  for(const field in req.body) {
    comment[field] = req.body[field];
  }

  return comment.save();
})
.then((point) => res.redirect(`/points/${point.id}`))
.catch(next);
}

function deleteComment(req, res, next) {
  Point
.findById(req.params.id)
.exec()
.then((point) => {
  if(!point) return res.notFound();
  const comment = point.comments.id(req.params.commentId);

  comment.remove();

  return point.save();
})
.then((point) => res.redirect(`/points/${point.id}`))
.catch(next);
}


module.exports = {
  index: pointsIndex,
  new: pointsNew,
  show: pointsShow,
  create: pointsCreate,
  edit: pointsEdit,
  update: pointsUpdate,
  delete: pointsDelete,
  newBooking: pointsNewBooking,
  editBooking: pointsEditBooking,
  createBooking: pointsCreateBooking,
  deleteBooking: pointsDeleteBooking,
  createComment: createComment,
  editComment: editComment,
  deleteComment: deleteComment
};

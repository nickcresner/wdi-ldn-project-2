const User = require('../models/user');

function registrationsNew(req, res) {
  return res.render('registrations/new');
}

function registrationsCreate(req, res) {

  if(req.file) req.body.image = req.file.key;

  User
  .create(req.body)
  .then(() => res.redirect('/login'))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      return res.badRequest('/register', err.toString());
    }
    res.status(500).end();
  });
}

function registrationsShow(req, res) {
  return res.render('registrations/show');
}

function registrationsEdit(req, res) {
  return res.render('registrations/edit');
}

function registrationsUpdate(req, res, next) {
  for(const field in req.body) {
    req.user[field] = req.body[field];
  }

  req.user.save()
  .then(() => res.redirect('/users'))
  .catch((err) => {
    if(err.name === 'ValidationError') return res.badRequest('/registrations/edit', err.toString());
    next(err);
  });
}

function registrationsDelete(req, res) {
  User
  .findById(req.params.id)
  .exec()
  .then((user) => {
    if(!user) return res.status(404).send('Not Found');

    return user.remove();
  })
  .then(() => {
    res.redirect('/points');
  })
  .catch((err) => {
    res.status(500).render('error', { err });
  });
}




module.exports = {
  new: registrationsNew,
  create: registrationsCreate,
  show: registrationsShow,
  edit: registrationsEdit,
  update: registrationsUpdate,
  delete: registrationsDelete

};

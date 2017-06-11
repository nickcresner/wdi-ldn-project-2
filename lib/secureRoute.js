function secureRoute(req, res, next) {
  if(!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in to complete this task!');
      res.redirect('/login');
    });
  }
  next();
}

module.exports = secureRoute;

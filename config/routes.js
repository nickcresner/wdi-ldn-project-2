const express = require('express');
const router = express.Router();
const points = require('../controllers/points');
const secureRoute = require('../lib/secureRoute');
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const pointsController = require('../controllers/publicPoints');
const upload = require('../lib/upload');
const oauth = require('../controllers/oauth');



router.get('/publicPoints', pointsController.publicPointsProxy);

//home route
router.get('/', (req, res) => res.render('statics/index'));

//index
router.route('/points')
  .get(points.index)
  .post(upload.single('image'), points.create);

//new
router.route('/points/new')
  .get(secureRoute, points.new);

//show
router.route('/points/:id')
  .get(points.show)
  .post(upload.single('image'), points.update)
  .delete(points.delete);

//edit
router.route('/points/:id/edit')
  .get(secureRoute, points.edit);

//edit booking
router.route('/points/:id/bookings/new')
  .get(secureRoute, points.newBooking);

//create booking
router.route('/points/:id/bookings')
  .post(secureRoute, points.createBooking);


//delete booking
router.route('/points/:id/bookings/:bookingId')
  .delete(secureRoute, points.deleteBooking);


//register
router.route('/register')
.get(registrations.new)
.post(upload.single('image'), registrations.create);

router.route('/login')
.get(sessions.new)
.post(sessions.create);

//facebook login
router.route('/oauth/facebook')
  .get(oauth.facebook);

router.route('/profile')
  .get(secureRoute, registrations.show)
  .post(secureRoute, upload.single('image'), registrations.update)
  .delete(secureRoute, registrations.delete);

// router.route('/profile/:id')
//   .get(secureRoute, registrations.show)
//   .put(secureRoute, registrations.update)
//   .delete(secureRoute, registrations.delete);

router.route('/profile/:id/edit')
  .get(secureRoute, registrations.edit);

router.route('/logout')
  .get(sessions.delete);

router.route('/points/:id/comments')
  .post(secureRoute, points.createComment);

router.route('/points/:id/comments/:commentId')
  .get(secureRoute, points.editComment);

router.route('/points/:id/comments/:commentId')
  .delete(secureRoute, points.deleteComment);

module.exports = router;

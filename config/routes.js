const express = require('express');
const router = express.Router();
const points = require('../controllers/points');
const secureRoute = require('../lib/secureRoute');
const sessions = require('../controllers/sessions');
const registrations = require('../controllers/registrations');
const pointsController = require('../controllers/publicPoints');


router.get('/points', pointsController.proxy);

//home route
router.get('/', (req, res) => res.render('./statics/index'));

//index
router.route('/points/index')
  .get(points.index)
  .post(points.create);

//new
router.route('/points/new')
  .get(secureRoute, points.new);

//show
router.route('/points/:id')
  .get(points.show)
  .put(points.update)
  .delete(points.delete);

//create
router.route('/points/index')
  .get(points.index)
  .post(secureRoute, points.create);

//edit
router.route('/points/:id/edit')
  .get(secureRoute, points.edit);

//register
router.route('/registrations/new')
.get(registrations.new)
.post(registrations.create);

router.route('/login')
.get(sessions.new)
.post(sessions.create);

router.route('/logout')
.get(sessions.delete);

module.exports = router;

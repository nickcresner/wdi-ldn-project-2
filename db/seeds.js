const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const { dbURI } = require('../config/environment');
mongoose.connect(dbURI);

const User = require('../models/user');
const ChargePoint = require('../models/point');

User.collection.drop();
ChargePoint.collection.drop();

User
.create([{
  username: 'mickyginger',
  email: 'mike.hayden@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'eisacke',
  email: 'emily.isacke@ga.co',
  password: 'password',
  passwordConfirmation: 'password'
},{
  username: 'nick',
  email: 'nick@nick.com',
  password: 'nick',
  passwordConfirmation: 'nick'
}])
.then((users) => {
  console.log(`${users.length} users created!`);
  return ChargePoint

  .create([{
    pointName: 'Fortune Green',
    address: '50 Fortune Green Road',
    lat: 51.5554524,
    lng: -0.1988172,
    available: 'Yes',
    format: '3-Pin',
    image: 'assets/images/chargepoint1.png',
    createdBy: users[0]
  }, {
    pointName: 'Alex\'s charge point',
    address: '50 Battersea Road',
    lat: 51.4762239,
    lng: -0.1535641,
    available: 'Yes',
    format: '3-Pin',
    image: 'assets/images/chargepoint2.png',
    createdBy: users[2]
  }])
  .then((points) => {
    console.log(`${points.length} points created!`);
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    mongoose.connection.close();
  });
});

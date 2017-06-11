const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/i-movie-db';
mongoose.connect(dbURI);

const User = require('../models/user');
const ChargePoint = require('../models/point');

User.collection.drop();

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
    createdBy: 'Nick'
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

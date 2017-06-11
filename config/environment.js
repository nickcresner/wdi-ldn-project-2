const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost/wdi-ldn-project-2';
const env = process.env.NODE_ENV || 'development';
const sessionSecret = process.env.SESSION_SECRET || 'This is a secret';

module.exports = { port, env, dbURI, sessionSecret };

/**
 * Main application routes
 */
'use strict';

module.exports = function(app) {
  // Insert routes below
  app.use('/api/users', require('./modules/user'));
  app.use('/api/post', require('./modules/post'));
  app.use('/auth', require('./modules/auth'));

};

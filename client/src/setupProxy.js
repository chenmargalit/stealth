const proxy = require('http-proxy-middleware');

module.exports = function(app) {
  console.log('proxy is running');
  // when ever the client server asks for api, or auth/google, forward this to localhost:5000, so actually
  // do http://localhost:5000/auth/google
  app.use(
    proxy(
      [
        '/api',
        '/auth/google',
        '/api/logout',
        '/face',
        '/api/current_user',
        '/api/strip',
        '/api/surveys'
      ],
      {
        target: 'http://localhost:5000'
      }
    )
  );
};

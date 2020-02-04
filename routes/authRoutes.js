const passport = require('passport');

module.exports = app => {
  app.get(
    '/auth/google',
    // the google here is what tells passport to use the GoogleStrategy (which is coming from a different library, not passport exactly)
    passport.authenticate('google', {
      scope: ['profile', 'email']
    })
  );

  app.get(
    '/auth/google/callback',
    passport.authenticate('google'),
    (req, res) => {
      // res.redirect('/surveys', console.log('auth/google/callback working'));
      res.redirect('/surveys');
    }
  );

  app.get(
    '/f',
    passport.authenticate('facebook', {
      scope: ['email']
    })
  );

  app.get('/face', passport.authenticate('facebook'), (req, res) => {
    res.redirect('/surveys');
  });

  app.get('/api/logout', (req, res) => {
    // logout comes from passport. It basically sets the cookie identifiying the user to "off"
    req.logout();
    res.redirect('/');
  });

  app.get('/api/current_user', (req, res) => {
    if (req.user == null || false) {
      console.log('no user logged');
      res.send(req.user);
    }
    // res.send(req.user, console.log('2. current user is fine'));
    res.send(req.user);
  });

  app.get('/face', (req, res) => {
    res.send(req.user);
  });
};

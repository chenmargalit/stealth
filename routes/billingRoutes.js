const keys = require('../config/keys');
const stripe = require('stripe')(keys.stripeSecretKey);
const requireLogin = require('../middlewares/requireLogin');

module.exports = app => {
  // when ever api/strip is accessed, call the requireLogin function. We can add as many middlewares as we want here, the only requierment is that one of these functions will actually process the request and send a response.
  app.post('/api/strip', requireLogin, async (req, res) => {
    console.log('/api/strip accessed successfully');
    if (!req.user) {
      return res.status(401).send({ error: 'you must log in' });
    }
    try {
      console.log('trying to add billingRoutes');
      console.log('user is', req.user);
      const charge = await stripe.charges.create({
        amount: 500,
        currency: 'usd',
        description: '5$ for 5 credits',
        source: req.body.id
      });
      // req.user is set up automatically by passport. Coming from the middlewares app.use(passport.initialize()), and app.use(passport.session())
      req.user.credits += 5;
      const user = await req.user.save();
      res.send(user);
    } catch (error) {
      console.log('problem with stripe', error);
    }
  });
};

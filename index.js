const express = require('express');
const mongoose = require('mongoose');
// gives passport the ability to use cookies
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
const path = require('path');
// two ways of using the authRoutes, either like these two lines here. Or, how we'll actually use it
// authRoutes(app);
// const authRoutes = require('./routes/authRoutes')
// this will activate the file, creating the model
require('./models/User');
require('./services/passport');

mongoose.connect(keys.mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const app = express();

// app.use is how we use middlewares with express. It does something to the object before it gets to the handlers, (req, res). In this case of bodyParser its going to parse the data, then send the parsED data to be available through req.body
app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days in micro seconds
    // used for encryption. cookieKey is just a random string I wrote.
    keys: [keys.cookieKey]
  })
);

app.use(passport.initialize());
app.use(passport.session());

// we're going to add configuration now so that if the client side asks for a route that WAS defined in the client side, but was NOT defined in the server side, it will use the client side to decide what to show.
// only work if we are in production

if (process.env.NODE_ENV === 'production') {
  // Express will run production files like main.js and main.css
  app.use(express.static('client/build'));
  // Express will run index.html file if it does not recognize the route
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// the require returns a function because thats how its defined in authRoutes
require('./routes/authRoutes')(app);
require('./routes/billingRoutes')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);

// next is what happens when the middleware is done, when we are finished with what we wanted to do
module.exports = (req, res, next) => {
  if (!req.user) {
    return res.status(401).send({ error: 'you must log in' });
  }
  next();
};

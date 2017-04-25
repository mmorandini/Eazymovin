const express    = require('express');
const router     = express.Router();


const properties    = require('../controllers/properties');
const registrations = require('../controllers/registrations');
const sessions      = require('../controllers/sessions');


//this function allows me to secure certain actions in the app to logged in users.
//in order to do so just call secureRoute after the verb.
function secureRoute(req, res, next) {
  if(!req.session.userId) {
    return req.session.regenerate(() => {
      req.flash('danger', 'You must be logged in to access.');
      res.redirect('/login');
    });
  }
  return next();
}



router.get('/', (req, res) => res.render('statics/home'));

router.route('/properties')
  .get(properties.index)
  .post(properties.index);
router.route('/properties/:id').get(properties.show);

router.route('/register')
  .get(registrations.new)
  .post(registrations.create);

router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/logout')
  .get(sessions.delete);


module.exports = router;

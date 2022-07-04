const router = require('express').Router();
// const { user } = require('../../Models');
const user = require("../../Models/user");


router.post('/', (req, res) => {
  user.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    password: req.body.password,
    pay_day: req.body.pay_day,
    monthly_income: req.body.monthly_income,
    checking: req.body.checking,
    savings: req.body.savings,
    credit_card: req.body.credit_card,
    new_checking: req.body.new_checking
  })
  .then(dbUserData => {
    req.session.save(() => {
      req.session.user_id = dbUserData.id;
      req.session.email = dbUserData.email;
      req.session.loggedIn = true;

      res.json(dbUserData);
    });
  })
  .catch(err => {
    console.log(err); 
    res.status(500).json(err);
  });
}); 

router.get('/', (req, res) => {
  user.findAll()
  .then(dbUserData => res.json(dbUserData))
  .catch(err => {
      console.log(err); 
      res.status(500).json(err);
  });
});


module.exports = router;
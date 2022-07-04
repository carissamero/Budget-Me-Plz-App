const router = require("express").Router();
const { Bills, User } = require("../../Models/index");

const bcrypt = require("bcrypt");

router.get("/users", (req, res) => {
  User.findAll()
    .then((dbUserData) => res.json(dbUserData))
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.post("/bills", (req, res) => {
  req.body.user_id = req.session.user_id;
  console.log(req.body);
  Bills.create(req.body);
  res
    .redirect("/")

    .then((newBill) => {
      res.json(newBill);
    })
    .catch((err) => res.json(err));
});

// router.post("/login", (req, res) => {
//   let email = req.body.email;
//   let password = req.body.password;

//   User.findAll({
//     where: {
//       email: email,
//     },
//   }).then((result) => {
//     if (result && result.length > 0) {
//       let u = result[0];
//       if (bcrypt.compareSync(password, u.password)) {
//         res.json({ auth: true });
//         return;
//       }
//     }
//     // incorrect password or username;
//     res.json({ auth: false });
//     return;
//   });
// });

router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    // Once the user successfully logs in, set up the sessions variable 'loggedIn'
    req.session.save(() => {
      req.session.loggedIn = true;

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now logged in!' });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// router.put('/accounts', (req, res) => {

//     Accounts.update()
//     .then((data) => {
//         res.json(data);
//     })
//     .catch((err) => res.json(err));

// });

router.delete("/bills", (req, res) => {
  Bills.destroy({
    where: {
      id: req.body.id,
    },
  })
    .then((deletedBills) => {
      res.json(deletedBills);
    })
    .catch((err) => res.json(err));
});

// router.delete('/debt', (req, res) => {
//     Debt.destroy({
//         where: {
//             name: req.body,
//         },
//     })
//         .then((deletedDebt) => {
//             res.json(deletedDebt);
//         })
//         .catch((err) => res.json(err));
// });

//////PUTS///////
router.put("/account", (req, res) => {
  if (req.body.name === "checking") {
    User.update(
      {
        checking: req.body.amount,
      },
      {
        where: {
          id: req.session.user_id,
        },
      }
    ).then((accountUpdate) => res.json(accountUpdate));
  } else if (req.body.name === "savings") {
    User.update(
      {
        savings: req.body.amount,
      },
      {
        where: {
          id: req.session.user_id,
        },
      }
    ).then((accountUpdate) => res.json(accountUpdate));
  } else if (req.body.name == "credit card") {
    User.update(
      {
        credit_card: req.body.amount,
      },
      {
        where: {
          id: req.session.user_id,
        },
      }
    ).then((accountUpdate) => res.json(accountUpdate));
  } else {
    console.log("error updating accounts");
  }
});

router.put("/savings-account", (req, res) => {
  Accounts.update(
    {
      amount: req.body.amount,
    },
    {
      where: {
        user_id: req.session.user_id,
        accounts_name: req.body.name,
      },
    }
  ).then((accountUpdate) => res.json(accountUpdate));
});

router.put("/cards", (req, res) => {
  Cards.update(
    {
      name: req.body.name,
      amount: req.body.amount,
      due_date: req.body.due_date,
    },
    {
      where: {
        cards_id: 1,
      },
    }
  ).then((cardUpdate) => res.json(cardUpdate));
});

router.put("/payday", (req, res) => {
  User.update(
    {
      payday: req.body.payday,
    },
    {
      where: {
        user_id: req.session.user_id,
      },
    }
  ).then((paydayUpdate) => res.json(paydayUpdate));
});

router.put("/income", (req, res) => {
  User.update(
    {
      income: req.body.income,
    },
    {
      where: {
        user_id: req.session.user_id,
      },
    }
  ).then((incomeUpdate) => res.json(incomeUpdate));
});

module.exports = router;

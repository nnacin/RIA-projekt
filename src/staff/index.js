const express = require('express');
const router = express.Router();
const request = require('request');
const moment = require('moment');
const bcrypt = require('bcrypt');
const debug = require('debug')('staff/index');

router.get('/', isLoggedIn , function (req, res)  {
  res.redirect('staff/orders');
});

// drinks
router.get('/drink', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.query.id;
  Adapter.getDrink(id, (e, r) => {
    res.render('staff/drink', { results: r });
  })
});

router.post('/drink', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.body.id;

  let name = req.body.name;
  let price = req.body.price;
  let quantity = req.body.quantity;

  if (id) {
    Adapter.editDrink(id, name, price, quantity, (e, r) => {
      res.redirect('drinks');
    });
  } else {
    Adapter.addDrink(name, price, quantity, (e, r) => {
      res.redirect('drinks');
    });
  }

});

router.get('/drinks', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  Adapter.getAllDrink((e, r) => {
    res.render('staff/drinks', { drinks: r });
  });
});

router.get('/deletedrink', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.query.id;
  Adapter.deleteDrink(id, (e, r) => {
    res.redirect('drinks');
  })
});
//end drinks


// employees
router.get('/employees', isLoggedInAdmin, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  Adapter.getAllEmployee((e, r) => {
    Adapter.getAllLocation((e, loc) => {
      res.render('staff/employees', { employees: r , locations: loc});
    })
  });
});

router.get('/employee', isLoggedInAdmin, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.query.id;
  Adapter.getEmployee(id, (e, r) => {
    Adapter.getAllLocation((e, loc) => {
      res.render('staff/employee', { results: r , locations: loc});
    })
  })
});

router.post('/employee', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.body.id;

  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let location = req.body.location;

  if (id) {
    let active = req.body.active;
    let admin = req.body.admin;
    let data = {
      id: id,
      firstName: firstName,
      lastName: lastName,
      email: email,
      location: location,
      active: active,
      admin: admin
    }
    Adapter.editEmployee(data, (e, r) => {
      res.redirect('employees');
    });
  } else {
    let username = req.body.username;
    let password = 'Pizzamins_staff';
    let password2 = 'Pizzamins_staff';
    Adapter.addEmployee(username, firstName, lastName, password, password2, email, location, (e, r) => {
      res.redirect('employees');
    });
  }
});
//end employees


//profile
router.get('/profile', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.query.id;
  Adapter.getEmployee(id, (e, r) => {
    res.render('staff/profile', { results: r });
  })
});

router.post('/profile', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.body.id;
  let firstName = req.body.firstName;
  let lastName = req.body.lastName;
  let email = req.body.email;
  let location = req.body.location;
  let active = req.body.active;
  let admin = req.body.admin;
  let data = {
    id: id,
    firstName: firstName,
    lastName: lastName,
    email: email,
    location: location,
    active: active,
    admin: admin
  }
  Adapter.editEmployee(data, (e, r) => {
    res.redirect('orders');
  })

});

//end profile

//change password
router.get('/changePassword', isLoggedIn, (req, res, next) => {
    res.render('staff/changePassword');
});

router.post('/changePassword', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.body.id;
  let password = req.body.password;
  let password2 = req.body.password2;
  let data = {
      id: id,
      password: password,
      password2: password2
  }
  Adapter.editEmployee(data, (e, r) => {
    res.redirect('orders');
  })

});
//end changepassword

//orders
router.get('/orders', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  Adapter.getAllOrder((e, r) => {
    r.forEach(function (order){
      order.dateFinished = moment(order.dateFinished).utcOffset('+0100').format("YYYY-MM-DD HH:mm:ss");
    });

    res.render('staff/orders', { orders: r , today: moment().utcOffset('+0100').format("YYYY-MM-DD HH:mm:ss")});
  });
});

router.get('/order', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.query.id;
  Adapter.getOrder(id, (e, r) => {
    r.forEach(function (order){
        order.dateFinished = moment(order.dateFinished).utcOffset('+0100').format("YYYY-MM-DD HH:mm:ss");
        order.dateCreated = moment(order.dateCreated).utcOffset('+0100').format("YYYY-MM-DD HH:mm:ss");
      });
    res.render('staff/order', { results: r });
  })
});

//end orders

//pizzas
router.get('/pizza', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.query.id;
  Adapter.getPizza(id, (e, r) => {
    res.render('staff/pizza', { results: r });
  })
});

router.post('/pizza', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.body.id;

  let name = req.body.name;
  let price = req.body.price;
  let ingredients = req.body.ingredients;

  if (id) {
    Adapter.editPizza(id, name, price, ingredients, (e, r) => {
      res.redirect('pizzas');
    });
  } else {
    Adapter.addPizza(name, price, ingredients, (e, r) => {
      res.redirect('pizzas');
    });
  }
});

router.get('/deletepizza', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.query.id;
  Adapter.deletePizza(id, (e, r) => {
    res.redirect('pizzas');
  })
});

router.get('/pizzas', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  Adapter.getAllPizza((e, r) => {
      res.render('staff/pizzas', { pizza: r });
  });
});
//end pizzas

//locations
router.get('/location', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.query.id;
  Adapter.getLocation(id, (e, r) => {
    res.render('staff/location', { results: r });
  })
});

router.post('/location', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.body.id;

  let name = req.body.name;
  let address = req.body.address;
  let city = req.body.city;
  let zipCode = req.body.zipCode;
  let phone = req.body.phone;
  let workHours = {
    'monday':     {
      'open':     req.body.monday[0],
      'close':    req.body.monday[1]
    }
  , 'tuesday':    {
      'open':     req.body.tuesday[0],
      'close':    req.body.tuesday[1]
    }
  , 'wednesday':  {
      'open':     req.body.wednesday[0],
      'close':    req.body.wednesday[1]
    }
  , 'thursday':   {
      'open':     req.body.thursday[0],
      'close':    req.body.thursday[1]
    }
  , 'friday':     {
      'open':     req.body.thursday[0],
      'close':    req.body.thursday[1]
    }
  , 'saturday':   {
      'open':     req.body.saturday[0],
      'close':    req.body.saturday[1]
    }
  , 'sunday':     {
      'open':     req.body.sunday[0],
      'close':    req.body.sunday[1]
    }
  }

  if (id) {
    Adapter.editLocation(id, name, address, city, zipCode, phone, workHours,  (e, r) => {
      res.redirect('locations');
    });

  } else {
    Adapter.addLocation(name, address, city, zipCode, phone, workHours,  (e, r) => {
      res.redirect('locations');
    });
  }
});

router.get('/deletelocation', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  let id = req.query.id;
  Adapter.deleteLocation(id, (e, r) => {
    res.redirect('locations');
  })
});

router.get('/locations', isLoggedIn, (req, res, next) => {
  const Adapter = req.app.get('adapter');
  Adapter.getAllLocation((e, r) => {
    res.render('staff/locations', { locations: r });
  });
});
//end location

function isLoggedIn(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user.active)
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/staff/login');
}

function isLoggedInAdmin(req, res, next) {
    // if user is authenticated in the session, carry on
    if (req.isAuthenticated() && req.user.active) {
      if (req.user.admin == true)
        return next();
    }

    // if they aren't redirect them to the home page
    res.redirect('/staff/orders');
}

module.exports = router;

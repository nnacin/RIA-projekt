const express = require('express');
const router = express.Router();
const request = require('request');
const moment = require('moment');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');
const ad = require('../adapter');
const Adapter = new ad();
const getAllPizza = Promise.promisify(Adapter.getAllPizza);
const getAllDrink = Promise.promisify(Adapter.getAllDrink);
const getAllLocation = Promise.promisify(Adapter.getAllLocation);
const getAllOrder = Promise.promisify(Adapter.getAllOrder);
const getAllEmployee = Promise.promisify(Adapter.getAllEmployee);
const debug = require('debug')('staff/index');

router.get('/', isLoggedIn , function (req, res)  {
  res.render('staff/orders');
});

// drinks
router.get('/drink', isLoggedIn, (req, res, next) => {
  const id = req.query.id;
  Adapter.getDrink(id, (e, r) => {
    res.render('staff/drink', { results: r });
  })
});

router.post('/drink', isLoggedIn, (req, res, next) => {
  const id = req.body.id;
  
  const name = req.body.name;
  const price = req.body.price;
  const quantity = req.body.quantity;
      
  if (id) {
      Adapter.editDrink(id, name, price, quantity, (e, r) => {
        res.redirect('drink?id=' + id);
      });
  } else {
      Adapter.addDrink(name, price, quantity, (e, r) => {
        res.redirect('drinks');
      });
  }
  
});

router.get('/drinks', isLoggedIn, (req, res, next) => {
    getAllDrink()
        .then(r => {
        res.render('staff/drinks', { drinks: r });
    });
});

router.get('/deletedrink', isLoggedIn, (req, res, next) => {
  const id = req.query.id;
  Adapter.deleteDrink(id, (e, r) => {
    res.redirect('drinks');
  })
});
//end drinks


// employees
router.get('/employees', isLoggedInAdmin, (req, res, next) => {
  getAllEmployee()
        .then(r => {
          getAllLocation().then(loc => {
            res.render('staff/employees', { employees: r , locations: loc});
          })
    });
});

router.get('/employee', isLoggedInAdmin, (req, res, next) => {
  const id = req.query.id;
  Adapter.getEmployee(id, (e, r) => {
    getAllLocation().then(loc => {
      res.render('staff/employee', { results: r , locations: loc});
    })
  })
});

//post route - not yet functional
router.post('/employee', isLoggedIn, (req, res, next) => {
  console.log(req.body);
  const id = req.body.id;
  
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const location = req.body.location;
  
  if (id) { 
    const active = req.body.active;
    const admin = req.body.admin;
    const data = {
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
    const username = req.body.username;
    const password = 'Pizzamins_staff';
    const password2 = 'Pizzamins_staff';
    Adapter.addEmployee(username, firstName, lastName, password, password2, email, location, (e, r) => {
      console.log(e);
      console.log(r);
      res.redirect('employees');
    });
  }
});
//end employees


//profile 
router.get('/profile', isLoggedIn, (req, res, next) => {
  const id = req.query.id;
  Adapter.getEmployee(id, (e, r) => {
    res.render('staff/profile', { results: r });
  })
});

router.post('/profile', isLoggedIn, (req, res, next) => {
  console.log(req.body);
  const id = req.body.id;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const location = req.body.location;
  const active = req.body.active;
  const admin = req.body.admin;
  const data = {
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
  const id = req.body.id;
  const password = req.body.password;
  const password2 = req.body.password2;
  const data = {
      id: id,
      password: password,
      password2: password2
  }
  console.log(data);
  Adapter.editEmployee(data, (e, r) => {
      console.log(e);
      console.log(r);
    res.redirect('orders');
  })

});
//end changepassword

//orders
router.get('/orders', isLoggedIn, (req, res, next) => {
  getAllOrder()
      .then(r => {
      r.forEach(function (order){
        order.dateFinished = moment(order.dateFinished).format("YYYY-MM-DD HH:mm:ss");
      });
      
      res.render('staff/orders', { orders: r , today: moment().utcOffset('+0100').format("YYYY-MM-DD HH:mm:ss")});
  });
});

router.get('/order', isLoggedIn, (req, res, next) => {
  const id = req.query.id;
  Adapter.getOrder(id, (e, r) => {
    r.forEach(function (order){
        order.dateFinished = moment(order.dateFinished).format("YYYY-MM-DD HH:mm:ss");
        order.dateCreated = moment(order.dateCreated).format("YYYY-MM-DD HH:mm:ss");
      });
    res.render('staff/order', { results: r });
  })
});

//end orders

//pizzas
router.get('/pizza', isLoggedIn, (req, res, next) => {
  const id = req.query.id;
  Adapter.getPizza(id, (e, r) => {
    res.render('staff/pizza', { results: r });
  })
});

router.post('/pizza', isLoggedIn, (req, res, next) => {
  const id = req.body.id;
  
  const name = req.body.name;
  const price = req.body.price;
  const ingredients = req.body.ingredients;
  
  if (id) {
    Adapter.editPizza(id, name, price, ingredients, (e, r) => {
      res.redirect('pizza?id=' + id);
    });
  } else {
    Adapter.addPizza(name, price, ingredients, (e, r) => {
      res.redirect('pizzas');
    });
  }
});

router.get('/deletepizza', isLoggedIn, (req, res, next) => {
  const id = req.query.id;
  Adapter.deletePizza(id, (e, r) => {
    res.redirect('pizzas');
  })
});

router.get('/pizzas', isLoggedIn, (req, res, next) => {
    getAllPizza()
        .then(r => {
        res.render('staff/pizzas', { pizza: r });
    });
});
//end pizzas

//locations
router.get('/location', isLoggedIn, (req, res, next) => {
  const id = req.query.id;
  Adapter.getLocation(id, (e, r) => {
    res.render('staff/location', { results: r });
  })
});

router.post('/location', isLoggedIn, (req, res, next) => {
  const id = req.body.id;
  
  const name = req.body.name;
  const address = req.body.address;
  const city = req.body.city;
  const zipCode = req.body.zipCode;
  const phone = req.body.phone;
  const workHours = {
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
  const id = req.query.id;
  Adapter.deleteLocation(id, (e, r) => {
    res.redirect('locations');
  })
});

router.get('/locations', isLoggedIn, (req, res, next) => {
    getAllLocation()
        .then(r => {
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

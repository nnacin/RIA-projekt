const creds = require('../creds');
const request = require('request');
const debug = require('debug')('adapter');

const baseURL = creds.api_url;

const endpoints = {
    HOME: baseURL
  , PIZZA: baseURL +        "pizza"
  , DRINK: baseURL +        "drink"
  , USER: baseURL +         "user"
  , ORDER: baseURL +        "order"
  , LOCATION: baseURL +     "location"
  , EMPLOYEE: baseURL +     "employee"
};

function Adapter() {

}

/* PIZZA */
Adapter.prototype.getPizza = (id, callback) => {
  let data = { id: id };
  query(endpoints.PIZZA, 'GET', data, callback);
}

Adapter.prototype.getAllPizza = (callback) => {
  let data = {};
  query(endpoints.PIZZA, 'GET', data, callback);
}

Adapter.prototype.addPizza = (name, price, ingredients, callback) => {
  let data = {name: name, price: price, ingredients: ingredients};
  query(endpoints.PIZZA, 'POST', data, callback);
}

Adapter.prototype.editPizza = (id, name, price, ingredients, callback) => {
  let data = {id: id, name: name, price: price, ingredients: ingredients};
  query(endpoints.PIZZA, 'PUT', data, callback);
}

Adapter.prototype.deletePizza = (id, callback) => {
  let data = {id: id};
  query(endpoints.PIZZA, 'DELETE', data, callback);
}

/* DRINKS */
Adapter.prototype.getDrink = (id, callback) => {
  let data = { id: id };
  query(endpoints.DRINK, 'GET', data, callback);
}

Adapter.prototype.getAllDrink = (callback) => {
  let data = {};
  query(endpoints.DRINK, 'GET', data, callback);
}

Adapter.prototype.addDrink = (name, price, quantity, callback) => {
  let data = {name: name, price: price, quantity: quantity};
  query(endpoints.DRINK, 'POST', data, callback);
}

Adapter.prototype.editDrink = (id, name, price, quantity, callback) => {
  let data = {id: id, name: name, price: price, quantity: quantity};
  query(endpoints.DRINK, 'PUT', data, callback);
}

Adapter.prototype.deleteDrink = (id, callback) => {
  let data = {id: id};
  query(endpoints.DRINK, 'DELETE', data, callback);
}

/*LOCATION*/
Adapter.prototype.getLocation = (id, callback) => {
  let data = { id: id };
  query(endpoints.LOCATION, 'GET', data, callback);
}

Adapter.prototype.getAllLocation = (callback) => {
  let data = {};
  query(endpoints.LOCATION, 'GET', data, callback);
}

Adapter.prototype.addLocation = (name, address, city, zipCode, phone, workHours, callback) => {
  let data = {name: name, address: address, city: city, zipCode: zipCode, phone:phone, workHours: workHours};
  query(endpoints.LOCATION, 'POST', data, callback);
}

Adapter.prototype.editLocation = (id, name, address, city, zipCode, phone, workHours, callback) => {
  let data = {id: id, name: name, address: address, city: city, zipCode: zipCode, phone: phone, workHours: workHours};
  query(endpoints.LOCATION, 'PUT', data, callback);
}

Adapter.prototype.deleteLocation = (id, callback) => {
  let data = {id: id};
  query(endpoints.LOCATION, 'DELETE', data, callback);
}

/*USER*/
Adapter.prototype.getUser = (id, callback) => {
  let data = {id: id};
  query(endpoints.USER, 'GET', data, callback);
}

Adapter.prototype.getUserByUsername = (username, callback) => {
  let data = {username: username};
  query(endpoints.USER, 'GET', data, callback);
}

Adapter.prototype.addUser = (username, firstName, lastName, password, password2, email, phone, birthday, address, city, zipCode, callback) => {
  let data = {username: username, firstName: firstName, lastName: lastName, password: password, password2:password2, email: email, phone: phone, birthday: birthday, address: address, city: city, zipCode: zipCode};
  query(endpoints.USER, 'POST', data, callback);
}

Adapter.prototype.editUser = (data, callback) => {
  query(endpoints.USER, 'PUT', data, callback);
}

/*EMPLOYEE*/
Adapter.prototype.getEmployee = (id, callback) => {
  let data = {id: id};
  query(endpoints.EMPLOYEE, 'GET', data, callback);
}

Adapter.prototype.getEmployeeByUsername = (username, callback) => {
  let data = {username: username};
  query(endpoints.EMPLOYEE, 'GET', data, callback);
}

Adapter.prototype.getAllEmployee = (callback) => {
  let data = {};
  query(endpoints.EMPLOYEE, 'GET', data, callback);
};

Adapter.prototype.editEmployee = (id, firstName, lastName, email, location, active, admin, callback) => {
  let data = {id: id, firstName: firstName, lastName: lastName, email: email, location: location, active: active, admin: admin};
  query(endpoints.EMPLOYEE, 'PUT', data, callback);
}

/*ORDER*/
Adapter.prototype.getOrder = (id, callback) => {
  let data = {id: id};
  query(endpoints.ORDER, 'GET', data, callback);
}

Adapter.prototype.getAllOrder = (callback) => {
  let data = {};
  query(endpoints.ORDER, 'GET', data, callback);
}

Adapter.prototype.getUserOrder = (id, callback) => {
  let data = {id: id};
  query(endpoints.ORDER, 'GET', data, callback);
}

Adapter.prototype.addOrder = (data, callback) => {
  query(endpoints.ORDER, 'POST', data, callback);
}

function query(url, verb, data, callback) {
  let options = {
    uri: url,
    method: verb,
    auth: creds.api_authorization.auth,
    json: true
  }
  if (verb.toLowerCase() === 'get')
    options.qs = data;
  else
    options.form = data;
  request(options, (e, r, body) => {
      if (e) callback(e, null);
      callback(null, body);
  });
}

module.exports = Adapter;

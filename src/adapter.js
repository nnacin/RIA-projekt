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
};

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

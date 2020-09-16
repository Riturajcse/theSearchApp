const request = require('request');
const config = require('config');
const _ = require('lodash');
const apiKey = config.get('yelpKey');

const BASE_URL = 'https://api.yelp.com/v3/businesses/'
const options = {
  'method': 'GET',
  'url': '',
  'headers': {
    'Authorization': 'Bearer ' + apiKey
  }
};

exports.search = async function(payload) {
  return new Promise((resolve, reject) => {
    const {term, location} = payload;
    options.url = BASE_URL + 'search?term=' + term + '&location=' + location;
    request(options, function (error, response) {
      if (error) {
        reject(error);
      }
      resolve(response.body)
    });
  }) 
};

exports.fetchBusiness = async function(payload) {
  return new Promise((resolve, reject) => {
    const {businessId} = payload;
    options.url = BASE_URL + businessId;
    request(options, function (error, response) {
      if (error) {
        reject(error);
      }
      resolve(response.body)
    });
  }) 
};

exports.fetchBusinessReviews = async function(payload) {
  return new Promise((resolve, reject) => {
    const {businessId} = payload;
    options.url = BASE_URL + businessId + '/reviews';
    request(options, function (error, response) {
      if (error) {
        reject(error);
      }
      resolve(response.body)
    });
  }) 
};

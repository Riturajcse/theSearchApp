const _ = require('lodash');
const YelpApiClient = require('../utils/YelpApiClient');

exports.getBusinessById = async function(req, res) {
  const {id} = req.body;
  if (!id ) {
    return res.status(400).send('Id is required');
  }
  try {
      const payload = {id}
      const response = await YelpApiClient.fetchBusiness(payload);
      res.status(200).send(JSON.parse(response));
  } catch(err) {
      return res.status(400).send({error: err.message});
  }
}

exports.getBusinessReviews = async function(req, res) {
  const {id} = req.body;
  if (!id ) {
    return res.status(400).send('Id is required');
  }
  try {
      const payload = {businessId:id}
      const response = await YelpApiClient.fetchBusinessReviews(payload);
      let resObject = [];
      JSON.parse(response).reviews.forEach(review => {
        let tempObj = {
          id: review.id,
          userName: review.user.name,
          userImage: review.user.image_url,
          text: review.text,
          rating: review.rating,
          createdAt: review.time_created
        }
        resObject.push(tempObj)
      });
      resObject = _.orderBy(resObject, ['createdAt'],['desc']);
      res.status(200).send(resObject);
  } catch(err) {
      return res.status(400).send({error: err.message});
  }
}

exports.searchBusiness = async function(req, res) {
    const {name, location} = req.body;

    if (!name || !location) {
      return res.status(400).send('Name and location are required');
    }
    try {
        const payload = {
          term: name,
          location: location
        }
        const response = await YelpApiClient.search(payload);
        let resObject = [];
        JSON.parse(response).businesses.forEach(element => {
          let tempObj = {
            id: element.id,
            name: element.name,
            image: element.image_url,
            rating: element.rating,
            reviews: element.review_count,
            address: element.location.display_address.join(", ")
          }
          resObject.push(tempObj)
        });
        resObject = _.orderBy(resObject, ['rating'],['desc']);
        res.status(200).send(resObject);
    } catch(err) {
        return res.status(400).send({error: err.message});
    }
};


<h1>Eazymovin</h1>
<img src="https://raw.githubusercontent.com/mmorandini/wdi-project-2/master/src/images/eazymovin-home.png">

<h2>Genesis</h2>

<p>I'd built this app as my second project for the 
Web developmet course at GA London. </p>

<p>The idea came from the fact the I have always found the home searching process quite hard, especially because most of the flats I viewed turned out to be much worse than they seemed to be on the adverts.</p>

<p>I therefore thought that adding a rating system to process would have saved a lot of time to home-searchers</p>

<p>The app is built using Embedded Javascript for the front-end and Node.js for the back-end, and relies on the Zoopla.com API for the actual property search.</p>

<h2>Planning</h2>

Before I started coding I defined the key-points to work on:

- Get the external API to work.
- Create models for the back-end (user and property).
- Create routes.
- Create controllers.
- Set up user's authentication.
- Give it a professional look.

<h2>Development</h2>

After having set my plan of action I started working on each of the points individually.

The property search happens everytime the user makes a search; By submitting the search form, the user makes a POST request to the server, which fires the `propertiesCreate()` function in the `properties` controller.

```
function propertiesCreate(req, res) {
  Property.collection.drop();

  var request = {
    uri: `http://api.zoopla.co.uk/api/v1/property_listings.json?area=${req.body.postcode}&listing_status=rent&minimum_price=${req.body.min_price}&maximum_price=${req.body.max_price}&page_size=50`,
    qs: {
      api_key: '98t26raku5vfxj6zvdrtq9rr'
    },
    headers: {
      'User-Agent': 'Request-Promise'
    },
    json: true
  };

  rp(request)
  .then(function (requestOutput) {
    console.log(requestOutput)
    return requestOutput.listing.map(property => {
      return{
        address: property.displayable_address,
        bedrooms: property.num_bedrooms,
        ppw: property.rental_prices.per_week,
        description: property.description,
        imageUrl: property.image_645_430_url,
        postcode: property.outcode,
        property_type: property.property_type,
        agent: property.agent_name,
        agent_logo: property.agent_logo,
        phone: property.agent_phone,
        coords: {
          lat: property.latitude,
          long: property.longitude
        }
      };
    });
  })
  .then(properties => {
    return Property.create(properties);
  })
  .then(properties => {
    console.log(`${properties.length} properties were created!`);

    res.render('properties/index', { properties, query: req.body.postcode });
  })
  .catch(err => {
    console.log(`Error: ${err}`);
  });
}

``` 
I have used <a href="https://github.com/request/request-promise">request-promise</a> to map each property that was returned by the API call, and stored them in the database, keeping only the data I needed.

The property objects are now ready to be rendered in the template.


For the rating functionality I have created a referenced document in the property model which will be updated each time the user rates a property by pushing the rating value in the Array of ratings referenced in the property model.

```
function propertiesRate (req, res, next){
  Property
    .findById(req.params.id)
    .exec()
    .then(property => {
      if (!property ) {
        const err = new Error('Property not found');
        err.status = 404;
        throw err;
      }
      console.log(req.body);
      const rating = {
        user: res.locals.user._id,
        value: req.body.rate
      };

      property.ratings.push(rating);

      return property.save();
    })
    .then((property) => {
      console.log(property);
      res.redirect(`/properties/${req.params.id}`);
    })
    .catch(next);
}

```

<h2>Styling</h2>

For the styling I've used Bootstrap 3 because I wanted something clean and professional looking and I still haven't found anything better of Bootstrap for this purposes, even though I'm not a great fan of the rigidity of its patterns.

<h2>Technologies</h2>

 - ES6 Javascript
 - jQuery
 - CSS3
 - HTML5
 - Embedded javascript
 - Bootstrap 3
 - Node.js
 - Express
 - Mongodb
 - Mongoose
 - Request-promise
 - 
 
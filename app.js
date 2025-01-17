const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index.hbs');
});

app.get('/beers', (req, res) => {
  // let beerList = beer
  punkAPI.getBeers()
  .then((beersFromApi) => {
    console.log(beersFromApi)
    res.render("beers.hbs", {
      beers: beersFromApi
    })
  })
  .catch((error) => {
   console.log(error)})
      
  })




app.get('/random-beer', (req, res) => {

  punkAPI.getRandom()
  .then((responseFromApi) => {
    console.log(responseFromApi)
    res.render("random-beer.hbs", {
      beer: responseFromApi[0]
    })
  })
  .catch((error) => {
   console.log(error)})
      
  })

  app.get('/random-beer/:beers', (req, res) => {

    punkAPI.getBeer(req.params.beers)

    .then((beersFromApi) => {
      console.log(beersFromApi)
      res.render("random-beer.hbs", {
        beer: beersFromApi[0]
      })
    })
    .catch((error) => {
     console.log(error)})
        
    })
  


app.listen(3000, () => console.log('🏃‍ on port 3000'));

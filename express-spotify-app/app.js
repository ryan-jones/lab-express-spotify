const SpotifyWebApi   = require('spotify-web-api-node');
const spotify         = new SpotifyWebApi();
const express         = require('express');
const expressLayouts = require('express-ejs-layouts');
const bodyParser      =require('body-parser');
const morgan          =require('morgan');

let app = express();

app.use(express.static('public'));
// app.use(expressLayouts);
// app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use( morgan(`dev`));


app.get('/', (req, res, next) => {
  res.render('home');
});

app.post('/artists', (req, res, next) => {
  spotify.searchArtists(req.body.name, {}, (err, data) => {
    if (err) throw err;

    let artists = data.body.artists.items;
    console.log(artists);
    // Render after the data from spotify has returned
    res.render('artists', {artists});
  });
});

app.listen(3000, () => {
  console.log('My first app listening on port 3000!');
});

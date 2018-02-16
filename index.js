// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
const path = require('path')
const PORT = process.env.PORT || 5000

var listpets = require('./routers/listpets');

/* Create list pets api */
app.use('/api/pets', listpets);

app.use('/api/pets/:pet_id', listpets);

app.listen(PORT, () => console.log(`Listening on ${ PORT }`))

var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var app = express();
var pg = require('pg');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// define the home page route
router.get('/', function(req, res) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM pets_prod', function(err, result){
			done();
			if(err) {
				console.error(err);
				response.send("Error " + err);
			} else{
				// Website you wish to allow to connect
    			res.setHeader('Access-Control-Allow-Origin', '*');

    			// Request methods you wish to allow
    			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
				res.end(JSON.stringify(result.rows));
			}
		});
	});
});

// get a single pet
router.get('/:pet_id', function(req, res) {
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('SELECT * FROM pets_prod where id = ' + req.params.pet_id, function(err, result){
			done();
			if(err) {
				console.error(err);
				res.send("Error " + err);
			} else{
				// Website you wish to allow to connect
    			res.setHeader('Access-Control-Allow-Origin', '*');

    			// Request methods you wish to allow
    			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
				res.end(JSON.stringify(result.rows));
			}
		});
	});
});


var urlencodedParser = bodyParser.urlencoded({ extended: false})

// create a pet record
router.post('/', urlencodedParser, function(req, res) {
	console.log(req.body);
	// console.log(req.body.pet_name + ", " + req.body.pet_type + ", " + req.body.pet_breed + ", "
	// 	+ req.body.pet_location + ", " + req.body.pet_latitude + ", " + req.body.pet_longitude);
	
	// 

	/*
		First check exist or not and Validate the location 	(Leave it for next version).
	*/

	// connect to db and insert the value
	pg.connect(process.env.DATABASE_URL, function(err, client, done) {
		client.query('Insert into pets_prod (name, type, breed, location, lat, long) values ($1, $2, $3, $4, $5, $6)', [req.body.pet_name, req.body.pet_type, req.body.pet_breed,req.body.pet_location, req.body.pet_latitude, req.body.pet_longitude], function(err, result){
			done();
			if(err) {
				console.error(err);
				res.send("Error " + err);
			} else{
				console.log("success");
				res.redirect('https://protected-chamber-33421.herokuapp.com/');
			}
		});
	});

});

module.exports = router;









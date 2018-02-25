// Small-Neo
// Hack - CU

// Include the needed middleware
var express = require('express');
var handlebars = require('express-handlebars').create({defaultLayout: 'main'});
var bodyParser = require('body-parser');

// Build the application
var app = express();

// For the path to the public folder in the express fild tree
app.use(express.static(__dirname + '/public'));

// set up the application
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000); // TODO - Change on engineering server

// set up the body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ---------------
// Get the NEON-JS modules
// ---------------
var neon_js = require('@cityofzion/neon-js');

// Semantic Style by using default import
var Neon = neon_js.default;
const query = Neon.create.query();

// Named imports are available too
var wallet = neon_js.wallet;
var tx = neon_js.tx;

//console.log("------\nThe Wallet object\n---------");
//console.log(wallet);

const privateKey = wallet.generatePrivateKey(); 
// console.log("------\nPrivate key\n---------");
// console.log(privateKey);

const publicKey = wallet.getPublicKeyFromPrivateKey(privateKey);
// console.log("------\n The public key\n---------");
// console.log(publicKey);

const scriptHash = wallet.getScriptHashFromPublicKey(publicKey); 
// console.log("------\nscript Hash\n---------");
// console.log(scriptHash);

const address = wallet.getAddressFromScriptHash(scriptHash);
// console.log("------\nThe address\n---------");
// console.log(address);

console.log(address);

var balance;

// Get the balance method
neon_js.api.neoscan.getBalance('http://localhost:4000/api/main_net', address)
	.then(function(res){
		console.log(res);
		balance = res;
	}).catch(function(err){
		console.log(err);
	});

neon_js.
// neon_js.api.sendAsset({ 
// 	"balance": balance, // Need this?
// 	"privateKey": "KxDgvEKzgSBPPfuVfw67oPQBSjidEiqTHURKSDL1R7yGaGYAeYnr",
// 	"intents": neon_js.api.makeIntent( {"NEO": 1}, address ),
// 	"url": "localhost:30333" // Change to google server
// }).then(function(res){
// 	console.log(res);
// });
/*
const account = new wallet.Account(privateKey)

const account = Neon.create.account('L1QqQJnpBwbsPGAuutuzPTac8piqvbR1HRjrY5qHup48TBCBFe4g');
Neon.create.query({method: 'getrawtransaction', params: ['bfb3af8bc96ae3dd85305eddfe6e8b8eca447315729073f30da64f80c16f66ac']})
	.execute(Neon.CONST.DEFAULT_RPC.MAIN)
	.then((res) => {
  	console.log(Neon.serialize.tx(res.result));
});

Neon.api.getBalance("TestNet", account.address).then((response) => {
  	console.log(response);
});
*/

// ---------------
// The home page
// ---------------
app.get('/', function(req, res){

	// Display the home page
	res.render('home');
});

// --- Server functions ----
// -------------------------
// The route (404) error handler
app.use(function(req, res){
	res.status(404);
	res.render('404');
});

// The server (500) error handler
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500');
});

// Start the application on the 
app.listen(app.get('port'), function(){
	console.log('Express started on port:' + app.get('port'));
});
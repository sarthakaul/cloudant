var express = require('express');

var PORT;
var Cloudant = require('@cloudant/cloudant');


if (process.env.PORT) {
  PORT = process.env.PORT;
} else {
  PORT = 8000;
}
var Cloudant = require('@cloudant/cloudant');
var url = "https://apikey-v2-19g4u8topavj3qd0fu0qd2jnhymz47qbrky98jmvi1ue:8eb2e9e2e31347448a4cf2339118b0c3@52f40164-b5dc-4b9e-81f3-2d3f2702e60c-bluemix.cloudantnosqldb.appdomain.cloud";
var username = "apikey-v2-19g4u8topavj3qd0fu0qd2jnhymz47qbrky98jmvi1ue";
var password = "8eb2e9e2e31347448a4cf2339118b0c3";
var app = express();
const bodyParser = require('body-parser');
//const cors = require('cors');
//app.use(cors());
// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});
////////////
app.post('/insert', (req, res) => {

  const { name, email, database } = req.body;
  
  const data = {
      name: name,
      email: email
  };
///////
Cloudant({ url: url, username: username, password: password }, function(err, cloudant, pong) {
  if (err) {
    return console.log('Failed to initialize Cloudant: ' + err.message);
  }
console.log(pong); // {"couchdb":"Welcome","version": ..

cloudant.use(database).insert({ "name": name, "email": email } , (err, data) => {
      if (err) {
        res.send(err);
      } else {
        res.send(data); // { ok: true, id: 'rabbit', ...
      }
    });
});

});


app.listen(PORT);
//console.log(message.getPortMessage() + PORT);




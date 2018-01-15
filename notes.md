# Notes on MEAN-Stack: 
MEAN : Angular-CLI, MongoDB, ExpressJS, Node.js.
This will the note when the author learned from the following tutorials. The tutorials are quite good and help the author to start to master web app development with MEAN Stack.

## Some Trouble shots:
1. it cant play the video, e.g., youttube vode. Change the url by replacing  "/watch" by "/embed". The reason is the "/embed" endpoint allows outside requests, whereas the "/watch" endpoint does not

## How to develop a web app with Mean 2018 Jan 12
This blog will step-by-step break down the original project to shwo how to develop such a project.

Tutorials (24) :  https://www.youtube.com/watch?v=HznzUUMyV1Q&list=PLC3y8-rFHvwj200LLotCYum_9wmGeTJx9&index=15
Source: https://github.com/gopinav/MEAN-Stack-Angular-CLI-/tree/master/ngApp

MEAN:
- Angular CLI
- Express server
- Connect angular with express
- MongoDB
- REST APIs

###  1. Install Node.js 
```
$ node -v
$ nom -v
```
### 2. install Angluar CLI 
```
$ npm install -g @angular/cli
$ ng -v
```

### 3. Create a new Angular CLI project with routhing
```
// create a new project with routing, called "Mockup"
$ ng new MockUp --routing

$ cd MockUp

// option “-o” open application in browser, "http://localhost:4200"
$ ng serve -o

//similar to the command "ng serve", "ng bulid" creates a dis folder of entire angular application 
// and this distributable folder will be fed into the Express server
$ ng build
```
### 4. install express and dependencies, 
express is the server and body parser is the middleware to handle data from server


```
$ npm install --save express body-parser
```
### 5. Intellij IDE is the code editor, open this project and create "server.js"
```
// incude the required packages, Express, body-parser, 
const express = require('express');
const bodyParser = require('body-parser');
//built-in app module, which is a better alternative than string concatenation when joining paths
const path = require('path');

// declare the routes of this application, and declear the port for this server
const api = require('./server/routes/api');
const port = 3000;

//create an instance of Express
const app = express();

// app.use() to specify the folder where all angular code is placed; This will give Express the access to the 
//distributable  folder
app.use(express.static(path.join(__dirname, 'dist')));

//for bodyParser:
// urlencoded extended is set as true, this basically passed the text as URL encoded data
app.use(bodyParser.urlencoded({extended: true}));
//it parse the text as json
app.use(bodyParser.json());

// teach Express when to use the api 
app.use('/api', api);

// for the other routes, the server has to render the index.html page in the distributable folder 
// app.get() for any matching path with wid-card "*", 
// we are going to send the index.html into the distributable folder, 
// now if you look at your browser "localhost:3000", Express knows it has to serve index.html, 
// similarly for the routes as "localhost:3000/api"
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'));
});

// this app listens the request on port 
app.listen(port, function(){
  console.log("Server running on localhost:" + port);
});
``` 
#### .create /server/routes/api.js
```
const express = require('express');
// get a hold of Express router, then for any incoming requests we are going to send back a string "api works"
const router = express.Router();

router.get('/', function(req, res){
 res.send('api works')
  });

// export the router
module.exports = router;

``` 
#### .run Express server, check the broswer at "localhost:3000/api" to see the string "api works"
```
$ node server
```

### 6. ongodb & mLab (online Mongodb server)
1. create mLab an accound 
2. create the Mongodb to import Mockup Modell documents into it 

```
e.g., collection "model" of mongodb "mockup"

```
### 7. REST APIs
whenever a user makes a request to the server, e.g., post or delete operation, the server needs to interact with MongoDB to perform the required operations. For this interaction, we use Mongoose. 

Monhoose is another npm package that provides Mongodb object mapping,:; Mongoose translate data in mongodb database to a javascript for web app. Similar to Mongo JS or native Mongo client.

#### . install mongoose package
```
npm install --save mongoose
```
then, we need to have a blueprint or a schema of the mongodb object in the database, so create a folder "models" inside server folder, create a file "modell.js"

```
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//the blueprint of the object in mongodb "mockup" collection "modell"
const modellSchema = new Schema({
  _id: String,
  Kriterium: String,
  Beschreibung: String,
  Ausprägung_0: String,
...
});

// module system of node.js
// mongoose.model creates a model
// the first argument is model name, going to represent the modellSchema
// the third argument is the collection name in your mongodb
module.exports = mongoose.model('mdl', modellSchema, 'modell')

```
the created mongoose model can be used to create read update and delete documents in the mongodb collection.

#### . connect to Mongodb database

all database requests are going to be managed in the api route; the connection happens in this api.js as well. 
### Mongoose

### postman

### Angular CLI

### Tips:
- debugging JavaScript at Chrome, "View -> Developer -> JavaScript Console"
- Json file online validation tool,  https://jsonlint.com/
- JSFiddle is a nice place to test HTML, css, and JS altegother, https://jsfiddle.net/hu57nnbo/7/
- Formatting text:  https://help.github.com/articles/basic-writing-and-formatting-syntax/#quoting-code

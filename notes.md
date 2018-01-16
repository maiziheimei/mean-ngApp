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
$ npm -v
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
### 4. install Express and dependencies, 
Express is the server and body parser is the middleware to handle data from server

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

### 6. create Mongodb at mLab (online Mongodb server)
1. create mLab an accound, https://mlab.com/databases/mockup#collections
2. create the Mongodb to import Mockup Modell documents into it 

```
e.g., collection "model" of mongodb "mockup"

```
### 7. REST APIs
whenever a user makes a request to the server, e.g., post or delete operation, the server needs to interact with MongoDB to perform the required operations. For this interaction, we use Mongoose. 

**Monhoose** is another npm package that provides Mongodb object mapping; Mongoose translates data inside of a mongodb database to a javascript for web app. Similar to Mongo JS or native Mongo client.

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
  //...
});

// module system of node.js
// mongoose.model creates a model
// the first argument is model name, "modell.js", going to represent the modellSchema
// the third argument is the collection name in your mongodb
module.exports = mongoose.model('modell', modellSchema, 'modell')

```
the created mongoose model can be used to create read update and delete documents in the mongodb collection.

#### . connect to Mongodb database

all database requests are going to be managed in the api route; the connection happens in this *api.js* as well. 

```
const express = require('express');
// get a hold of Express router, then for any incoming requests we are going to send back a string "api works"
const router = express.Router();

const mongoose = require('mongoose');

const db = "mongodb://<dbuser>:<dbpassword>@ds247347.mlab.com:47347/mockup";

//to adviod any warning that Mongoose is going to throw
mongoose.Promise = global.Promise;
//connect to the dababase using mongoose connect and pass the db string
mongoose.connect(db, function(err){
  if(err){
    console.error("Error! " + err);
  }
})


router.get('/', function(req, res){
  res.send('api works')
});


// export the router
module.exports = router;
```
Now you can make a request to "localhost:3000/api", from the console there is no error, that shows the db connection is successfully established to the database. 

The following will show how to code the restful API is to create read, update, delete documents from the database and also simultaneously test using Postman.

// It happens that the author's collecton file called "modell" in the mongodb.

From "modell.js" exports the "modell" model. Therefore, importing it into "api.js". Mongoose provide CRUD operatuions.
```
const express = require('express');
// get a hold of Express router, then for any incoming requests we are going to send back a string "api works"
const router = express.Router();

const mongoose = require('mongoose');
const mdl = require('../models/modell');


const db = "mongodb://root:password@ds247347.mlab.com:47347/mockup";

mongoose.Promise = global.Promise;

mongoose.connect(db, function(err){
  if(err){
    console.error("Error! " + err);
  }
});

router.get('/models', function(req, res){
  console.log('Get request for all models');
  mdl.find({})
    .exec(function(err, mdls){
      if (err){
        console.log("Error retrieving models");
      }else {
        res.json(mdls);
      }
    });
});

// export the router
module.exports = router;

```
from the broswer "http://localhost:3000/api/models", you can see all the retrived modell documents. If we want to get a specific document by its id, add the following request into file "api.js",

```
router.get('/models/:id', function(req, res){
  console.log('Get request for a single video');
  mdl.findById(req.params.id)
    .exec(function(err, mdl){
      if (err){
        console.log("Error retrieving video");
      }else {
        res.json(mdl);
      }
    });
});

```
for example: http://localhost:3000/api/models/1

### postman
Postman is a Chrome extension, to test http requests (e.g., get, post, put, delete, update, ...) in an easy way.

download Postman, launch postman app, ...
#### .post a new data into database

inser the followign code into *api.js*
```
router.post('/model', function (req, res) {
  console.log('post a new model');
  var newModel = new mdl();
  newModel._id = req.body._id;
  newModel.Kriterium = req.body.Kriterium;
  newModel.Beschreibung = req.body.Beschreibung;
  newModel.IT = req.body.IT;
  newModel.Auspraegung_0 = req.body.Auspraegung_0;
  newModel.save(function(err, insertModel){
    if(err){
      console.log('Error saving new model');

    }else{
      res.json(insertModel);
    }
  });
});
```
**Problem needed to solve is**, the *modell.js* object's attribute name can be contain "ä", ...

to test the post operation in Posmann to see if it works.

#### . update and delete a model by ID

```
//update video by its id
router.put('/model/:id', function(req, res){
  console.log('Update a model');
  mdl.findByIdAndUpdate(req.params.id,
    {
      $set: { _id: req.body._id,  Kriterium: req.body.Kriterium, Beschreibung: req.body.Beschreibung}
    },
    {
      new: true
    },
    function(err, updatedModel){
      if(err)
      {
        res.send("Error updating model");
      }else
        {
        res.json(updatedModel);
        }
    });
});

router.delete('/model/:id',function(req,res){
  console.log('Delete a model');
  mdl.findByIdAndRemove(req.params.id, function(err, deletedModel){
    if(err) {
      res.send("Error deleting model");
    }else{
      res.json(deletedModel);
    }
  });
});

```

### Frontend for Mongodb CRUD operations by Angular CLI

#### . Angular Routing

create different conpoments, setup the corresponding route along the UI to navigate to those routes.

- create a *home* and *modell-center* conpment
```
ng g c home
ng g c modell-center

ng g c modelList
ng g c modelDetail
```
- open *app-routing.module.ts*, add the paths and also import *HomeComponent* and *ModellCenterComponet*

```
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ModellCenterComponent} from './modell-center/modell-center.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'models', component: ModellCenterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

```
#### . for stylying -- install bootstrap

```
npm install --save bootstrap
```
to use bootsrap by opening *.angular-cli.json*, add the path to bootsrap to the styles value

```
"styles": [
        "styles.css",
        "../node_modules/bootstrap/dist/css/bootstrap.min.css"
      ],
```
#### .create UI
change the  *app.component.html*,
```
<nav class = "navbar navbar-inverse">
  <div class="container-fluid">
    <div class=" navbar-header">
      <a class="navbar-brand" href="#"> Mockup Modell</a>
    </div>

    <ul class="nav navbar-nav">
      <li> <a routerLink="/home" routerLinkActive="active"> Home</a> </li>
      <li> <a routerLink="/models" routerLinkActive="active"> Model List</a> </li>
    </ul>
  </div>
</nav>

<div class="container">
  <router-outlet></router-outlet>
</div>
```
we could check the current UI, first run build, then check *localhost:3000/home* and *localhost:3000/models*
```
ng build
```
#### . nest model-list and model-detail to model center

edit *modell-center.component.html*
```
<div class="row">
  <div class="col-sm-9">
    <model-detail></model-detail>
  </div>

  <div class="col-sm-3">
    <model-list></model-list>
  </div>
</div>
```
####. displaying Model list

- creat a angluar class *src/app/modell.ts*
```
ng g cl modell
```
edit *modell.ts*
```
export class Modell {
  _id: string;
  Kriterium: string;
  Beschreibung: string;
  Auspraegung_0: String;
  // Ausprägung_1: string;
  // Ausprägung_2: String;
  // Ausprägung_3: string;
  // Ausprägung_4: string;
  // Ausprägung_5: string;
  // Ausprägung_6: string;
  // Ausprägung_7: string;
  // ggf_weitere_Ausprägungn: string;
   TOP_Zuordnung: String;
  // Zuständige_Partner: string;
  // Hinweise: String;
  // Produktionsplanung: string;
  // Produktionssteuerung: string;
  // Produktion: string;
  // Personal: string;
  IT: String;
  // Logistik: string;
}

```
**ToDo:** to have function to convert non-ascii to ascii. E.g., "ä" to "ae" and white space to "_"

#### . test with hard code Modell example

- edit the *modell-center.componet.ts*
```
import { Component, OnInit } from '@angular/core';
import {Modell} from './../modell';
@Component({
  selector: 'app-modell-center',
  templateUrl: './modell-center.component.html',
  styleUrls: ['./modell-center.component.css']
})
export class ModellCenterComponent implements OnInit {

  modells: Modell[] = [
    {'_id': '1', 'Kriterium': 'test', 'Beschreibung': 'test', 'Auspraegung_0' : 'test', 'TOP_Zuordnung': 'test', 'IT': 'test'},
    {'_id': '2', 'Kriterium': ' xia test', 'Beschreibung': 'xia test', 'Auspraegung_0' : 'xia test', 'TOP_Zuordnung': 'xia test', 'IT': 'xia test'}
    ];

  constructor() { }

  ngOnInit() {
  }

}

```

- edit "modell-list.component.ts", by adding "inputs" array
```
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css'],
  inputs: ['modells']
})
export class ModelListComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

```


- edit "modell-list.component.html" and using bootstrap
```
<ul class="nav nav-pills nav-stacked">
  <li *ngFor="let modell of modells"><a>{{modell._id}}} {{modell.Kriterium}}}</a></li>
</ul>

```

now to test the "localhost:3000" to see the modell list and it works!

####. Display modell detail

**Logics:** 
- ModelCenter -> input -> ModelList -> display list
- ModelList -> output -> ModelCenter-> capture selected model
- ModelCenter -> input ->ModelDetail -> disply detail

the hardcoded array is defined inside *model-center.componet.ts*, it is as input to the *model-list.componet.ts* and it will be displayed inside the *model list.componet.html* 

when we click on one of the listed model, it sends an event as output from "model list component" t o "model center component" . This event contains the info about the clicked model, we will capture this model in the model-center component and send it as input again to model-detail component to disply its details


- edit "modell-list.component.html"
```
<ul class="nav nav-pills nav-stacked">
  <li  (click)="onselect(modell)" *ngFor="let modell of modells"><a>{{modell._id}} {{modell.Kriterium}}</a></li>
</ul>

```
to bind the click event on the particular list item. When an item is clicked, it fires a handle on select "onSelect" and pass this model

- edit "modell-list.component.ts"
```
import { Component, OnInit, EventEmitter } from '@angular/core';
import {Modell} from '../modell';

@Component({
  selector: 'model-list',
  templateUrl: './model-list.component.html',
  styleUrls: ['./model-list.component.css'],
  inputs: ['modells'],
  outputs: ['SelectedModell']
})
export class ModelListComponent implements OnInit {

  public SelectedModel = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelect(ml: Modell) {
    this.SelectedModel.emit(ml);
  }

}

```
to add an "EventEmitter" import, to add "outputs" the "selected model"; to define the "Selected modell"; to define the "onSelect()" envent

- edit "modell-Center.component.html", to captuer the onSelect event
```
<div class="row">
  <div class="col-sm-9">
    <model-detail></model-detail>
  </div>

  <div class="col-sm-3">
    <model-list (SelectModell)="onSelectModell($event)" [modells]="modells"></model-list>
  </div>
</div>

```

- edit "modell-Center.component.ts"
```
```
**Please make up the missing steps**

####. UI for CRUD with database data
- create the service modell
```
ng g s modell
```



### Tips:
- debugging JavaScript at Chrome, "View -> Developer -> JavaScript Console"
- Json file online validation tool,  https://jsonlint.com/
- JSFiddle is a nice place to test HTML, css, and JS altegother, https://jsfiddle.net/hu57nnbo/7/
- Formatting text:  https://help.github.com/articles/basic-writing-and-formatting-syntax/#quoting-code

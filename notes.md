# Notes on MEAN-Stack: Angular-CLI, MongoDB, ExpressJS, Node.js

This will the note when the author learned from the following tutorials. The tutorials are quite good and help the author to start to master web app development with MEAN Stack.

## Some Trouble shots:
1. it cant play the video, e.g., youttube vode. Change the url by replacing  "/watch" by "/embed". The reason is the "/embed" endpoint allows outside requests, whereas the "/watch" endpoint does not

## How to develop a web app with Mean 2018 Jan 12
This blog will step-by-step break down the original project to shwo how to develop such a project.

Tutorials (24) :  https://www.youtube.com/watch?v=HznzUUMyV1Q&list=PLC3y8-rFHvwj200LLotCYum_9wmGeTJx9&index=15
Source: https://github.com/gopinav/MEAN-Stack-Angular-CLI-/tree/master/ngApp

### Create a new Angular CLI project with routhing
```
# create a new project with routing
$ ng new ngApp --routing

$ cd ngApp

$ ng serve -o

$ ng build

#install express
$ npm install --save express body-parser
```


### Mongodb & mLab (online Mongodb server)

### Mongoose

### postman

### Angular CLI

### Tips:
- debugging JavaScript at Chrome, "View -> Developer -> JavaScript Console"
- Json file online validation tool,  https://jsonlint.com/
- JSFiddle is a nice place to test HTML, css, and JS altegother, https://jsfiddle.net/hu57nnbo/7/
- Formatting text:  https://help.github.com/articles/basic-writing-and-formatting-syntax/#quoting-code

//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
//img

// create a date object that requires the date.js file
const date = require(__dirname + "/date.js");
const final = require(__dirname + "/finals.js");
const app = express();

// set an array for the default items in the list
let items = ["Buy Food", "Prepare Food", "Cook Food", "Eat Food", "Clean Plates"];
// set an empty array for new work items
let workItems = ["Show Up", "Get Settled", "Drink Coffee"];

// setup an array for Fun 
let funItems = ["game", "trade", "golf"];

// setup an array for Weekend
let weekendItems = ["fishing", "cook", "movies"];

let finalExamItems = ["ICS 385", "ICS 360", "BUS 320"];

// set EJS as the viewing engine to display html
app.set('view engine', 'ejs');

// use body parser to parse html file
app.use(bodyParser.urlencoded({extended: true}));

// use Express to serve or display static files such as images, CSS, JS files etc.
app.use(express.static("public"));

// default html file in web server
app.get("/", function(req, res) {

    //get the system date from the getDate function exported by the date.js file
    let day = date.getDate();
    
    // use EJS render to display the day and the To Do List
    res.render("list", {listTitle: day, newListItems: items});
    
});

// display default to do list on the default root folder
app.post("/", function(req, res) {
    
    // code allows items to be added to the regular list and work list
    let item = req.body.newItem;
    
    // if route is /work, add to work list
  // if list === Fun then go to /fun
  // if list ==== Weekend then go to /weekend

  // === "directory you are using"
    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } 
    //res.redirect("/work") looks for the word "Work" in the ListTitle
    //workItems.push(item) sends new list todo item to the "workItems" list
      
       // if not = work, then fun
    else if (req.body.list === "Fun") {
        funItems.push(item);
        res.redirect("/fun");
    }
      // if not = fun, then weekend
    else if (req.body.list === "Weekend") {
        weekendItems.push(item);
        res.redirect("/weekend");
    }
      else if (req.body.list === "Finals") {
        finalExamItems.push(item);
        res.redirect("/finals");
    }
  
    else {
        items.push(item);
        res.redirect("/");
    }
});

// display default to do list on the localhost:3000/work route!
app.get("/work", function(req, res){

  let day = date.getDate();
  
    res.render("list", {listTitle: "Work Items To-Do List", newListItems: workItems})
});

// add a app.get for  route fun
app.get("/fun", function(req, res){

  let date = date.getDate();
  
    res.render("list", {listTitle: "Fun To-Do List", newListItems: funItems})
});

// add a app.get for route weekend
app.get("/weekend", function(req, res){

  let day = date.getDate();
  
    res.render("list", {listTitle: "Weekend To-Do List", newListItems: weekendItems})
});
// Make sure your listTitle starts off with Fun Items and Weekend Items

app.listen(3000, function() {
console.log ("Server is running on port 3000")
});

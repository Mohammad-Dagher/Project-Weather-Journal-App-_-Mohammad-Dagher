let cuont = 0;

// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

const express = require("express"); ////....

// Start up an instance of app

const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser"); ////.....

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

// Cors for cross origin allowance

const cors = require("cors"); ///......

app.use(cors());

// Initialize the main project folder
app.use(express.static("WebsiteMain"));

// Setup Server
const port = "3000"; /// http://localhost:3000/
app.listen(port, Servar_Running);

function Servar_Running() {
  console.log(`Servar Is Running Now on localhost: ${port}`);
}

////.......................

////   new post route  .......... http://localhost:3000/addpostnew

app.post("/addpostnew", add_Post_Data);

function add_Post_Data(req, res) { ////////////////////////////////////+++++++++
 

  cuont += 1;

  console.log(` cuont naw in  add_Post_Data method it is : ${cuont} `);

  projectData = req.body;

  console.log(projectData);

  res.send(projectData).status(200); ////...... 200 ==> successful

  console.log(" add_Post_Data successfully!");
  
}

///// GET route ..........  http://localhost:3000/upall
app.get("/upall", send_all_Data); /// .....

function send_all_Data(req, res) {

  cuont += 1;

  console.log(` cuont naw in send_all_Data method it is : ${cuont} `);

  res.send(projectData).status(200); ////  200 ==> successful

}

///// GET route .......... http://localhost:3000/getdata
app.get("/getdata", get_all_Data);

function get_all_Data(req, res) {

  cuont += 1;

  console.log(` cuont naw in  get_all_Data method it is : ${cuont} `);

  res.send(projectData).status(200); ////  200 ==> sucsess

}

// Setup empty JS object to act as endpoint for all routes
let projectData = {};

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// post /
app.post('/add', (req, res) => {
  projectData = req.body;
  res.status(200).send(projectData)
});

// Callback function to complete GET '/all'
app.get('/all', (req, res) => res.status(200).send(projectData));


const port = 5050;
// Setup Server
app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});

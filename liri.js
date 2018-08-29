//require dovenv package
require("dotenv").config();

//require inquirer
var inquirer = require("inquirer");

//require commands.js file 
var CMD = require("./commands.js");

//creates new object 
var cmd = new CMD();

//take argument for command from line in terminal
var command = process.argv[2];

//take argument for artist name from terminal
var value = process.argv.slice(3).join(" ");

//switch action based on command given 
switch (command) {
    case "concert-this":
        cmd.concert(value);
        break;

    case "spotify-this-song":
        cmd.song(value);
        break;

    case "movie-this":
        cmd.movie(value);
        break;
};

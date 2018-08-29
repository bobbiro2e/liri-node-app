var request = require("request");
var moment = require('moment');
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var CMD = function () {
    this.concert = function (artist) {
        var URL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
        request(URL, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var info = JSON.parse(body)[0];
                var venueName = info.venue.name;
                var venueLocation = info.venue.city;
                var date = info.datetime;
                date = moment(date).format("dddd, MMMM Do YYYY");
                //eventually format artist name 
                console.log("\nEvent for " + artist + "\n" + "\nVenue Name: " + venueName + "\nVenue Location: " + venueLocation + "\nEvent Date: " + date + "\n");
            }
        })
    }
    this.song = function (song) {
        spotify.search({ type: 'track', query: song, limit: 1 }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            var info = data.tracks.items[0];
            var artistsArray = info.artists;
            var artists = [];
            artistsArray.forEach(function (item) {
                artists.push(item.name)
            })
            var formattedArtists = artists.join(", ");
            var songName = info.name;
            var href = info.href
            var album = info.album.name;

            console.log("\nArtist/s: " + formattedArtists + "\nSong Name: " + songName + "\nURL: " + href + "\nAlbum Name: " + album + "\n")
        });
    }
    this.movie = function (movie) {
        var URL = "https://www.omdbapi.com/?apikey=trilogy&t=" + movie;
        request(URL, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                var info = JSON.parse(body);
                var title = info.Title;
                var year = info.Year;
                var imdbr = info.Ratings[0].Value;
                var rtr = info.Ratings[1].Value;
                var country = info.Country;
                var language = info.Language;
                var plot = info.Plot;
                var actors = info.Actors;

                console.log("\nTitle: " + title + "\nYear: " + year + "\nIMDB Rating: " + imdbr + "\nRotten Tomatoes Rating: " + rtr + "\nCountry: " + country + "\nLanguage: " + language + "\nPlot: " + plot + "\nActors: " + actors + "\n")
            }
        })
    }
};

module.exports = CMD;
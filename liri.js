
require("dotenv").config();

var keys = require("./keys");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');

var request = require('request');
var fs = require('fs');

//user input
var userInput = "";
var liriArg = process.argv[2];

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

// * 'my-tweets
// * 'spotify-this-song
// * 'movie-this
// * 'do-what-it-says


//spotify
function mySpotify() {

    if(userInput != false) {
        spotify.search({
            type: 'track',
            query: userInput + '&limit=1&'
        },

        function(err, data) {
            if(err){
            console.log("Error Message: " + err);
            return;
         }
           console.log("---------------------------");
           console.log("Song selected was: " + userInput + ".");
           console.log("Song Title: " + data.tracks.items[0].name);
           console.log("Artist Name: " + data.tracks.items[0].artists[0].name);
           console.log("Album Name: " + data.tracks.items[0].album.name);
           console.log("Preview URL: " + data.tracks.items[0].preview_url);
           console.log("---------------------------");
        });

    } else {
        spotify.search({
            type: 'track',
            query: 'ace+of+base+sign' + '&limit=1&'
        },
        function(err, data) {
            if(err) {
                console.log("Uh, oh! " + err);
                return;
            }
            console.log("---------------------------" + '\r\n');
            console.log("looks like you didn't select a song..." + '\r\n');
            console.log("Hope you like: " + data.tracks.items[0].name + '\r\n');
            console.log("Artist Name: " + data.tracks.items[0].artists[0].name + '\r\n');
            console.log("Album Name: " + data.tracks.items[0].album.name + '\r\n');
            console.log("Preview URL: " + data.tracks.items[0].preview_url + '\r\n');
            console.log("---------------------------" );
        });
    }
}
mySpotify();

//Twitter
function myTweets() {
    var params = {screen_name: 'nat_codewell'} && {count: 20};

    client.get('statuses/user_timeline', params, function(err, tweets, response) {
        if(!err) {
            console.log("Top Tweets: ");

            for (var i = 0; i <tweets.length; i++) {
                // console.log("---------------------------");
                console.log("You've Tweeted: " + tweets[i].created_at + '\r\n');
                console.log('\r\n' + tweets[i].text);
                // console.log("---------------------------");
            }
        }
    });
}
myTweets();

//OMDB movie search
function myMovies() {
    request('http://www.omdbapi.com/?t=' + userInput + '&y=&plot=short&tomatoes=true&apikey=trilogy', function(error, response, body) {
        if(userInput != false) {
            console.log("---------------------------" + '\r\n');
            console.log("Movie Title: " + JSON.parse(body).title + '\r\n');
            console.log("Movie Release Year: " + JSON.parse(body).year + '\r\n');
            console.log("Rating: " + JSON.parse(body).imdbRating + '\r\n');
            console.log("Rotten Tomoatoe Rating: " + JSON.parse(body).tomatoRating + '\r\n');
            console.log("Film was produced in: " + JSON.parse(body).country + '\r\n');
            console.log("The language of the movie is: " + JSON.parse(body).language + '\r\n');
            console.log("The movie plot is: " + JSON.parse(body).plot + '\r\n');
            console.log("Actors featured in the film: " + JSON.parse(body).actors + '\r\n');

        } else {
            request('http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&tomatoes=true&apikey=trilogy')

            console.log("---------------------------" + '\r\n');
            console.log("Movie Title: " + JSON.parse(body).title + '\r\n');
            console.log("Movie Release Year: " + JSON.parse(body).year + '\r\n');
            console.log("Rating: " + JSON.parse(body).imdbRating + '\r\n');
            console.log("Rotten Tomoatoe Rating: " + JSON.parse(body).tomatoRating + '\r\n');
            console.log("Film was produced in: " + JSON.parse(body).country + '\r\n');
            console.log("The language of the movie is: " + JSON.parse(body).language + '\r\n');
            console.log("The movie plot is: " + JSON.parse(body).plot + '\r\n');
            console.log("Actors featured in the film: " + JSON.parse(body).actors + '\r\n');
            console.log("---------------------------"); 
        }
    })
}




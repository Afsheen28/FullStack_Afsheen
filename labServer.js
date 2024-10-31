var http = require("http"); //Require the built-in http module
const _ = require('lodash');
const url = require ('url');

let lessons = [
    { 'topic': 'math', 'location': 'London', 'price': 100 },
    { 'topic': 'math', 'location': 'Liverpool', 'price': 80 },
    { 'topic': 'math', 'location': 'Oxford', 'price': 90 },
    { 'topic': 'math', 'location': 'Bristol', 'price': 120 },

]

//Defines a function that will handle incoming HTTP requests
function requestHandler(request, response) {
    console.log("Incoming request to: " + request.url);

    //Check if there's a lesson in London
    const londonLessonIndex = _.findIndex(lessons, ['location', 'London']);
    if (londonLessonIndex !== -1) {
        const londonLesson = lessons[londonLessonIndex];
        response.end(JSON.stringify(londonLesson)); //Send only the london lesson
    } else {
        response.end("No lesson found in London."); //Otherwise send all lessons
    }
}

// Function to handle requests for the first lesson with a price < 100
function priceResponseHandler(request, response) {
    console.log("Handling request for lessons with price < 100");

    const firstAffordableLesson = _.find(lessons, lesson => lesson.price < 100);
    if (firstAffordableLesson) {
        response.end(JSON.stringify(firstAffordableLesson)); // Send the first lesson with price < 100
    } else {
        response.end("No affordable lessons found.");
    }
}

// Function to handle requests for the last lesson with a price < 100
function priceResponseHandlerLast(request, response) {
    console.log("Handling request for last lesson with price < 100");

    const lastAffordableLesson = _.findLast(lessons, lesson => lesson.price < 100);
    if (lastAffordableLesson) {
        response.end(JSON.stringify(lastAffordableLesson)); //Sends the last lesson with price < 100
    } else {
        response.end("No affordable lessons found.");
    }
}

//Function to handle requests for shuffling lessons
function shuffleLessonsHandler(request, response) {
    console.log("Handling request to shuffle lessons");

    const shuffledLessons = _.shuffle(lessons);
    response.end(JSON.stringify(shuffledLessons)); //Sends the shuffled lessons
}

// Main request handler to direct requests to the appropriate function
function mainRequestHandler(request, response) {
    console.log("Incoming request to: " + request.url);

    if (request.url === "/london") {
        responseHandler(request, response);
    } else if (request.url === "/affordable") {
        priceResponseHandler(request, response);
    } else if (request.url === "/shuffle") {
        shuffleLessonsHandler(request, response);
    } else {
        response.end("Invalid endpoint. Use /london, /affordable or /shuffle.");
    }
}

//Creates a server that uses your function to handle requests
var server = http.createServer(shuffleLessonsHandler);
//Starts the server listening on port 3000
server.listen(3000);
const fs = require('fs');

function fetchHTMLPage(path, response) {
  fetchFile(path, response)
}
function styleSheet(path, response){
  fetchStyle(path,response)
}
// Function you wrote in class that fetches html files
function fetchFile(fileName, response) {
  fs.readFile(fileName, (error, content) => {
    if(error) {
      response.writeHead(500, { 'Content-Type': 'text/plain' });
      response.end('500 Internal Server Error');
    } else {
      response.writeHead(200, { 'Content-Type': 'text/html' });
      response.end(content, 'utf-8');
    }
  });
};

// Fucntion added to fetch the style sheet
function fetchStyle(fileName, response) {
    fs.readFile(fileName, (error, content) => {
      if(error) {
        response.writeHead(500, { 'Content-Type': 'text/plain' });
        response.end('500 Internal Server Error');
      } else {
        response.writeHead(200, { 'Content-Type': 'text/css' });
        response.end(content, 'utf-8');
      }
    });
};

module.exports = {
  //aboutPage,
  fetchHTMLPage,
  styleSheet,
  //homePage,
}
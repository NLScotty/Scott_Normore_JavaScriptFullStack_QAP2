const http = require('http');
const fs = require('fs');
const path = require('path');

const EventEmitter = require('events');
const myEmitter = new EventEmitter();

const routes = require('./routes.js');

global.DEBUG = true;

// Code Taken from your lectures. It is an event listener that 
// when a route event is received it emits a log to the log file
// Currently used to keep track when routes have been accessed.
// Added Daily route file functionality
myEmitter.on('route', (url) => {
    const d = new Date();
    if(DEBUG) console.log(`Route Event on: ${url} at ${d}`);
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
      fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', d.getDay()+'-'+d.getMonth()+'-'+d.getFullYear()+'-route.log'), `Route Event on: ${url} at ${d}\n`, (error) => {
      if(error) throw error;
    });
});

const server = http.createServer((req, res) =>{
    if(DEBUG) console.log(req.method+", "+req.url)
    let path = './views/';
    switch(req.url){
        // These are the routes/endpoints I chose to keep track of
        case '/':
            path += 'index.html';
            myEmitter.emit('route', path);
            routes.fetchHTMLPage(path, res);
            break;
        case '/about':
            path += 'about.html';
            myEmitter.emit('route', path);
            routes.fetchHTMLPage(path, res);
            break;
        case '/contact':
            path += 'contact.html';
            myEmitter.emit('route', path);
            routes.fetchHTMLPage(path, res);
            break;
        case '/products':
            path += 'products.html';
            myEmitter.emit('route', path);
            routes.fetchHTMLPage(path, res);
            break;
        case '/subscribe':
            path += 'subscribe.html';
            myEmitter.emit('route', path);
            routes.fetchHTMLPage(path, res);
            break;
        // Below are the routes we choose not to log
        case '/style.css':
            path += 'style.css';
            routes.styleSheet(path, res);
            break;
        case '/favicon.ico':
            path = './resources/' + 'favicon.ico'
            routes.fetchIcon(path, res);
        default:
            console.log('404 Not Found');
            break;
    }
})

server.listen(3000, () => {
    console.log('Server is running...');
});
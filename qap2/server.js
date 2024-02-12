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
myEmitter.on('route', (url) => {
    const d = new Date();
    if(DEBUG) console.log(`Route Event on: ${url} at ${d}`);
    if(!fs.existsSync(path.join(__dirname, 'logs'))) {
      fs.mkdirSync(path.join(__dirname, 'logs'));
    }
    fs.appendFile(path.join(__dirname, 'logs', 'route.log'), `Route Event on: ${url} at ${d}\n`, (error) => {
      if(error) throw error;
    });
});

const server = http.createServer((req, res) =>{
    if(DEBUG) console.log(req.method+", "+req.url)
    let path = './views/';
    if(req.method === 'POST'){

    }else{
        switch(req.url){
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
            case '/style.css':
                console.log(path);
                path += 'style.css';
                myEmitter.emit('route', path);
                routes.styleSheet(path, res);
                break;
            default:
                console.log('404 Not Found');
                break;
        }
    }
})

server.listen(3000, () => {
    console.log('Server is running...');
});
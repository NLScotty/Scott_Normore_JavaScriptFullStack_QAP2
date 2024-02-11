const http = require('http');

global.DEBUG = true;

const server = http.createServer((req, res) =>{
    if(DEBUG) console.log(req.method+", "+req.url)
    if(req.method === 'POST'){

    }else{
        switch(req.url){
            case '/':
                console.log("root");
                break;
            case '/about':
                console.log("about");
                break;
            case '/contact':
                console.log("contatcs");
                break;
            case '/products':
                console.log("products");
                break;
            case '/subscribe':
                console.log("subscribe");
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
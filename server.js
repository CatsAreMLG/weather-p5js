// var express = require("express");
// var app = express();
// var port = process.env.PORT || 3000;

// app.get("/", function (req, res) {
//     res.send("Weather p5js app");
// })

// app.listen(port);

var http = require("http");
var express = require("express");
var fs = require("fs");
var app = express();
// app.use(express.static(__dirname + '/public'));
http.createServer((req, res)=>{
    var url = req.url;
    switch(url) {
        case '/':
            getStatic(res, 'index.html','text/html');
            break;
        case '/script.js':
            getStatic(res, 'script.js', 'script/javascript');
            break;
        case '/config.js':
            getStatic(res, 'config.js', 'script/javascript');
            break;
        case '/style.css':
            getStatic(res, 'style.css', 'style/css');
            break;
        default:
            res.writeHead(404, {'Content-Type':'text/plain'});
            res.end('404 - Page not found.');
    }
}).listen(3000);
console.log('server running at http://localhost:3000');

function getStatic(res, file, content) {
    fs.readFile(file, (err, data)=>{
        if (err) {
            res.writeHead(500, {'Content-Type':'text/plain'});
            res.end('500 - Internal Server Error.');
        }
        if (data) {
            res.writeHead(200,{'Content-Type':content});
            res.end(data);
        }
    });
}
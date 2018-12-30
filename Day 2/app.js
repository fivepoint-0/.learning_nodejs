const http = require('http');
const fs = require('fs');

const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;
    if (url === '/') {
        res.setHeader('Content-Type', 'text/html');
        res.write(
            '<html><title>?</title><body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></input></form></body></html>'
        );
        return res.end();
    }
    //Handle POST from '/'
    if (url === '/message'  && method === 'POST') {
        const body = [];
        req.on('data', (chunk) => {
            console.log(chunk);
            body.push(chunk);
        });
        req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1];
            //fs.writeFileSync('message.text', message);
            fs.writeFile('message.text', message, (err) => {
                res.setHeader('Location', '/');
                res.statusCode = 302;
                return res.end();
            });
        });
        fs.writeFileSync('message.text', 'DUMMYT');
        res.setHeader('Location', '/');
        return res.end();
    }

    res.end();
});

server.listen(3000);
// http.createServer(function(req, res) {

// });
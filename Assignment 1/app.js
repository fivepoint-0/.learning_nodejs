const http = require('http');
const fs = require('fs');


function createUser(username) {
    //const users = fs.readFileSync('users.txt');
    users = [
            { "username": "a1" },
            { "username": "a2" }
        ]
        //Foreach element in the user array, do the following:
    users.forEach((user) => console.log(user.username));


    createUser();
    const server = http.createServer((req, res) => {
        const url = req.url;
        const method = req.method;
        if (url === '/') {
            res.write(
                '<html><title>?</title><body><form action="/createUser" method="POST"><input type="text" name="user"><button type="submit">Create User</button></input></form></body></html>'
            );
            return res.end();
        }
        //Handle POST from '/'
        if (url === '/createUser' && method === 'POST') {
            const body = [];
            req.on('data', (chunk) => {
                console.log(chunk);
                body.push(chunk);
            });
            req.on('end', () => {
                const parsedBody = Buffer.concat(body).toString();
                const user = parsedBody.split('=')[1];
                fs.appendFile('users.text', `{ "username": "${user}" }`, (err) => {
                    res.statusCode = 302;
                    return res.end();
                });
            });
            return res.end();
        }
        res.setHeader('Content-Type', 'text/html');
        res.end();
    });

    //server.listen(3000);
    // http.createServer(function(req, res) {

    // });
//Requirements
const http = require('http');
const fs = require('fs');

//Neat looking log function
function ulog(requestUrl, string) {
    console.log(`${requestUrl} : ${string}`);
}

//Check if username is in the users.txt database file
function usernameTaken(userTable, username) {
    //Assume it's not taken
    let result = false;
    userTable.forEach((user) => {
        //Found an username that already exists
        if (user.username === username) { result = true; }
    });
    return result;
}

//Define server 
const server = http.createServer((req, res) => {
    const url = req.url;
    const method = req.method;

    //Root URL behavior; brings us to a page where we can create a user within a form by entering a user name
    if (url === '/') {
        res.write(
            '<html><title>?</title><body><form action="/create-user" method="POST"><input type="text" name="user"><button type="submit">Create User</button></input></form></body></html>'
        );
        return res.end();
    }

    //URL path for client to retrive a list of users.
    if (url === '/users') {
        //Parse JSON object
        users = JSON.parse(fs.readFileSync('users.txt'));
        let data = '';

        //Version 1 of foreach in Javascript
        res.write('<html><title>?</title><body><ul>');
        for (let user of users) {
            ulog(url, `${user.username} found! ... `);
            res.write(`<li>${user.username}</li>`);
        }
        res.write('</ul></body></html>');

        //Version 2 of foreach in Javascript
        users.forEach((user) => { data += '<h6>' + user.username + '</h6>' });

        //After concatenating a bunch of data together, throw it on the page.
        return res.end();
    }

    //Handle POST from '/'
    if (url === '/create-user' && method === 'POST') {
        //Create body array to parse request data input
        const body = [];

        //When receiving the request, take the data and push it into the body array. 
        req.on('data', (chunk) => {
            //Let Con see what's coming in
            ulog(url, `Chunk has been received...\n-----------\n${chunk}\n-----------\n`);

            //As aforementioned, push the chunk to the body array.
            body.push(chunk);
        });

        //After the request has finished, perform the following:
        req.on('end', () => {
            //Join that body back into a string
            const parsedBody = Buffer.concat(body).toString();

            //Get username variable
            const username = parsedBody.split('=')[1];

            //Read the 'users.txt' database file and parse it into a JSON object
            users = JSON.parse(fs.readFileSync('users.txt'));

            //Foreach element in the user array, check if the username is taken
            if (!usernameTaken(users, username)) {
                //If not, let's let Con know 
                ulog(url, `${username} created!`);

                //Add to the JSON array
                users.push({ "username": `${username}` });

                //Write the appended array to the database file.
                fs.writeFile('users.txt', JSON.stringify(users), (err) => {
                    res.statusCode = 302;
                    return res.end();
                });
            } else {
                //Let Con know that we've failed as a user
                ulog(url, `${username} FAILED to be created!`);
                return res.end();
            }


        });
        return res.end();
    }

    res.setHeader('Content-Type', 'text/html');
    res.end();
});

//Initialize server
server.listen(3000);
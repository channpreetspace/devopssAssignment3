const express = require('express');
const bodyP = require('body-parser');
const fs = require('fs');
const server1 = express();

server1.use(bodyP.urlencoded({ extended: true }));
server1.use(express.static('public'));

const dbFile = 'myDB.txt';

// checking if database file exist
if (!fs.existsSync(dbFile)) {
    fs.writeFileSync(dbFile, '');
}

server1.post('/login', (req, res) => {
    const { username, password } = req.body;
    let users = fs.readFileSync(dbFile, 'utf-8').split('\n').filter(Boolean).map(line => line.split(','));
    if (users.some(user => user[0] === username && user[1] === password)) {
        res.send('You have successfully logged in!');
    } else {
        res.send('Username or password is invalid!');
    }
});

server1.post('/register', (req, res) => {
    const { username, password } = req.body;
    let users = fs.readFileSync(dbFile, 'utf-8').split('\n').filter(Boolean).map(line => line.split(','));
    if (users.some(user => user[0] === username)) {
        res.send('Username exists already! Enter new username');
    } else {
        fs.appendFileSync(dbFile, `${username},${password}\n`);
        res.send('Registration is successful!');
    }
});

server1.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

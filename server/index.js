require('dotenv').config();
const massive = require('massive');
const express = require('express');
const userCtrl = require('./controllers/user');
const postCtrl = require('./controllers/posts');

const app = express();
const { SERVER_PORT, CONNECTION_STRING } = process.env;

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then((dbInstance) => {
    app.set('db', dbInstance);
    console.log('Massive: Database connected');
});

app.use(express.json());


//Auth Endpoints
app.post('/api/auth/register', userCtrl.register);
app.post('/api/auth/login', userCtrl.login);
app.get('/api/auth/me', userCtrl.getUser);
app.post('/api/auth/logout', userCtrl.logout);

//Post Endpoints
app.get('/api/posts', postCtrl.readPosts);
app.post('/api/post', postCtrl.createPost);
app.get('/api/post/:id', postCtrl.readPost);
app.delete('/api/post/:id', postCtrl.deletePost);

app.listen(SERVER_PORT, () => console.log(`Running on port ${SERVER_PORT}!!`));
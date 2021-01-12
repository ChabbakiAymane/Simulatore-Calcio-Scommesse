const app = require("./app.js");
const request = require('supertest');
const fetch = require("node-fetch");
const mongoose = require('mongoose');

describe('classifica.test', () => {

    let server;

    beforeAll( async () => {
        jest.setTimeout(8000);
        jest.unmock('mongoose');
        connection = await  mongoose.connect('mongodb+srv://admin:admin@cluster0.b3qv0.mongodb.net/Testing?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Database connected!');
        /*const User = require('./models/UserData');
        userSpy = jest.spyOn(User, 'findOne').mockImplementation((criterias) => {
        return {
            _id:{"$oid":"5fb3de058d1fe018a096f76f"},
            id:1,
            username:"MarioGialli",
            mail:"mario.rossi@mail.it",
            password:"psw1234",
            punti:124,
            puntiSettimanali:4
        };
        });*/
    });

    afterAll( (done) => {
        console.log(`Closing server`);
        server.close( done() );
    });

    it('works with get', async () => {
        const response = await request(app).get('/api/v2/classifica/classifica');
        expect(response.statusCode).toBe(200);
    })

    it('search with get', async () => {
        const response = await request(app).get('/api/v2/classifica/search?name=MarioRossi');
        expect(response.statusCode).toBe(200);
        expect(response.body).toStrictEqual({"pos":1,"username":"MarioRossi","punti":124});
    })
});
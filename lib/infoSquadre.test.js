const app = require("./app.js");
const request = require('supertest');
const fetch = require("node-fetch");
const mongoose = require('mongoose');

describe('infoSquadre.test', () => {

    let server;

    beforeAll(async () => {
        jest.setTimeout(8000);
        jest.unmock('mongoose');
        connection = await  mongoose.connect('mongodb+srv://admin:admin@cluster0.b3qv0.mongodb.net/Testing?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Database connected!');
    });

    afterAll( (done) => {
        console.log(`Closing server`);
        server.close( done() );
    });


    it('/getInfoSquadre should return 200', async () => {
        const response = await request(app).get('/api/v2/infoSquadre/getInfoSquadre');
        expect(response.statusCode).toBe(200);
    })
    it('/:id should return 200', async () => {
        const response = await request(app).get('/api/v2/infoSquadre/' + 5);
        expect(response.body.name).toBe("Crotone");
        expect(response.statusCode).toBe(200);
    })
});
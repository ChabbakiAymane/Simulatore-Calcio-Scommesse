const app = require("./app.js");
const request = require('supertest');
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

// expect basta averne 1 vero affinche il test sia positivo

describe('registrazione.test', () => {
    beforeAll(async () => {
        jest.setTimeout(8000);
        jest.unmock('mongoose');
        connection = await  mongoose.connect('mongodb+srv://admin:admin@cluster0.b3qv0.mongodb.net/Testing?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Database connected!');
    });

    let server;

    it('GET users', async () => {
        const response = await request(app).get('/api/v2/registrazione/users');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    /*it('GET users SBAGLIATO (no user)', async () => {
        const response = await request(app).get('/api/v2/registrazione/users');
        expect(response.statusCode).toBe(404);
        expect(response.error).toBe('Non ci sono utenti registrati');
    });*/

    it('GET max ID', async () => {
        const response = await request(app).get('/api/v2/registrazione/lastID');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    /*it('GET max ID SBAGLIATO (no user)', async () => {
        const response = await request(app).get('/api/v2/registrazione/usersID');
        expect(response.statusCode).toBe(404);
        expect(response.error).toBe('Non ci sono utenti registrati');
    });*/

    it('GET utenti con email corretta', async () => {
        const response = await request(app).get('/api/v2/registrazione/utenti/mario.rossi@mail.it');
        expect(response.statusCode).toBe(200);
        expect(response.body.error).toBe('Utente gia registrato');
    });

    it('GET utenti SBAGLIATO con email inesistente', async () => {
        const response = await request(app).get('/api/v2/registrazione/utenti/not.user@notmail.not');
        expect(response.statusCode).toBe(204);
    });

    it('GET utenti SBAGLIATO con email non corretta', async () => {
        const response = await request(app).get('/api/v2/registrazione/utenti/not.usernotmail.not');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Errore email non corretta");
    });

    test('POST nuovoUtente con dati corretti', async () => {
        const response = await request(app).post('/api/v2/registrazione/nuovoUtente')
            .set('Accept', 'application/json')
            .send({ "id": "1",
                    "username": "test",
                    "mail": "test@test.com",
                    "password": "test"});

        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    test('POST nuovoUtente SBAGLIATO per id NaN', async () => {
        const response = await request(app).post('/api/v2/registrazione/nuovoUtente')
            .set('Accept', 'application/json')
            .send({ "id": "ciao",
                    "username": "test",
                    "mail": "test@test.com",
                    "password": "test"});
            
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Errore id non corretto');
    });

    test('POST nuovoUtente SBAGLIATO per mail non valida', async () => {
        const response = await request(app).post('/api/v2/registrazione/nuovoUtente')
            .set('Accept', 'application/json')
            .send({ "id": "1",
                    "username": "test",
                    "mail": "ttt.com",
                    "password": "test"});
            
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe('Errore email non corretta');
    });

    afterAll((done) => {
        console.log(`Closing server`);
        server.close(done());
    });
});
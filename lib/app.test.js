const app = require("./app.js");
const request = require('supertest');
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

describe('script.test', () => {

    let server;

    beforeAll(async () => {
        jest.setTimeout(8000);
        jest.unmock('mongoose');
        connection = await  mongoose.connect('mongodb+srv://admin:admin@cluster0.b3qv0.mongodb.net/Testing?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Database connected!');
      });
 
     afterAll((done) => {
         console.log(`Closing server`);
         server.close(done());
     });

    var token = jwt.sign(
        {
            id: 1,
            username: 'MarioRossi',
            punti: 124
        },
        process.env.SUPER_SECRET
    );
    var token_admin = jwt.sign(
        {
            id: 1,
            username: 'MarioRossi',
            punti: -1
        },
        process.env.SUPER_SECRET
    );

    test('POST /api/v2/login senza intoppi', () => {
        return request(app)
            .post('/api/v2/login')
            .set('Accept', 'application/json')
            .send({ "username": 'MarioRossi', "password": 'psw1234' })
            .expect(200) 
    });
    test('POST /api/v2/login con username undefined', () => {
        return request(app)
            .post('/api/v2/login')
            .set('Accept', 'application/json')
            .send({ "username": undefined, "password": 'psw1234' })
            .expect(400, { error: 'user undefined' });
    });
    test('POST /api/v2/login con password errata', () => {
        return request(app)
            .post('/api/v2/login')
            .set('Accept', 'application/json')
            .send({ "username": 'MarioRossi', "password": 'psw123' })
            .expect(400, { status: 'error', error: 'Invalid username/password' });
    });




    test('POST /api/v2/check senza intoppi', () => {
        return request(app)
            .post('/api/v2/check')
            .set('Accept', 'application/json')
            .send({ "token": token })
            .expect(200, { status: 'ok', admin: false })
    });
    test('POST /api/v2/check con token undefined', () => {
        return request(app)
            .post('/api/v2/check')
            .set('Accept', 'application/json')
            .send({ "token": undefined })
            .expect(400, { error: 'token undefined' });
    });
    test('POST /api/v2/check con token non autenticato', () => {
        return request(app)
            .post('/api/v2/check')
            .set('Accept', 'application/json')
            .send({ "token": 'non autentico' })
            .expect(400, { status: 'error', error: 'Token non autentico' });
    });
    test('POST /api/v2/check con token admin', () => {
        return request(app)
            .post('/api/v2/check')
            .set('Accept', 'application/json')
            .send({ "token": token_admin })
            .expect(200, { status: 'ok', admin: true })
    });





    test('POST /api/v2/change-password senza intoppi', () => {
        return request(app)
            .post('/api/v2/change-password')
            .set('Accept', 'application/json')
            .send({ "token": token, "newpassword": 'psw1234' })
            .expect(200) 
    });
    test('POST /api/v2/change-password token undefined', () => {
        return request(app)
            .post('/api/v2/change-password')
            .set('Accept', 'application/json')
            .send({ "token": undefined, "newpassword": 'psw1234' })
            .expect(400, { error: 'non sei loggato' });
    });
    test('POST /api/v2/change-password con password vuota', () => {
        return request(app)
            .post('/api/v2/change-password')
            .set('Accept', 'application/json')
            .send({ "token": token, "newpassword": '' })
            .expect(400, { error: 'invalid password' });
    });
    test('POST /api/v2/change-password con password troppo breve', () => {
        return request(app)
            .post('/api/v2/change-password')
            .set('Accept', 'application/json')
            .send({ "token": token, "newpassword": 'psw' })
            .expect(400, { error: 'psw minore di 6 caratteri' });
    });
    test('POST /api/v2/change-password con password troppo breve', () => {
        return request(app)
            .post('/api/v2/change-password')
            .set('Accept', 'application/json')
            .send({ "token": token, "newpassword": 'psw' })
            .expect(400, { error: 'psw minore di 6 caratteri' });
    });
    test('POST /api/v2/change-password con errore generico', () => {
        return request(app)
            .post('/api/v2/change-password')
            .set('Accept', 'application/json')
            .send({ "token": '', "newpassword": 'psw1234' })
            .expect(400, { error: 'Errore generico' });
    });




    test('POST pagina che non esiste', () => {
        return request(app)
            .post('/api/v2/Notexists')
            .set('Accept', 'application/json')
            .expect(404)
    });
});
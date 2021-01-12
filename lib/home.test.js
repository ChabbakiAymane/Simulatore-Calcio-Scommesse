const app = require("./app.js");
const request = require('supertest');
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

describe('.test', () => {

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

    /*it('works with get and post', () => {
        var store=1
        expect.assertions(2);
        return fetch(url)
            .then(r => r.json())
            .then( data => {
                expect(data[0]).toEqual({"id": 21, "name": "HCI"})
                store +=  data[0].id
            } )
            .then(r => {
                return fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({name: 'hello course'+ store}),
                    headers: { 'Content-Type': 'application/json' },
                })
            })
            .then(r => r.json())
            .then( data => {
                expect(data.id).toEqual("hellocourse"+store)
            })
    })*/
    var token = jwt.sign(
        {
            id: 1,
            username: 'MarioRossi',
            punti: 124
        },
        process.env.SUPER_SECRET
    );
    console.log(token);
    //token='x';

    it('works with get', async () => {
        const response = await request(app).get('/api/v2/home/search_p');
        expect(response.statusCode).toBe(200);
    })
    it('works with get', async () => {
        const response = await request(app).get('/api/v2/home/search5');
        expect(response.statusCode).toBe(200);
    })
    it('works with get', async () => {
        const response = await request(app).get('/api/v2/home/search5_2');
        expect(response.statusCode).toBe(200);
    })

    test('POST /api/v2/home/username ', () => {
        return request(app)
            .post('/api/v2/home/username')
            .set('Accept', 'application/json')
            .send({ "token": token })
            .expect(200, '"MarioRossi"');
    });
    test('POST /api/v2/home/username ', () => {
        return request(app)
            .post('/api/v2/home/username')
            .set('Accept', 'application/json')
            .send({ "token": undefined })
            .expect(400, { error: 'token undefined' });
    });



    test('POST /api/v2/home/punti ', () => {
        return request(app)
            .post('/api/v2/home/punti')
            .set('Accept', 'application/json')
            .send({ "token": token })
            .expect(200, '124');
    });
    test('POST /api/v2/home/punti ', () => {
        return request(app)
            .post('/api/v2/home/punti')
            .set('Accept', 'application/json')
            .send({ "token": undefined })
            .expect(400, { error: 'token undefined' });
    });




    test('POST /api/v2/home/punt_set ', () => {
        return request(app)
            .post('/api/v2/home/punt_set')
            .set('Accept', 'application/json')
            .send({ "token": token })
            .expect(200, '[{"_id":"5fb3de058d1fe018a096f76f","id":1,"username":"MarioRossi","mail":"mario.rossi@mail.it","password":"psw1234","punti":124,"puntiSettimanali":0}]');
    });
    test('POST /api/v2/home/punt_set ', () => {
        return request(app)
            .post('/api/v2/home/punt_set')
            .set('Accept', 'application/json')
            .send({ "token": undefined })
            .expect(400, { error: 'token undefined' });
    });



    test('POST /api/v2/home/posizione ', () => {
        return request(app)
            .post('/api/v2/home/posizione')
            .set('Accept', 'application/json')
            .send({ "token": token })
            .expect(200, '1');
    });
    test('POST /api/v2/home/posizione ', () => {
        return request(app)
            .post('/api/v2/home/posizione')
            .set('Accept', 'application/json')
            .send({ "token": undefined })
            .expect(400, { error: 'token undefined' });
    });


});
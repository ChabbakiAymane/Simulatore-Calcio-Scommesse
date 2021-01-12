const app = require("./app.js");
const request = require('supertest');
const mongoose = require('mongoose');

describe('aggiorna_esiti.test', () => {

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


    it('/get_partite should return 200', async () => {
        const response = await request(app).get('/api/v2/aggiornaEsiti/get_partite');
        expect(response.statusCode).toBe(200);
    })
    

    it('/inserimentoEsiti without esiti should return 400', async () => { //Almeno un esito non specificato
        return request(app)
        .post('/api/v2/aggiornaEsiti/inserimentoEsiti')
        .set('Accept', 'application/json')
        .expect(400, { error: 'Esiti non specificati' });
    })
    it('/inserimentoEsiti without patite should return 400', async () => { //Almeno un id partita non specificato
        return request(app)
        .post('/api/v2/aggiornaEsiti/inserimentoEsiti')
        .set('Accept', 'application/json')
        .send({ e1: '1', e2: 'X', e3: '2', e4: '1', e5:'1' })
        .expect(400, { error: 'Id partite non specificati' });
    })
    test('/inserimentoEsiti should return 200', () => { //Tutti i parametri necessari
        return request(app)
        .post('/api/v2/aggiornaEsiti/inserimentoEsiti')
        .set('Accept', 'application/json')
        .send({ "e1": "2", "e2": "2", "e3": "2", "e4": "2", "e5":"1", "idP1": "1", "idP2": "2", "idP3": "3", "idP4": "4", "idP5": "5" })
        .expect(200);
    })
    
});
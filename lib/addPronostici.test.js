const app = require("./app.js");
const request = require('supertest');
const fetch = require("node-fetch");
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');

describe('pronostici.test', () => {
    let server;

    beforeAll(async () => {
        jest.setTimeout(8000);
        jest.unmock('mongoose');
        connection = await  mongoose.connect('mongodb+srv://admin:admin@cluster0.b3qv0.mongodb.net/Testing?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
        console.log('Database connected!');
    });

    it('GET partite', async () => {
        const response = await request(app).get('/api/v2/addPronostici/partite');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    /*it('GET partite SBAGLIATO (no partite)', async () => {
        const response = await request(app).get('/api/v2/addPronostici/partite');
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe('Errore non ci sono partite');
    });*/

    it('GET pronostici', async () => {
        const response = await request(app).get('/api/v2/addPronostici/pronostici');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    /*it('GET pronostici SBAGLIATO (no pronostici)', async () => {
        const response = await request(app).get('/api/v2/addPronostici/pronostici');
        expect(response.statusCode).toBe(404);
        expect(response.body.msg).toBe('Non ci sono pronostici');
    });*/

    it('GET pronostici-partite', async () => {
        const response = await request(app).get('/api/v2/addPronostici/partiteDisponibili');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    /*it('GET pronostici-partite SBAGLIATO (no pronostici)', async () => {
        const response = await request(app).get('/api/v2/addPronostici/partiteDisponibili');
        expect(response.statusCode).toBe(404);
        expect(response.body).toBe('Errore non ci sono partite disponibili per i pronostici');
    });*/

    it('GET user con username corretto', async () => {
        const response = await request(app).get('/api/v2/addPronostici/user/MarioRossi');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('GET user con username non corretto', async () => {
        const response = await request(app).get('/api/v2/addPronostici/user/notUser');
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Errore utente inesistente");
    });

    it('GET pronostico con id corretto', async () => {
        const response = await request(app).get('/api/v2/addPronostici/pronostici/5');
        expect(response.statusCode).toBe(200);
        expect(response.body).toBeDefined();
    });

    it('GET pronostico con id inesistente ', async () => {
        const response = await request(app).get('/api/v2/addPronostici/pronostici/100000');
        expect(response.statusCode).toBe(404);
        expect(response.body.error).toBe("Errore pronostico inesistente");
    });

    it('GET pronostico con id NaN ', async () => {
        const response = await request(app).get('/api/v2/addPronostici/pronostici/ciao');
        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Errore pronostico non corretto");
    });

    test('POST nuovoPronostico con dati corretti', async () => {
        const response = await request(app).post('/api/v2/addPronostici/nuovoPronostico/')
            .set('Accept', 'application/json')
            .send({ "id": "1000",
                    "partita": "1",
                    "idU": "1",
                    "pronostico": "1"});

        expect(response.statusCode).toBe(201);
        expect(response.body).toBeDefined();
    });

    test('POST nuovoPronostico SBAGLIATO con id NaN', async () => {
        const response = await request(app).post('/api/v2/addPronostici/nuovoPronostico/')
            .set('Accept', 'application/json')
            .send({ "id": "ciao",
                    "partita": "1",
                    "idU": "1",
                    "pronostico": "1"});

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Errore dati null");        
    });

    test('POST nuovoPronostico SBAGLIATO con id partita NaN', async () => {
        const response = await request(app).post('/api/v2/addPronostici/nuovoPronostico/')
            .set('Accept', 'application/json')
            .send({ "id": "1",
                    "partita": "ciao",
                    "idU": "1",
                    "pronostico": "1"});

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Errore dati null");        
    });

    test('POST nuovoPronostico SBAGLIATO con id user NaN', async () => {
        const response = await request(app).post('/api/v2/addPronostici/nuovoPronostico/')
            .set('Accept', 'application/json')
            .send({ "id": "1",
                    "partita": "1",
                    "idU": "ciao",
                    "pronostico": "1"});

        expect(response.statusCode).toBe(400);
        expect(response.body.error).toBe("Errore dati null");        
    });

    test('PUT modificaPronostico con id corretto', async () => {
        const response = await request(app).put('/api/v2/addPronostici/modPronostico/1')
            .set('Accept', 'application/json')
            .send({ "pronostico": "1"});

        expect(response.statusCode).toBe(201);
        expect(response.body).toBeDefined();
    });

    // ! FUNZIONA SOLO SE ESISTE UN PRONOSTICO
    /*test('DELETE eliminaPronostico con id corretto', async () => {
        const response = await request(app).delete('/api/v2/addPronostici/eliminaPronostico/3')
            .set('Accept', 'application/json');

        expect(response.statusCode).toBe(201);
        expect(response.body).toBeDefined();
    });*/

    /*test('DELETE eliminaPronostico con id inesistente ma valido', async () => {
        const response = await request(app).delete('/api/v2/addPronostici/eliminaPronostico/1')
            .set('Accept', 'application/json');
            
        expect(response.statusCode).toBe(404);
        expect(response.body).toBe("{ errore id pronostico inesistente }");
    });*/

    /*test('DELETE eliminaPronostico con id inesistente e non valido errore DB', async () => {
        const response = await request(app).delete('/api/v2/addPronostici/eliminaPronostico/notID')
            .set('Accept', 'application/json');
            
        expect(response.statusCode).toBe(500);
        expect(response.body).toBe("{ errore parametri elimina }");
    });*/
    
    // ! Non funziona, devo passare null come parametro
    /*test('DELETE eliminaPronostico con inesistente', async () => {
        const response = await request(app).delete('/api/v2/addPronostici/eliminaPronostico/')
            .set('Accept', 'application/json');
            
        expect(response.statusCode).toBe(400);
        expect(response.body).toBe("{ errore id non corretto }");
    });*/
    
    afterAll((done) => {
        console.log(`Closing server`);
        server.close(done());
    });
});
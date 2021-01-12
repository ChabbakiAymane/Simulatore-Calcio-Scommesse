const app = require("./app.js");
const request = require('supertest');
const fetch = require("node-fetch");
const mongoose = require('mongoose');

describe('addP.test', () => {

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

    it('works with get', async () => {
        const response = await request(app).get('/api/v2/addPartite/partite');
        expect(response.statusCode).toBe(200);
    })

    it('search with get', async () => {
        const response = await request(app).get('/api/v2/addPartite/squadre');
        expect(response.statusCode).toBe(200);
    })
    
    test('GET http://localhost:8000/api/v2/addPartite/search?name=Atalanta should return team information', async () => {
        //expect.assertions(2);
        const response = await request(app).get('/api/v2/addPartite/search?name=Atalanta');
        const team = response.body;
        expect(team).toBeDefined();
        expect(team.id).toBe(1);
      });

      test('GET http://localhost:8000/api/v2/addPartite/search?idP=1 should return team information', async () => {
        //expect.assertions(2);
        const response = await request(app).get('/api/v2/addPartite/search?idP=1');
        const team = response.body;
        expect(team).toBeDefined();
        expect(team.sq1).toBe(1);
      });

    test('Wrong POST /api/v2/addPartite/partite ', async () => {
        return await request(app)
          .post('/api/v2/addPartite/partite')
          .set('Accept', 'application/json')
          .send({   "sq1": 1,
                    "sq2": 2,
                    "esito": "X"}) // sends a JSON post body
          .expect(400, {error: 'some data is null'});
    });

    test('POST /api/v2/addPartite/partite ', async () => {
        return await request(app)
          .post('/api/v2/addPartite/partite')
          .set('Accept', 'application/json')
          .send({   "sq1": 1,
                    "sq2": 2,
                    "num": 1,
                    "date": "2020-12-11",
                    "esito": "X"
                    }) // sends a JSON post body
          .expect(200);
      });
});
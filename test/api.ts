//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../middleware/express';
let should = chai.should();

chai.use(chaiHttp);

describe('API', () => {
    describe('/GET registry dependencies', () => {
        it('it should GET all the dependencies', (done) => {
            chai.request(server)
                .get('/express')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    done();
                });
        });
    });

    describe('/GET registry dependencies', () => {
        it('it should display an Invalid Registry Name error', (done) => {
            chai.request(server)
                .get('/)!@)#*!')
                .end((err, res) => {
                    res.should.have.status(404);
                    done();
                });
        });
    });
});

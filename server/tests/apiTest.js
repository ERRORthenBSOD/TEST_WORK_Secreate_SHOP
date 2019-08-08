const request = require('supertest');
const app = require('../server');
const config = require('../connectors/config');
const expect = require('chai').expect;
//==================== images API test ====================

/**
 * Testing get images endpoint
 */
describe('GET /products/6', function () {
    it('respond with json array containing a list 6 products', function (done) {
        request(app)
            .get(`${config.get('express:prefix')}/products/6`)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOjIsImlhdCI6MTU2NTIwOTc1OX0.hPZBR-uRyaU4v_a-hHs3Cp6RjT0EHWIHwgoCyWzD4W4')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                if (err) return done(err);
                expect(res.body.data).to.be.an.instanceof(Array);
                expect(res.body.data).to.have.lengthOf(6);
                done();
            });

    });
});

describe('GET /images/16', function () {
    it('respond with json array containing a list 16 products', function (done) {
        request(app)
            .get(`${config.get('express:prefix')}/products/16`)
            .set('Accept', 'application/json')
            .set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAdGVzdC5jb20iLCJ1c2VySWQiOjIsImlhdCI6MTU2NTIwOTc1OX0.hPZBR-uRyaU4v_a-hHs3Cp6RjT0EHWIHwgoCyWzD4W4')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function (err, res) {
                console.log(res.body);
                if (err) return done(err);
                expect(res.body.data).to.be.an.instanceof(Array);
                expect(res.body.data).to.have.lengthOf(16);
                done();
            });

    });
});
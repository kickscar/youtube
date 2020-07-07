import request from 'supertest';
import assert from 'assert';
import httpStatus from 'http-status';
import app from '../index.js';

const assertStrict = assert.strict;

describe('test: category.controller', () => {
    it('list: /api/category', () => {
        return request(app)
            .get('/api/category')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(httpStatus.OK)
            .then(response => {
                assertStrict.deepEqual(response.body, { result: 'success', message: null, data: null});
            })
    });
});
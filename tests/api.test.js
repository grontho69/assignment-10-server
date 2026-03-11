const request = require('supertest');
const app = require('../src/app');

describe('Public Endpoints', () => {
    it('should return a list of recent issues', async () => {
        const res = await request(app).get('/issues/recent-issues');
        expect(res.statusCode).toEqual(200);
        expect(Array.isArray(res.body)).toBeTruthy();
    });

    it('should return 401 when accessing protected profile without token', async () => {
        const res = await request(app).get('/users/profile');
        expect(res.statusCode).toEqual(401);
    });
});

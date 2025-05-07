import request from 'supertest';
import app from '../app';

describe('Check the application main functionality', () => {
  it('should return 200 OK on health check', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });

  it('should return 404 Not Found on non-existing route', async () => {
    const response = await request(app).get('/non-existing-route');
    expect(response.status).toBe(404);
  });
});
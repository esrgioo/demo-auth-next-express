import App from '@/app';
import { prismaMock } from '../prisma';
import { comparePassword } from '@/lib/bcrypt';
import request from 'supertest';
import { User } from '@prisma/client';

jest.mock('@/lib/bcrypt');

const requestBody = {
  email: 'mock@mail.com',
  password: 'Admin123',
};

const user: User = {
  id: 1,
  name: 'Mock User',
  email: 'mock@mail.com',
  password: 'hashedPassword',
  provider: 'CREDENTIALS',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('POST /api/auth/login', () => {
  const { app } = new App();
  it('should login user successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(user);

    (comparePassword as jest.Mock).mockResolvedValueOnce(true);

    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it('should return error if email not exist', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Invalid email address');
  });
});

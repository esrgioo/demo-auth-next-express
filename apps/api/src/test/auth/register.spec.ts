import { hashPassword } from '@/lib/bcrypt';
import { prismaMock } from '../prisma';
import request from 'supertest';
import App from '@/app';
import { User } from '@prisma/client';

jest.mock('@/lib/bcrypt');

const requestBody = {
  name: 'mock User',
  email: 'mock@mail.com',
  password: 'Admin123',
};

const user: User = {
  id: 1,
  name: 'Mock user',
  email: 'mock@mail.com',
  password: 'hashedPassword',
  provider: 'CREDENTIALS',
  createdAt: new Date(),
  updatedAt: new Date(),
};

describe('POST /api/auth/register', () => {
  const { app } = new App();
  it('should register user successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);
    (hashPassword as jest.Mock).mockResolvedValueOnce('hashedPassword');
    prismaMock.user.create.mockResolvedValueOnce(user);

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body.id).toBeDefined();
    expect(response.body.name).toBeDefined();
  });

  it('should return error if email already exist', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(user);

    const response = await request(app)
      .post('/api/auth/register')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Email already exist');
  });
});

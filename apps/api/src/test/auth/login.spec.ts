import { comparePassword } from '@/lib/bcrypt';
import { prismaMock } from '../prisma';
import request from 'supertest';
import App from '@/app';
import { User } from '@prisma/client';

jest.mock('@/lib/bcrypt');

const requestBody = {
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

describe('POST /api/auth/login', () => {
  const { app } = new App();

  // argumen 1: nama test, argumen 2: callback function
  // bisa it / test
  it('should login user successfully', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(user);

    (comparePassword as jest.Mock).mockResolvedValueOnce(true);

    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  it("should return error if email doesn't exist", async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(null);

    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Invalid email address');
  });

  it('should return error if password incorrect', async () => {
    prismaMock.user.findFirst.mockResolvedValueOnce(user);

    (comparePassword as jest.Mock).mockResolvedValueOnce(false);

    const response = await request(app)
      .post('/api/auth/login')
      .send(requestBody);

    expect(response.status).toBe(500);
    expect(response.text).toBe('Incorrect password');
  });
});

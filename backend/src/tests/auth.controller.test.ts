import { Request, Response, NextFunction } from 'express';
import { login, logout, getMe } from '../controllers/auth.controller';
import { mockPrismaClient } from './setup';
import bcrypt from 'bcrypt';
import * as jwt from '../utils/jwt';

jest.mock('bcrypt');
jest.mock('../utils/jwt');
jest.mock('../utils/auditLogger');

describe('Auth Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return 401 if user not found', async () => {
      mockRequest = { body: { email: 'test@test.com', password: 'password123' } };
      mockPrismaClient.user.findUnique.mockResolvedValue(null);

      await login(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Invalid credentials or inactive account' });
    });

    it('should return 401 if password does not match', async () => {
      mockRequest = { body: { email: 'test@test.com', password: 'password123' } };
      mockPrismaClient.user.findUnique.mockResolvedValue({ id: '1', isActive: true, passwordHash: 'hash' });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await login(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(401);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Invalid credentials' });
    });

    it('should return token and user on successful login', async () => {
      mockRequest = { body: { email: 'test@test.com', password: 'password123' } };
      const user = { id: '1', isActive: true, passwordHash: 'hash', role: 'EMPLOYEE', email: 'test@test.com' };
      mockPrismaClient.user.findUnique.mockResolvedValue(user);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.generateToken as jest.Mock).mockReturnValue('fake_token');

      await login(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith(expect.objectContaining({
        success: true,
        token: 'fake_token',
        user: expect.any(Object),
      }));
    });
  });

  describe('logout', () => {
    it('should successfully logout', async () => {
      mockRequest = { user: { id: '1', role: 'EMPLOYEE' } };
      
      await logout(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, message: 'Logged out successfully' });
    });
  });

  describe('getMe', () => {
    it('should return current user', async () => {
      mockRequest = { user: { id: '1', role: 'EMPLOYEE' } };
      mockPrismaClient.user.findUnique.mockResolvedValue({ id: '1', email: 'test@test.com' });

      await getMe(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, user: { id: '1', email: 'test@test.com' } });
    });
  });
});

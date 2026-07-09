import { Request, Response, NextFunction } from 'express';
import { applyLeave, cancelLeave, processLeaveRequest } from '../controllers/leaveRequest.controller';
import { mockPrismaClient } from './setup';
import { notificationService } from '../utils/notification.service';

jest.mock('../utils/auditLogger');
jest.mock('../utils/notification.service', () => ({
  notificationService: {
    createNotification: jest.fn(),
  },
}));

describe('LeaveRequest Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = { user: { id: 'user1', role: 'EMPLOYEE', managerId: 'manager1' } };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('applyLeave', () => {
    it('should return 400 if start date is in the past', async () => {
      mockRequest.body = {
        leaveTypeId: '123e4567-e89b-12d3-a456-426614174000',
        startDate: '2000-01-01T00:00:00.000Z',
        endDate: '2000-01-05T00:00:00.000Z',
        reason: 'Past leave',
      };

      await applyLeave(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Start date cannot be in the past' });
    });
  });

  describe('cancelLeave', () => {
    it('should return 400 if leave is not pending', async () => {
      mockRequest.params = { id: 'req1' };
      mockPrismaClient.leaveRequest.findUnique.mockResolvedValue({ id: 'req1', userId: 'user1', status: 'APPROVED' });

      await cancelLeave(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Only pending requests can be cancelled' });
    });

    it('should cancel pending leave', async () => {
      mockRequest.params = { id: 'req1' };
      mockPrismaClient.leaveRequest.findUnique.mockResolvedValue({ id: 'req1', userId: 'user1', status: 'PENDING' });

      await cancelLeave(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockPrismaClient.leaveRequest.update).toHaveBeenCalledWith({
        where: { id: 'req1' },
        data: { status: 'CANCELLED' }
      });
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, message: 'Leave request cancelled successfully' });
    });
  });

  describe('processLeaveRequest', () => {
    it('should approve leave and notify employee', async () => {
      mockRequest.params = { id: 'req1' };
      mockRequest.body = { status: 'APPROVED', managerComment: 'OK' };
      
      const mockLeaveReq = { id: 'req1', userId: 'emp1', status: 'PENDING', startDate: new Date(), endDate: new Date(), leaveTypeId: 'type1' };
      const mockBalance = { id: 'bal1', totalDays: 10, usedDays: 0 };
      
      // We'll just mock the transaction to return our mocked leave request
      mockPrismaClient.$transaction.mockImplementationOnce(async () => mockLeaveReq);

      await processLeaveRequest(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(notificationService.createNotification).toHaveBeenCalledWith('emp1', 'Leave Request Approved', expect.any(String));
      expect(mockResponse.status).toHaveBeenCalledWith(200);
    });
  });
});

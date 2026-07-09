import { Request, Response, NextFunction } from 'express';
import { getNotifications, markAsRead, markAllAsRead } from '../controllers/notification.controller';
import { notificationService } from '../utils/notification.service';

jest.mock('../utils/notification.service', () => ({
  notificationService: {
    getUserNotifications: jest.fn(),
    markAsRead: jest.fn(),
    markAllAsRead: jest.fn(),
  },
}));

describe('Notification Controller', () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = { user: { id: 'user1', role: 'EMPLOYEE' } };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  describe('getNotifications', () => {
    it('should return user notifications', async () => {
      (notificationService.getUserNotifications as jest.Mock).mockReturnValue([{ id: 'notif1', title: 'Test' }]);

      await getNotifications(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: [{ id: 'notif1', title: 'Test' }] });
    });
  });

  describe('markAsRead', () => {
    it('should return 404 if notification not found', async () => {
      mockRequest.params = { id: 'notif1' };
      (notificationService.markAsRead as jest.Mock).mockReturnValue(null);

      await markAsRead(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(404);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: false, message: 'Notification not found' });
    });

    it('should mark notification as read', async () => {
      mockRequest.params = { id: 'notif1' };
      (notificationService.markAsRead as jest.Mock).mockReturnValue({ id: 'notif1', isRead: true });

      await markAsRead(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, data: { id: 'notif1', isRead: true } });
    });
  });

  describe('markAllAsRead', () => {
    it('should mark all notifications as read', async () => {
      await markAllAsRead(mockRequest as Request, mockResponse as Response, nextFunction);

      expect(notificationService.markAllAsRead).toHaveBeenCalledWith('user1');
      expect(mockResponse.status).toHaveBeenCalledWith(200);
      expect(mockResponse.json).toHaveBeenCalledWith({ success: true, message: 'All notifications marked as read' });
    });
  });
});

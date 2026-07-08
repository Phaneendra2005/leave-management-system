import { Router } from 'express';
import { getLeaveRequests, applyLeave, processLeaveRequest, getLeaveBalances, getAttachment } from '../controllers/leaveRequest.controller';
import { authenticate, authorize } from '../middlewares/auth.middleware';

const router = Router();

router.use(authenticate);

// Leave balances
router.get('/balances', getLeaveBalances);

// Leave requests
router.route('/')
  .get(getLeaveRequests) // Filter logic inside controller based on role
  .post(applyLeave);

// Process leave request (Managers and Admins)
router.patch('/:id/process', authorize('MANAGER', 'ADMIN'), processLeaveRequest);

// View attachment
router.get('/:id/attachment', getAttachment);

export default router;

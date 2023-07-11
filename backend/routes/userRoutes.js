import express from 'express';

import { authUser, registerUser, logout, getUserProfile, updateUserProfile } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', registerUser);
router.post('/auth', authUser);
router.post('/logout', logout);
// router.get('/profile', getUserProfile);
// router.put('/profile', updateUserProfile);
router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

export default router;
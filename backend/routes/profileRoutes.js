import express from 'express';
// import {createProfile,getAllProfiles, getProfileByUserId} from '../controllers/profileController.js';
import validateToken from '../middlewares/validateTokenHandler.js';
import profileController from '../controllers/profileController.js';
const { createProfile,getAllProfiles, getProfileByUserId } = profileController;

const router = express.Router();

router.route('/create').post(validateToken, createProfile)
router.route('/all').get(validateToken, getAllProfiles);
// .get(validateToken, getAllProfiles);
router.route('/:userId').get(validateToken, getProfileByUserId);

export default router;
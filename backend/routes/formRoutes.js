import express from 'express';
// import {submitForm} from '../controllers/formController.js';
import multer from 'multer';
import validateToken from '../middlewares/validateTokenHandler.js';
// import {FormAnalysis} from '../controllers/formController.js';
import formController from '../controllers/formController.js';

const { submitForm, FormAnalysis } = formController;

// import Form from '../models/formModel.js';

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
  });
  const upload = multer({ storage });
  
  router.post('/submit',validateToken, upload.single('proofImage'), submitForm);
  router.post('/analyze', validateToken,FormAnalysis);


  export default router;
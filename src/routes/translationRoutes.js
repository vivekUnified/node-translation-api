import express from 'express';
import TranslationController from '../controllers/translationController.js';

const router = express.Router();
const controller = new TranslationController();
// Route to handle text translation
router.post('/translate', controller.translateText);

// Route to fetch supported languages
router.get('/languages', controller.getSupportedLanguages);

export default router;
import express from 'express';
import TranslationController from '../controllers/translationController.js';
import Text2TextController from '../controllers/text2textController.js';
import QuestionAnswerController from '../controllers/questionAnswerController.js';

const router = express.Router();
const controller = new TranslationController();
const text2textController = new Text2TextController();
const questionAnswerController = new QuestionAnswerController();
// Route to handle text translation
router.post('/translate', controller.translateText);

// Route to handle text generation
router.post('/generate', text2textController.generateText);

// Route to handle question answering
router.post('/answer', questionAnswerController.answerQuestion);

// Route to fetch supported languages
router.get('/languages', controller.getSupportedLanguages);

export default router;

import QuestionAnswerService from "../services/questionAnswerService.js";

class QuestionAnswerController {
    constructor() {
        QuestionAnswerService.Answer('What is Capital of India.', 'New Delhi, Capital of India is in Northern India with population of 2Cr.').then((result) => {
            console.log('QuestionAnswerService service initialized:', result);
        });
    }

    async answerQuestion(req, res) {
        const { question, context } = req.body;

        if (!question || !context) {
            return res.status(400).json({ error: "Question and context are required." });
        }

        try {
            const answer = await QuestionAnswerService.Answer(question, context);
            res.json(answer);
        } catch (error) {
            console.error("Error answering question:", error);
            res.status(500).json({ error: "An error occurred while answering the question." });
        }
    }

}

export default QuestionAnswerController;
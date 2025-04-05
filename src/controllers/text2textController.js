import Text2TextService from "../services/text2textService.js";

class Text2TextController {

    constructor() {
        Text2TextService.generate('Hi', 100).then((result) => {
          console.log('Text generation service initialized:', result);
        })
    }
    async generateText(req, res) {
        try {
        const { text, max_new_tokens } = req.body;
        const generatedText = await Text2TextService.generate(text, max_new_tokens);
            res.status(200).json(generatedText);
        } catch (error) {
            res.status(500).json({ error: 'Text generation failed', details: error.message });
        }
    }
}

export default Text2TextController;
import { pipeline } from '@xenova/transformers';

/**
 * This class uses the Singleton pattern to ensure that only one instance of the
 * pipeline is loaded. This is because loading the pipeline is an expensive
 * operation and we don't want to do it every time we want to translate a sentence.
 */
class QuestionAnsweringPipeline {
    static task = 'question-answering';
    static model = 'Xenova/distilbert-base-uncased-distilled-squad';
    static instance = null;

    static async getInstance(progressCallback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback: progressCallback });
        }

        return this.instance;
    }
}

export default class QuestionAnswerService {
    /**
     * Answers the given question based on the provided context.
     * @param {string} question - The question to answer.
     * @param {string} context - The context in which to find the answer.
     * @param {function} progressCallback - Optional callback for progress updates.
     * @param {function} partialOutputCallback - Optional callback for partial output updates.
     */
    static async Answer(question, context, progressCallback = null, partialOutputCallback = null) {
        // Retrieve the translation pipeline. When called for the first time,
        // this will load the pipeline and save it for future use.
        const answerer = await QuestionAnsweringPipeline.getInstance(progressCallback);

        // Perform the translation
        const output = await answerer(question, context, {
            callback_function: partialOutputCallback
                ? (x) => {
                      partialOutputCallback(
                          answerer.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true })
                      );
                  }
                : null,
        });

        return output;
    }
}
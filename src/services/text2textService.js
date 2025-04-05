import { pipeline } from '@xenova/transformers';

class Text2TextGenerationPipeline {
    /**
     * This class uses the Singleton pattern to ensure that only one instance of the
     * pipeline is loaded. This is because loading the pipeline is an expensive
     * operation and we don't want to do it every time we want to generate text.
     */
    // The task and model are hardcoded for the LaMini-Flan-T5-783M model.
    // This model is a smaller version of the T5 model and is used for text-to-text
    // generation tasks. The task is set to 'text2text-generation' which is the
    // standard task for this type of model.
    // The model is loaded from the Xenova model hub.
    // The instance variable is used to store the pipeline instance once it is created.
    // This allows us to reuse the same instance for multiple calls to the
    // getInstance method, which avoids the overhead of loading the pipeline multiple times.
    // The getInstance method is static and returns a promise that resolves to the
    // pipeline instance. If the instance is null, it creates a new pipeline instance
    // and assigns it to the instance variable. It also accepts an optional progress
    // callback function that can be used to track the progress of the pipeline loading.
    static task = 'text2text-generation';
    static model = 'Xenova/LaMini-Flan-T5-783M';
    static instance = null;

    static async getInstance(progressCallback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback: progressCallback });
        }

        return this.instance;
    }
}

/**
 * Text2TextService class that uses the Singleton pattern to
 * ensure that only one instance of the text generation pipeline is loaded.
 * The class provides a static method to generate text based on the input text.
 * The pipeline is loaded from the Xenova model hub and is used for text-to-text
 * generation tasks. The class also accepts optional progress and partial output
 * callback functions to track the progress of the pipeline loading and the
 * generation process. The generated text is returned as a promise.
*/
export default class Text2TextService {
    /**
     * Generates text based on the given input text.
     * @param {string} text - The input text to generate text from.
     * @param {function} progressCallback - Optional callback for progress updates.
     * @param {function} partialOutputCallback - Optional callback for partial output updates.
     * @returns {Promise<string>} - The generated text.
     */
    static async generate(text, max_new_tokens = 100, progressCallback = null, partialOutputCallback = null) {
        // Retrieve the text generation pipeline. When called for the first time,
        // this will load the pipeline and save it for future use.
        const generator = await Text2TextGenerationPipeline.getInstance(progressCallback);

        // Perform the text generation
        const output = await generator(text, {
            max_new_tokens,
            callback_function: partialOutputCallback
                ? (x) => {
                      partialOutputCallback(
                          generator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: false })
                      );
                  }
                : null,
        });

        return output;
    }
}

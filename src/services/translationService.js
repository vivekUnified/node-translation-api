import { pipeline } from '@xenova/transformers';

/**
 * This class uses the Singleton pattern to ensure that only one instance of the
 * pipeline is loaded. This is because loading the pipeline is an expensive
 * operation and we don't want to do it every time we want to translate a sentence.
 */
class TranslationPipeline {
    static task = 'translation';
    static model = 'Xenova/nllb-200-distilled-600M';
    static instance = null;

    static async getInstance(progressCallback = null) {
        if (this.instance === null) {
            this.instance = pipeline(this.task, this.model, { progress_callback: progressCallback });
        }

        return this.instance;
    }
}

export default class TranslationService {
    /**
     * Translates the given text from the source language to the target language.
     * @param {string} text - The text to translate.
     * @param {string} srcLang - The source language code.
     * @param {string} tgtLang - The target language code.
     * @param {function} progressCallback - Optional callback for progress updates.
     * @param {function} partialOutputCallback - Optional callback for partial output updates.
     * @returns {Promise<string>} - The translated text.
     */
    static async translate(text, srcLang, tgtLang, progressCallback = null, partialOutputCallback = null) {
        // Retrieve the translation pipeline. When called for the first time,
        // this will load the pipeline and save it for future use.
        const translator = await TranslationPipeline.getInstance(progressCallback);

        // Perform the translation
        const output = await translator(text, {
            tgt_lang: tgtLang,
            src_lang: srcLang,
            callback_function: partialOutputCallback
                ? (x) => {
                      partialOutputCallback(
                          translator.tokenizer.decode(x[0].output_token_ids, { skip_special_tokens: true })
                      );
                  }
                : null,
        });

        return output;
    }
}
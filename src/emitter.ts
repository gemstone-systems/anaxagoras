import { emitZodContent } from "./emitters/zod.js";
import type { GenerateOptions } from "./generate.js";
import type { OutputFile, ResolvedLexicons } from "./types/index.js";

/**
 * Walk each lexicon def and emit Zod schema code as TypeScript source strings.
 */
export function emit(
    resolved: ResolvedLexicons,
    _options: GenerateOptions,
): Array<OutputFile> {
    const files: Array<OutputFile> = [];

    for (const nsid of resolved.order) {
        const doc = resolved.lexicons.get(nsid);
        if (!doc) continue;

        const path = nsid.replace(/\./g, "/") + ".ts";

        // TODO: implement type-to-zod emission
        files.push({
            path,
            content: emitZodContent(doc),
            nsid,
        });

        void doc;
    }

    return files;
}

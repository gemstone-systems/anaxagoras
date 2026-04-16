import type { GenerateOptions } from "./generate.js";
import type { OutputFile, ResolvedLexicons } from "./types.js";

/**
 * Walk each lexicon def and emit Zod schema code as TypeScript source strings.
 */
export function emit(
    resolved: ResolvedLexicons,
    _options: GenerateOptions,
): OutputFile[] {
    const files: OutputFile[] = [];

    for (const nsid of resolved.order) {
        const doc = resolved.lexicons.get(nsid)!;
        const path = nsid.replace(/\./g, "/") + ".ts";

        // TODO: implement type-to-zod emission
        files.push({
            path,
            content: `// ${nsid}\n// TODO: generate schema\n`,
            nsid,
        });

        void doc;
    }

    return files;
}

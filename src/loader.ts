import fg from "fast-glob";
import { readFile } from "node:fs/promises";
import type { LexiconDoc } from "./types/index.js";

/**
 * Recursively find and parse all lexicon JSON files under the given directory.
 * Returns a Map keyed by NSID.
 */
export async function load(inputDir: string): Promise<Map<string, LexiconDoc>> {
    const files = await fg("**/*.json", { cwd: inputDir, absolute: true });
    const lexicons = new Map<string, LexiconDoc>();

    for (const file of files) {
        // i don't like the `as` casting here but we do a quick sanity check after so it's fine.
        const raw = JSON.parse(await readFile(file, "utf-8")) as LexiconDoc;
        if (raw.lexicon !== 1 || !raw.id) continue;

        lexicons.set(raw.id, raw);
    }

    console.log(`Loaded ${lexicons.size.toString()} lexicon(s)`);
    return lexicons;
}

import fg from "fast-glob";
import { readFile } from "node:fs/promises";
import type { LexiconDoc } from "./types.js";

/**
 * Recursively find and parse all lexicon JSON files under the given directory.
 * Returns a Map keyed by NSID.
 */
export async function load(inputDir: string): Promise<Map<string, LexiconDoc>> {
    const files = await fg("**/*.json", { cwd: inputDir, absolute: true });
    const lexicons = new Map<string, LexiconDoc>();

    for (const file of files) {
        const raw = JSON.parse(await readFile(file, "utf-8")) as LexiconDoc;

        if (raw.lexicon !== 1 || !raw.id) continue;

        lexicons.set(raw.id, raw);
    }

    console.log(`Loaded ${lexicons.size} lexicon(s)`);
    return lexicons;
}

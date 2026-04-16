import type { LexiconDoc, ResolvedLexicons } from "./types.js";

/**
 * Build a dependency graph from ref fields, topological-sort the lexicons,
 * and detect cycles (which will need z.lazy() in the emitter).
 */
export function resolve(lexicons: Map<string, LexiconDoc>): ResolvedLexicons {
    // TODO: implement ref resolution, cycle detection, topological sort
    return {
        lexicons,
        order: [...lexicons.keys()],
        cycles: new Set(),
    };
}

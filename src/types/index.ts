import type { LexiconDef } from "./lexicon/primary.js";

/** Raw lexicon document as parsed from JSON. */
export interface LexiconDoc {
    lexicon: number;
    id: string;
    defs: Record<string, LexiconDef>;
}

/** Output of the resolver stage. */
export interface ResolvedLexicons {
    lexicons: Map<string, LexiconDoc>;
    /** NSIDs in topological order (dependencies first). */
    order: Array<string>;
    /** NSIDs involved in circular refs (need z.lazy()). */
    cycles: Set<string>;
}

/** A generated file ready to be written to disk. */
export interface OutputFile {
    path: string;
    content: string;
    nsid: string;
}

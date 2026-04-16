/** Raw lexicon document as parsed from JSON. */
export interface LexiconDoc {
    lexicon: number;
    id: string;
    defs: Record<string, LexiconDef>;
}

export interface LexiconDef {
    type: string;
    description?: string;
    key?: string;
    record?: LexiconObject;
    properties?: Record<string, LexiconProperty>;
    required?: string[];
    // query/procedure
    params?: LexiconObject;
    input?: { encoding: string; schema?: LexiconObject };
    output?: { encoding: string; schema?: LexiconObject };
}

export interface LexiconObject {
    type: "object";
    properties?: Record<string, LexiconProperty>;
    required?: string[];
}

export interface LexiconProperty {
    type: string;
    description?: string;
    // string constraints
    format?: string;
    minLength?: number;
    maxLength?: number;
    minGraphemes?: number;
    maxGraphemes?: number;
    enum?: string[];
    const?: string | number;
    knownValues?: string[];
    // number constraints
    minimum?: number;
    maximum?: number;
    // ref
    ref?: string;
    // array
    items?: LexiconProperty;
    // union
    refs?: string[];
    closed?: boolean;
}

/** Output of the resolver stage. */
export interface ResolvedLexicons {
    lexicons: Map<string, LexiconDoc>;
    /** NSIDs in topological order (dependencies first). */
    order: string[];
    /** NSIDs involved in circular refs (need z.lazy()). */
    cycles: Set<string>;
}

/** A generated file ready to be written to disk. */
export interface OutputFile {
    path: string;
    content: string;
    nsid: string;
}

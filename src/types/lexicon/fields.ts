import type { Enumify } from "../../utils/enumify.js";

export const LexiconFieldType = {
    BOOLEAN: "boolean",
    INTEGER: "integer",
    STRING: "string",
    BYTES: "bytes",
    CID_LINK: "cid-link",
    ARRAY: "array",
    OBJECT: "object",
    BLOB: "blob",
    PARAMS: "params",
    PERMISSION: "permission",
    TOKEN: "token",
    REF: "ref",
    UNION: "union",
    UNKNOWN: "unknown",
};

export type LexiconFieldType = Enumify<typeof LexiconFieldType>;

interface LexiconFieldBase {
    type: LexiconFieldType;
    description?: string;
}

export interface LexiconBoolean extends LexiconFieldBase {
    type: "boolean";
    default?: boolean;
    const?: boolean;
}

export interface LexiconInteger extends LexiconFieldBase {
    type: "integer";
    minimum?: number;
    maximum?: number;
    enum?: Array<number>;
    default?: number;
    const: number;
}

export interface LexiconString extends LexiconFieldBase {
    type: "string";
    format?: string;
    maxLength?: number;
    minLength?: number;
    maxGraphemes?: number;
    minGraphemes?: number;
    knownValues?: Array<string>;
    enum?: Array<string>;
    default?: string;
    const?: string;
}

export interface LexiconBytes extends LexiconFieldBase {
    type: "bytes";
    minLength?: number;
    maxLength?: number;
}

export interface LexiconCIDLink extends LexiconFieldBase {
    type: "cid-link";
}

export interface LexiconArray extends LexiconFieldBase {
    type: "array";
    items: LexiconField;
    minLength?: number;
    maxLength?: number;
}

export interface LexiconObject extends LexiconFieldBase {
    type: "object";
    properties?: Record<string, LexiconField>;
    required?: Array<string>;
}

export interface LexiconBlob extends LexiconFieldBase {
    type: "blob";
    aceept?: Array<string>;
    maxSize?: number;
}

// Can only appear in query, procedure, or subscription params field. Cannot appear in lexicon objects.
export interface LexiconParams extends LexiconFieldBase {
    type: "params";
    required?: Array<string>;
    properties: unknown;
}

// Can only appear in permission-set permissions field. Cannot appear in lexicon objects.
export interface LexiconPermission extends LexiconFieldBase {
    type: "permission";
    resource: string;
    repo?: {
        collection: Array<string>;
        action?: Array<string>;
    };
    rpc?: {
        lxm: Array<string>;
        aud?: string;
        inheritAud?: boolean;
    };
}

export interface LexiconToken extends LexiconFieldBase {
    type: "token";
}

export interface LexiconRef extends LexiconFieldBase {
    type: "ref";
    ref: string;
}

export interface LexiconUnion extends LexiconFieldBase {
    type: "union";
    refs: Array<string>;
    closed?: boolean;
}

export interface LexiconUnknown extends LexiconFieldBase {
    type: "unknown";
}

export type LexiconField =
    | LexiconBoolean
    | LexiconInteger
    | LexiconString
    | LexiconBytes
    | LexiconCIDLink
    | LexiconArray
    | LexiconObject
    | LexiconBlob
    | LexiconToken
    | LexiconRef
    | LexiconUnion
    | LexiconUnknown;

import type { Enumify } from "../../utils/enumify.js";
import type { LexiconObject, LexiconPermission } from "./fields.js";

export const LexiconDefTypes = {
    RECORD: "record",
    QUERY: "query",
    PROCEDURE: "procedure",
    SUBSCRIPTION: "subscription",
    PERMISSION_SET: "permission-set",
};

export type LexiconDefTypes = Enumify<typeof LexiconDefTypes>;

interface LexiconDefBase {
    type: LexiconDefTypes;
    description?: string;
}

export interface LexiconDefRecord extends LexiconDefBase {
    type: "record";
    key?: string;
    record?: LexiconObject;
}

export interface LexiconDefQuery extends LexiconDefBase {
    type: "query";
    params?: LexiconObject;
    output?: { encoding: string; schema?: LexiconObject; description?: string };
    errors: Array<{ name: string; description?: string }>;
}

export interface LexiconDefProcedure extends LexiconDefBase {
    type: "query";
    params?: LexiconObject;
    output?: { encoding: string; schema?: LexiconObject; description?: string };
    input?: { encoding: string; schema?: LexiconObject; description?: string };
    errors: Array<{ name: string; description?: string }>;
}

export interface LexiconDefSubscription extends LexiconDefBase {
    type: "subscription";
    params?: LexiconObject;
    message: { description?: string; schema: LexiconObject };
    errors: Array<{ name: string; description?: string }>;
}

export interface LexiconDefPermissions extends LexiconDefBase {
    type: "permission-set";
    title?: string;
    "title:lang": Record<string, string>;
    detail?: string;
    "detail:lang": Record<string, string>;
    permissions: Array<LexiconPermission>;
}

export type LexiconDef =
    | LexiconDefRecord
    | LexiconDefQuery
    | LexiconDefProcedure
    | LexiconDefSubscription
    | LexiconDefPermissions;

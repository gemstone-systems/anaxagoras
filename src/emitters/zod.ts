import type { LexiconDoc } from "../types/index.js";
import { nsidToCamelCase } from "../utils/strings.js";

export const emitZodContent = (doc: LexiconDoc) => {
    const { defs, id: nsid } = doc;
    return Object.entries(defs)
        .map(([name, def]) => {
            return `export const ${nsidToCamelCase(nsid)}${name.charAt(0).toUpperCase().concat(name.substring(1, name.length))}Schema`;
        })
        .join("\n");
};

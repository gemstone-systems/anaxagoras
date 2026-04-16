import { load } from "./loader.js";
import { resolve } from "./resolver.js";
import { emit } from "./emitter.js";
import { write } from "./writer.js";

export interface GenerateOptions {
    input: string;
    output: string;
    strict: boolean;
    allowExternal: boolean;
}

export async function generate(options: GenerateOptions): Promise<void> {
    const lexicons = await load(options.input);
    const resolved = resolve(lexicons);
    const files = emit(resolved, options);
    await write(files, options.output);
}

import { parseArgs } from "node:util";
import { generate } from "./generate.js";

const { values } = parseArgs({
    options: {
        input: { type: "string", short: "i" },
        output: { type: "string", short: "o" },
        strict: { type: "boolean", default: false },
        "allow-external": { type: "boolean", default: false },
    },
});

if (!values.input || !values.output) {
    console.error(
        "Usage: anaxagoras generate --input <dir> --output <dir> [--strict] [--allow-external]",
    );
    process.exit(1);
}

await generate({
    input: values.input,
    output: values.output,
    strict: values.strict ?? false,
    allowExternal: values["allow-external"] ?? false,
});

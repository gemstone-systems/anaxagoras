import { mkdir, writeFile } from "node:fs/promises";
import { dirname, join } from "node:path";
import type { OutputFile } from "./types/index.js";

/**
 * Write generated .ts files to the output directory and create a barrel index.
 */
export async function write(
    files: Array<OutputFile>,
    outputDir: string,
): Promise<void> {
    for (const file of files) {
        const fullPath = join(outputDir, file.path);
        await mkdir(dirname(fullPath), { recursive: true });
        await writeFile(fullPath, file.content, "utf-8");
    }

    // Generate barrel index
    const exports = files
        .map((f) => {
            const importPath = "./" + f.path.replace(/\.ts$/, ".js");
            const name = f.nsid.replace(/\./g, "_");
            return `export * as ${name} from "${importPath}";`;
        })
        .join("\n");

    await writeFile(join(outputDir, "index.ts"), exports + "\n", "utf-8");

    console.log(`Wrote ${files.length.toString()} file(s) to ${outputDir}`);
}

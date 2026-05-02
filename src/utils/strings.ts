export const nsidToCamelCase = (nsid: string) =>
    nsid
        .split(".")
        .map((f, i) =>
            i > 0
                ? f.charAt(0).toUpperCase().concat(f.substring(1, f.length))
                : f,
        )
        .join("");

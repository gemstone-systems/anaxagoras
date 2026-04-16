/** Custom validators for AT Protocol string formats. */

export const isDid = (v: string): boolean => v.startsWith("did:");
export const isAtUri = (v: string): boolean => v.startsWith("at://");
export const isHandle = (v: string): boolean =>
    /^([a-zA-Z0-9]([a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,}$/.test(v);
export const isTid = (v: string): boolean => /^[234567abcdefghij]{13}$/.test(v);
export const isNsid = (v: string): boolean =>
    /^[a-z][a-zA-Z0-9]*(\.[a-z][a-zA-Z0-9]*)+$/.test(v);
export const isRecordKey = (v: string): boolean =>
    v.length > 0 && !v.includes("/");
export const isCid = (v: string): boolean => v.length > 0;
export const isLanguage = (v: string): boolean =>
    /^[a-z]{2,3}(-[a-zA-Z0-9]+)*$/.test(v);

export const graphemeLen = (v: string): number =>
    [...new Intl.Segmenter().segment(v)].length;

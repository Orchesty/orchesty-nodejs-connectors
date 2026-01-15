/**
 * @param ref /c/demo/cenik/2.json
 * @return string 2
 */
export function parseFlexiBeeId(ref: string): string {
    const res = /\/(?<id>\d+)\.json/.exec(ref);

    return res?.groups?.id ?? '';
}

/**
 * @param ref /c/demo/cenik/2.json
 * @return string cenik/2.json
 */
export function parseFlexiBeeUri(ref: string): string {
    const res = /(?<uri>[^/]+\/\d+.json)/.exec(ref);

    return res?.groups?.uri ?? '';
}

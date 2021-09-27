export function flattenArray(input: [number, number][]): string {
    const flat = input.map(pair => {
        return pair.join(',');
    }).join('],[');

    return `[${flat}]`;
}

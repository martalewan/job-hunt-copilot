const htmlEntities: Record<string, string> = {
    amp: '&',
    apos: "'",
    gt: '>',
    laquo: '«',
    ldquo: '"',
    lsaquo: '‹',
    lsquo: "'",
    lt: '<',
    mdash: '-',
    ndash: '-',
    nbsp: ' ',
    quot: '"',
    raquo: '»',
    rdquo: '"',
    rsaquo: '›',
    rsquo: "'",
};

export function cleanText(value: string): string {
    return decodeMojibake(value)
        .replace(/<br\s*\/?>/gi, ' ')
        .replace(/<[^>]*>/g, ' ')
        .replace(/&(#\d+|#x[\da-f]+|[a-z]+);/gi, decodeEntity)
        .replace(/\u00a0/g, ' ')
        .replace(/[“”]/g, '"')
        .replace(/[‘’]/g, "'")
        .replace(/[–—]/g, '-')
        .replace(/^\s*(\.{3}|…)\s*/g, '')
        .replace(/\s*(\.{3}|…)\s*$/g, '')
        .replace(/\s+/g, ' ')
        .trim();
}

function decodeEntity(match: string, entity: string): string {
    const normalized = entity.toLowerCase();

    if (normalized.startsWith('#x')) {
        return fromCodePoint(Number.parseInt(normalized.slice(2), 16), match);
    }

    if (normalized.startsWith('#')) {
        return fromCodePoint(Number.parseInt(normalized.slice(1), 10), match);
    }

    return htmlEntities[normalized] ?? match;
}

function fromCodePoint(codePoint: number, fallback: string): string {
    return Number.isFinite(codePoint) ? String.fromCodePoint(codePoint) : fallback;
}

function decodeMojibake(value: string): string {
    if (!/[ÃÂâ][\s\S]?/.test(value)) return value;

    return value
        .replace(/â¦/g, '...')
        .replace(/â|â/g, '-')
        .replace(/â|â/g, "'")
        .replace(/â|â/g, '"')
        .replace(/Â /g, ' ');
}

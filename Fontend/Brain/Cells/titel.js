export function shortenText(text, maxLength) {
    if (typeof text !== 'string') return '';
    return text.length > maxLength
        ? text.slice(0, maxLength).trim() + '...'
        : text;
}
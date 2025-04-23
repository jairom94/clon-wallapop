export function fromBase64toImage(imagenBase64,formato) {
    return `data:image/${formato};base64,${imagenBase64}`;
}
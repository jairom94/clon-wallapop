export function fromBase64toImage(imagenBase64, formato) {
    return `data:image/${formato};base64,${imagenBase64}`;
}

export function crearArchivoDesdeBase64({ nombre, formato, datos_base64 }) {
    // Limpiar el base64 (quitar prefijo si existe)
    const base64Limpio = datos_base64
        .split(',')[1] // Si tiene prefijo data:..., lo separamos
        ?.trim() || datos_base64.trim(); // Limpiar espacios

    // Validar que sea base64
    try {
        atob(base64Limpio);
    } catch (e) {
        throw new Error("El string no es base64 válido");
    }

    // Tipo MIME (corregir formato si es necesario)
    const mimeType = `image/${formato === 'jpg' ? 'jpeg' : formato === 'png' ? 'png' : formato
        }`;

    // Decodificar
    const byteCharacters = atob(base64Limpio);
    const byteArrays = new Uint8Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
        byteArrays[i] = byteCharacters.charCodeAt(i);
    }

    // Crear File
    return new File([byteArrays], nombre, { type: mimeType });
}
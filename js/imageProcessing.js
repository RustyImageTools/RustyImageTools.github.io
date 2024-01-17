import init, { resize_image, analyze_image} from '../rust_image_resizer.js';

export async function processImage(imageBytes, width, height, format, filter) {
    await init();
    const resizedImageBytes = resize_image(imageBytes, width, height, format, filter);
    return new Blob([resizedImageBytes], { type: `image/${format}` });
}

export async function analyizeImage(imageBytes) {
    await init();
    const {exif_data, unique_colors} = analyze_image(imageBytes);
    return {unique_colors: unique_colors, exifData: exif_data};
}

export function downloadImage(blob, format) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `resized-image.${format}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

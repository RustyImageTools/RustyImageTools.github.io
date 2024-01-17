import { ui, displayFileName, displayImagePreview, displayImageExport, displayUniqueColors, displayExifData} from './ui.js';
import { processImage, analyizeImage, downloadImage } from './imageProcessing.js';
import { readAsArrayBuffer } from './fileHandlers.js';

let selectedImageBytes = null;

// Setup event listeners for UI interactions
function setUpEventListeners() {
    ui.imageInput.addEventListener('change', handleImageUpload);
    ui.resizeButton.addEventListener('click', triggerResize);
    ui.dropZone.addEventListener('dragover', preventDefaults, false);
    ui.dropZone.addEventListener('dragenter', preventDefaults, false);
    ui.dropZone.addEventListener('dragleave', preventDefaults, false);
    ui.dropZone.addEventListener('drop', handleDrop, false);
    ui.dropZone.addEventListener('click', () => ui.imageInput.click());
}

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Trigger image resize process
function triggerResize() {
    const width = parseInt(ui.widthInput.value, 10);
    const height = parseInt(ui.heightInput.value, 10);
    const format = ui.formatSelect.value;
    const filter = ui.filterSelect.value;

    if (!selectedImageBytes || isNaN(width) || isNaN(height)) {
        console.error("Invalid input for resizing");
        return;
    }

    processImage(selectedImageBytes, width, height, format, filter)
        .then(blob => downloadImage(blob, format))
        .catch(err => console.error("Error processing image:", err));
}

// Handle image file upload
function handleImageUpload() {
    const file = ui.imageInput.files[0];
    if (file) {

        readAsArrayBuffer(file, (imageBytes) => {
            selectedImageBytes = imageBytes;

            analyizeImage(selectedImageBytes)
                .then(data => displayInfo(data))
                .catch(err => console.error("Error processing image:", err));

            displayFileName(file.name);
            displayImagePreview(file);
            displayImageExport();
        });
    }
}

function displayInfo(data) {
    let { unique_colors, exifData } = data;
    displayUniqueColors(unique_colors);
    displayExifData(exifData);
}

// Handle file drop
function handleDrop(e) {
    preventDefaults(e);
    const file = e.dataTransfer.files[0];
    if (file) {
        readAsArrayBuffer(file, (imageBytes) => {
            selectedImageBytes = imageBytes;
            displayFileName(file.name);
            displayImagePreview(file);
        });
    }
}

setUpEventListeners();
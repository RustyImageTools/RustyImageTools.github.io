export const ui = {
    imageInput: document.getElementById('imageInput'),
    widthInput: document.getElementById('widthInput'),
    heightInput: document.getElementById('heightInput'),
    resizeButton: document.getElementById('resizeButton'),
    formatSelect: document.getElementById('formatSelect'),
    filterSelect: document.getElementById('filterSelect'),
    fileNameDisplay: document.getElementById('fileName'),
    dropZone: document.getElementById('dropZone'),
    previewContainer: document.getElementById('previewContainer'),
    imageExport: document.getElementById('imageExport'),
    exifDataDisplay: document.getElementById('exifDataDisplay'),
    colorsDisplay: document.getElementById('colorsDisplay')
};

export function displayFileName(name) {
    ui.fileNameDisplay.textContent = `Selected File: ${name}`;
}

export function displayImagePreview(file) {
    const imgPreview = new Image();
    imgPreview.src = URL.createObjectURL(file);
    imgPreview.classList = ["w-full"];

    ui.previewContainer.innerHTML = '';
    ui.previewContainer.appendChild(imgPreview);
}

export function displayImageExport(){
    ui.imageExport.classList.remove("hidden")
}

export function displayUniqueColors(colors) {
    // Clear previous colors
    ui.colorsDisplay.innerHTML = '<h2 class="mb-4 text-xl font-black">Unique Colors Found in Image</h3>';
    ui.colorsDisplay.classList.remove("hidden")

    colors.forEach(color => {
        const colorDiv = document.createElement('div');
        colorDiv.style.backgroundColor = color;
        colorDiv.style.width = '50px';
        colorDiv.style.height = '50px';
        colorDiv.style.display = 'inline-block';
        colorDiv.style.margin = '5px';
        colorDiv.title = color; // Tooltip to show color code on hover
        
        colorsDisplay.appendChild(colorDiv);
    });
}

/**
 * Displays EXIF tags in the UI.
 * @param {Object} exifData The EXIF data to display, as an object of tag names to values.
 */
export function displayExifData(exifData) {
    let list = '<h2 class="mb-6 text-xl font-black">Exif Meta</h2>';
    for (const [tag, value] of exifData) {
        const html = `
        <div class="lg:flex text-left my-2">
            <div class="lg:w-1/2 ">${tag}</div>
            <div class="lg:w-1/2 font-black">${value}</div>
        </div>
        <hr />
        `
        list = list.concat(html);
    }
    ui.exifDataDisplay.innerHTML = list;
    ui.exifDataDisplay.classList.remove("hidden");
}
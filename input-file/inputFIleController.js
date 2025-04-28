import { clearImages, dropMessage, errorMessage, inputFileView } from "./inputFileView.js";

export function inputFileController($dropZone,idInputFile,name) {
    // const $dropZone = document.querySelector('.drop-zone');
    const formatFiles = ['image/png', 'image/jpeg'];
    const $previewImages = $dropZone.nextElementSibling//.querySelector('#preview-container-create')
    console.log($previewImages);
    // return
    
    const $errorMessage = errorMessage('Formato incorrecto.')
    let objectURLs = [];

    const $inputFile = buildInputFile($dropZone,idInputFile,name, formatFiles);
    buildEnviromentDragAndDrop($dropZone);



    $dropZone.addEventListener('drop', function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        // Validar tipos de archivo
        const validFiles = validateFiles(files, formatFiles)

        if (validFiles.length > 0) {
            $dropZone.classList.remove('error-format');
            $errorMessage.remove();
            // Crear un nuevo DataTransfer para asignar los archivos válidos
            const dataTransfer = new DataTransfer();
            validFiles.forEach(file => dataTransfer.items.add(file));

            clearPreviews(objectURLs, $previewImages)
            displayPreviews(validFiles, $inputFile, objectURLs)
            // Asignar los archivos al input
            $inputFile.files = dataTransfer.files;

            // Disparar evento change para manejar la subida
            const event = new Event('change');
            $inputFile.dispatchEvent(event);
        } else {            
            $dropZone.classList.add('error-format')
            $dropZone.appendChild($errorMessage)
        }


    }, false);


    $inputFile.addEventListener('change', function (e) {
        const validFiles = validateFiles(this.files, formatFiles);

        if (validFiles.length > 0) {
            $dropZone.classList.remove('error-format');
            $errorMessage.remove();
            // Actualizar archivos válidos en el input
            const dataTransfer = new DataTransfer();
            validFiles.forEach(file => dataTransfer.items.add(file));
            this.files = dataTransfer.files;

            clearPreviews(objectURLs, $previewImages)
            displayPreviews(validFiles, $inputFile, objectURLs)
        }else {
            $dropZone.classList.add('error-format')
            $dropZone.appendChild($errorMessage)
        }


    })

    return {
        inputFile() {
            return $inputFile
        }
    }
}

function buildEnviromentDragAndDrop($dropZone) {
    const eventsDragDrop = ['dragenter', 'dragover', 'dragleave', 'drop']
    eventsDragDrop.forEach(eventName => {
        $dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        $dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        $dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        $dropZone.classList.add('dragover');
    }

    function unhighlight(e) {
        $dropZone.classList.remove('dragover');
    }
}

function buildInputFile($dropZone, idInputFile,name, formatFiles) {
    const $inputFile = inputFileView({
        id: idInputFile,
        format: formatFiles.join(', '),
        name
    });

    $dropZone.appendChild($inputFile)
    $dropZone.appendChild(dropMessage('Arrastra tus imágenes aquí o haz clic para seleccionar'))
    return $inputFile;
}

function clearPreviews(objectURLs, $previewImages) {
    // Liberar memoria de las URLs
    objectURLs.forEach(url => URL.revokeObjectURL(url));
    objectURLs = [];

    clearImages($previewImages);
}

function removePreview(index_, $previewImages, fileInput, objectURLs) {
    // Eliminar archivo del input
    const dataTransfer = new DataTransfer();
    let files = Array.from(fileInput.files);
    // files.splice(index, 1);
    files = files.filter((file, index) => index !== index_)
    // console.log(files);

    files.forEach(file => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;

    // Volver a generar previsualizaciones
    clearPreviews(objectURLs, $previewImages);
    displayPreviews(files, fileInput, objectURLs)
}

function validateFiles(files, formatFiles) {
    return Array.from(files).filter(file =>
        formatFiles.includes(file.type)
    );

}

function displayPreviews(files, $inputFile, objectURLs) {
    const $previewImages = document.querySelector('#preview-container-create')
    files.forEach((file, index) => {
        const $containerImages = document.createElement('div')
        $containerImages.classList.add('image-container')

        const $imgPreview = document.createElement('img')
        $imgPreview.classList.add('preview-image')

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '×';
        removeBtn.type = 'button'

        const objectUrl = URL.createObjectURL(file);
        objectURLs.push(objectUrl)
        $imgPreview.src = objectUrl

        removeBtn.addEventListener('click', (e) => {
            e.preventDefault()
            removePreview(index, $previewImages, $inputFile, objectURLs)
        })

        $containerImages.appendChild($imgPreview);
        $containerImages.appendChild(removeBtn);
        $previewImages.appendChild($containerImages);
    })


}
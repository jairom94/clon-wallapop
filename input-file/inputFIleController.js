import { clearImages, dropMessage, inputFileView } from "./inputFileView.js";

export function inputFileController() {
    const $dropZone = document.querySelector('.drop-zone');
    const formatFiles = ['image/png', 'image/jpeg'];
    const $previewImages = document.querySelector('.preview-container')
    let objectURLs = []; 

    const $inputFile = buildUIDragDrop($dropZone,formatFiles);
    buildEnviromentDragAndDrop($dropZone);

    

    $dropZone.addEventListener('drop', function handleDrop(e) {
        const dt = e.dataTransfer;
        const files = dt.files;

        // Validar tipos de archivo
        const validFiles = validateFiles(files,formatFiles)

        if (validFiles.length > 0) {
            // Crear un nuevo DataTransfer para asignar los archivos válidos
            const dataTransfer = new DataTransfer();
            validFiles.forEach(file => dataTransfer.items.add(file));

            clearPreviews(objectURLs,$previewImages)
            displayPreviews(validFiles,$inputFile,objectURLs)
            // Asignar los archivos al input
            $inputFile.files = dataTransfer.files;

            // Opcional: Disparar evento change para manejar la subida
            const event = new Event('change');
            $inputFile.dispatchEvent(event);
        } else {
            alert('Solo se permiten archivos PNG y JPEG');
            // throw new Error('Solo se permiten archivos PNG y JPEG');
        }


    }, false);

    // console.log($inputFile);
    
    $inputFile.addEventListener('change',function (e){
        const validFiles = validateFiles(this.files,formatFiles);
        console.log(validFiles);
        
        // Actualizar archivos válidos en el input
        const dataTransfer = new DataTransfer();
        validFiles.forEach(file => dataTransfer.items.add(file));
        this.files = dataTransfer.files;
        
        clearPreviews(objectURLs,$previewImages)
        displayPreviews(validFiles,$inputFile,objectURLs)
        // console.log('se ha cambiado los archivos');
        
    })

    return {
        inputFile(){
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

function buildUIDragDrop($dropZone, formatFiles){
    const $inputFile = inputFileView({
        id: 'fileInput',
        format: formatFiles.join(', ')
    });

    $dropZone.appendChild($inputFile)
    $dropZone.appendChild(dropMessage('Arrastra tus imágenes aquí o haz clic para seleccionar'))
    return $inputFile;
}

function clearPreviews(objectURLs,$previewImages) {
    // Liberar memoria de las URLs
    objectURLs.forEach(url => URL.revokeObjectURL(url));
    objectURLs = [];
    
    clearImages($previewImages);
}

function removePreview(index_,$previewImages, fileInput, objectURLs) {
    // Eliminar archivo del input
    const dataTransfer = new DataTransfer();
    let files = Array.from(fileInput.files);
    // files.splice(index, 1);
    files = files.filter((file,index) => index !== index_)
    console.log(files);
    
    files.forEach(file => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;
    
    // Volver a generar previsualizaciones
    clearPreviews(objectURLs,$previewImages);
    displayPreviews(files,fileInput,objectURLs)
}

function validateFiles(files,formatFiles) {
    return Array.from(files).filter(file =>
        formatFiles.includes(file.type)
    );

}

function displayPreviews(files,$inputFile,objectURLs) {
    const $previewImages = document.querySelector('.preview-container')
    files.forEach((file, index) => {
        const $containerImages = document.createElement('div')
        $containerImages.classList.add('image-container')

        const $imgPreview = document.createElement('img')
        $imgPreview.classList.add('preview-image')

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '×';

        const objectUrl = URL.createObjectURL(file);
        objectURLs.push(objectUrl)
        $imgPreview.src = objectUrl

        removeBtn.addEventListener('click',(e)=>{
            e.preventDefault()
            removePreview(index,$previewImages,$inputFile,objectURLs)
        })

        $containerImages.appendChild($imgPreview);
        $containerImages.appendChild(removeBtn);
        $previewImages.appendChild($containerImages);
    })


}
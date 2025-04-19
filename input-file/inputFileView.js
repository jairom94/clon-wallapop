export function inputFileView({id,format}) {
    const $inputFile = document.createElement('input');
    $inputFile.type = 'file'
    $inputFile.id = id
    $inputFile.multiple = true
    $inputFile.accept = format

    return $inputFile;
}

export function dropMessage(message){
    const $dropMessage = document.createElement('div');
    $dropMessage.classList.add('drop-message')
    $dropMessage.textContent = message

    return $dropMessage;
}

export function clearImages($previewImages) {        
    // Limpiar contenedor
    // const previewContainer = document.querySelector('.preview-container');
    $previewImages.innerHTML = '';
}

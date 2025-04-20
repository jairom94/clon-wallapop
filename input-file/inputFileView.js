export function inputFileView({id,format,name}) {
    const $inputFile = document.createElement('input');
    $inputFile.type = 'file'
    $inputFile.id = id
    $inputFile.multiple = true
    $inputFile.accept = format
    $inputFile.classList.add('fileInput')
    $inputFile.name = name

    return $inputFile;
}

export function dropMessage(message){
    const $dropMessage = document.createElement('div');
    $dropMessage.classList.add('drop-message')
    $dropMessage.textContent = message

    return $dropMessage;
}

export function clearImages($previewImages) {              
    $previewImages.innerHTML = '';
}

export function errorMessage(message) {
    const $errorCont = document.createElement('div');
    $errorCont.textContent = message
    $errorCont.classList.add('error-message')
    return $errorCont
}

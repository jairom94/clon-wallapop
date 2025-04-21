export function maxLengthByDescription( $maxLengthContainer,currentLength, maxLength) {
    // const $maxLengthContainer = document.createElement('p');
    // $maxLengthContainer.innerHTML = ''
    const $maxLength = document.createElement('span');
    $maxLength.textContent = `${currentLength}/${maxLength}`
    $maxLengthContainer.appendChild($maxLength)
    // $descriptionContainer.appendChild($maxLengthContainer)
    // return $maxLength
}
export function inputDescription($descriptionContainer) {
    const $description = document.createElement('textarea');
    let currentValue = '';
    const maxLength = 200;
    $description.rows = 3;    
    $description.name = 'description'
    $description.id = 'description'
    $description.maxLength = maxLength;
    $description.placeholder = 'Escribe una breve descripción del producto...'
    $description.addEventListener('keyup', (e) => {
        currentValue = $description.value;
    });
    $descriptionContainer.appendChild($description);
    return {
        getValue(){
            return currentValue;
        },
        getMaxLength(){
            return maxLength;
        },
        currentLength(){
            return currentValue.length;
        },
        getDescription(){
            return $description;
        }
    }
}
export function inputController($inputContainer,type='text',placeholder,errorMessage='El campo es obligatorio.') {
    // const $inputContainer = document.querySelector('.input-container');
    const $input = document.createElement('input');
    const $error = document.createElement('p');
    let valueInput = '';
    function buildInput(){
        // const $inputContainer = document.querySelector('.input-container');
        
        $input.type = type;
        $input.placeholder= ' ';
        $input.className = 'input-custom'
        $inputContainer.appendChild($input);
        const $placeholder = document.createElement('span')
        $placeholder.className = 'placeholder';
        $placeholder.textContent = placeholder;
        $inputContainer.appendChild($placeholder); 
        $inputContainer.appendChild($error);
        $error.textContent = errorMessage;
        
    }
    $input.addEventListener('keyup',(e)=>{        
        if(e.target.value !== ''){
            const $placeholder = $inputContainer.querySelector('.placeholder')            
            $placeholder.classList.add('writing')
            $inputContainer.classList.remove('border-error')
        }else{
            const $placeholder = $inputContainer.querySelector('.placeholder')            
            $placeholder.classList.remove('writing')
            
        }
        
    })
    $input.addEventListener('blur',(e)=>{
        if ($input.value === '') {
            $inputContainer.classList.add('border-error')
        }else {
            $inputContainer.classList.remove('border-error')
        }
    })
    
    return {
        showInput(){
            buildInput();
        },
        getInput(){
            return $input;
        },
        getValueInput(){
            return valueInput;
        }
    }
}
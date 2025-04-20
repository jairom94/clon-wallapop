export function createProductController() {
    const $formCreateProduct = document.querySelector('.form-create-product');

    $formCreateProduct.addEventListener('submit',(e)=>{
        e.preventDefault()
        const errors = []
        if (errors.length === 0) {
            const event = new CustomEvent('error-create-product');
            $formCreateProduct.dispatchEvent(event);
        }
    })
}
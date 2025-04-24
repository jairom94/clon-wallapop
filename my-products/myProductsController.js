import { getMyProducts } from "./myProductsModel.js";

export async function myProductsController(userID) {
    const $myProducts = document.querySelector('.my-products');
    try {
        const products = await getMyProducts(userID);
        console.log(products);
        
        products.forEach(product => {
            const $product = document.createElement('li');
            $product.classList.add('product');
            // $product.innerHTML = buildProduct(product);
            $product.innerHTML = 'producto'
            $myProducts.appendChild($product)
        });
        const eventSuccess = new CustomEvent('success-load-products');
        $myProducts.dispatchEvent(eventSuccess);
    } catch (error) {
        const event = new CustomEvent('error-load-products', {
            detail: error.message
        });
        $myProducts.dispatchEvent(event);        
    }
}
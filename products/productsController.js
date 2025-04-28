import { getProducts, getProductsPaginate } from "./productsModel.js";
import { buildProduct, whitoutConnection } from "./productsView.js";

export async function productsController(){
    const $producstContainer = document.querySelector('.products-list');
    try {
        const event = new CustomEvent('load-products-start')       
        $producstContainer.dispatchEvent(event)
        const products = await getProducts();
        const pPaginate = await getProductsPaginate();
        console.log(pPaginate);
        
        if (products.length > 0) {            
            $producstContainer.innerHTML = '';
            const alingCSS = products.length > 1 
                ? 'justify-center' 
                : 'justify-start'
            $producstContainer.classList.add(alingCSS);
            products.forEach(product => {            
                const $product = document.createElement('li');
                $product.classList.add('product');
                $product.innerHTML = buildProduct(product);
                $producstContainer.appendChild($product)
            });
        }else{
            $producstContainer.innerHTML = '<li>No hay productos registrados.</li>';
        }
        const eventFinishLoad = new CustomEvent('load-products-finished');
        $producstContainer.dispatchEvent(eventFinishLoad);
    } catch (error) {
        const event = new CustomEvent('error-load-products',{
            detail:error.message
        });
        $producstContainer.dispatchEvent(event);
        $producstContainer.innerHTML=whitoutConnection()

    } finally {
        
    }
}
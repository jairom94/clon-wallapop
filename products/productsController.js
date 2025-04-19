import { getProducts } from "./productsModel.js";

export async function productsController(){
    const $producstContainer = document.querySelector('.products-list');
    try {
        const event = new CustomEvent('load-products-start')       
        $producstContainer.dispatchEvent(event)
        const products = await getProducts();
    } catch (error) {
        const event = new CustomEvent('error-load-products',{
            detail:error.message
        });
        $producstContainer.dispatchEvent(event);
    } finally {
        const event = new CustomEvent('load-products-finished');
        $producstContainer.dispatchEvent(event);
    }
}
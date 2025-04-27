import { getMyProducts, removeProduct } from "./myProductsModel.js";
import { deleteConfirm, noProducts, tableToProducts } from "./myProductsView.js";

export async function myProductsController(userID) {
    const $myProducts = document.querySelector('.my-products');
    try {
        const products = await getMyProducts(userID);
        if (products.length > 0) {            
            // const flag = deleteConfirm($myProducts)
            tableToProducts($myProducts,products,async(productID=0)=>{
                await removeProduct(productID)                                
            },()=>{
                console.log(products);
                
            });
        }else{
            noProducts($myProducts);
        }
        const eventSuccess = new CustomEvent('success-load-products');
        $myProducts.dispatchEvent(eventSuccess);
    } catch (error) {
        const event = new CustomEvent('error-load-products', {
            detail: error.message
        });
        $myProducts.dispatchEvent(event);        
    }
}
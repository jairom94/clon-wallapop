import { productDetailModel } from "./productDetailModel.js";
import { loaderProductDetail, productDetail } from "./productDetailView.js";

export async function productDetailController(productID) {
    const $productDetail = document.querySelector('.product');

    try {
        $productDetail.innerHTML= loaderProductDetail();
        const eventLoading = new CustomEvent('loading-product',{
            detail:{
                type:'warning',
                message:'loading product.'
            }
        });
        $productDetail.dispatchEvent(eventLoading);
        const product = await productDetailModel(productID);
        const event = new CustomEvent('load-product-ok',{
            detail:{
                type:'success',
                message:'product load success.'
            }
        });
        $productDetail.dispatchEvent(event);
        console.log(product);
        
        $productDetail.innerHTML = productDetail(product);        
        
    } catch (error) {
        const event = new CustomEvent('error-load-product',{
            detail:error.message
        });
        $productDetail.dispatchEvent(event);
    }
}
import { notificationController } from "./notification/notificationController.js";
import { productDetailController } from "./product-detail/productDetailController.js";

document.addEventListener('DOMContentLoaded',()=>{
    const searchParams = new URLSearchParams(window.location.search);
    const productID = searchParams.get('id') ?? 0;


    const $productDetail = document.querySelector('.product');
    const notification = notificationController();
    $productDetail.addEventListener('error-load-product',(e)=>{
        notification.show(e.detail,'error')
    })
    $productDetail.addEventListener('loading-product',(e)=>{
        notification.show(e.detail.message,e.detail.type)
    });
    $productDetail.addEventListener('load-product-ok',(e)=>{
        notification.show(e.detail.message,e.detail.type)
    })    
    productDetailController(productID);
});
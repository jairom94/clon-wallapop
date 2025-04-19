import { notificationController } from "./notification/notificationController.js";
import { productsController } from "./products/productsController.js";

document.addEventListener('DOMContentLoaded',()=>{
    const $producstContainer = document.querySelector('.products-list');
    const notifications = notificationController();
    $producstContainer.addEventListener('load-products-start',(e)=>{
        notifications.show('loading...','info');
    })
    $producstContainer.addEventListener('error-load-products',(e)=>{
        notifications.show(e.detail,'error');
    })
    $producstContainer.addEventListener('load-products-finished',(e)=>{
        notifications.show('Carga finalizada','info');
    })
    productsController();
});
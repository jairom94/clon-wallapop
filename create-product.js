import { categoryProductController } from "./category-product/categoryProductController.js";
import { createProductController } from "./create-product/createProductController.js";
import { inputFileController } from "./input-file/inputFIleController.js";
import { notificationController } from "./notification/notificationController.js";

document.addEventListener('DOMContentLoaded',()=>{
    const $formCreateProduct = document.querySelector('.form-create-product');
    
    const $selectCategory = $formCreateProduct.querySelector('#category');
    categoryProductController($selectCategory);

    const $dropZone = document.querySelector('.drop-zone');
    inputFileController($dropZone,'images','images');

    const {show} = notificationController();
    $formCreateProduct.addEventListener('error-create-product',()=>{
        show('El producto no ha sido creado','error');
    })
    
    createProductController();
});
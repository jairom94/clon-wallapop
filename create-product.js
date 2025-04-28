import { categoryProductController } from "./category-product/categoryProductController.js";
import { createProductController } from "./create-product/createProductController.js";
import { inputFileController } from "./input-file/inputFIleController.js";
import { loaderController } from "./loader/loaderController.js";
import { notificationController } from "./notification/notificationController.js";

document.addEventListener('DOMContentLoaded',async()=>{
    const $formCreateProduct = document.querySelector('.form-create-product');
    
    const $selectCategory = $formCreateProduct.querySelector('#category');
    await categoryProductController($selectCategory);

    const $dropZone = $formCreateProduct.querySelector('.drop-zone');    
    inputFileController($dropZone,'images','images');
    // console.log($dropZone,$selectCategory);
    

    const {show} = notificationController();    
    $formCreateProduct.addEventListener('error-create-product',(e)=>{
        show(e.detail,'error')                
    })
    $formCreateProduct.addEventListener('create-product-ok',(e)=>{
        show(e.detail.message,e.detail.type)
        window.location = '/profile.html?section=all-products'                
    })

    //Event to loader
    const $contLoader = document.querySelector('.cont-loader');
    const loader = loaderController($contLoader)
    $formCreateProduct.addEventListener('create-product-start',(e)=>{
        loader.show()                
    })
    $formCreateProduct.addEventListener('create-product-finish',(e)=>{
        loader.hide()
    })

    createProductController();
});
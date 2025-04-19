import { categoryProductController } from "./category-product/categoryProductController.js";
import { inputFileController } from "./input-file/inputFIleController.js";

document.addEventListener('DOMContentLoaded',()=>{
    const $formCreateProduct = document.querySelector('.form-create-product');
    
    const $selectCategory = $formCreateProduct.querySelector('#category');
    categoryProductController($selectCategory);

    inputFileController()
});
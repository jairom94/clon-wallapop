import { categoryProductController } from "./category-product/categoryProductController.js";
import { inputFileController } from "./input-file/inputFIleController.js";
import { myProductsController } from "./my-products/myProductsController.js";
import { profileController } from "./profile/profileController.js";
import { getLoggedInUserInfo } from "./user-logged/userServices.js";

document.addEventListener('DOMContentLoaded',async (e)=>{
    const token = localStorage.getItem('token')
    if (!token) {
        const fromPage = window.location.pathname
        window.location = `/door.html?from=${fromPage}`;
    }

    const { id } = await getLoggedInUserInfo()

    await profileController(id)

    const $myProducts = document.querySelector('.my-products');
    await myProductsController(id)
    
    

    
    const sections = ['personal-information','all-products','add-product']
    function hideSections() {
        const sections = ['personal-information','all-products','add-product']
        sections.forEach(section => {
            const $section = document.querySelector(`.${section}`)
            const $btn = document.querySelector(`.btn-${section}`)
            $section.classList.add('hide-section') 
            $btn.classList.remove('btn-select')   
        })    
    }
    sections.forEach(section => {
        const $section = document.querySelector(`.${section}`)
        $section.classList.add('hide-section');
        const $btn = document.querySelector(`.btn-${section}`)
        $btn.addEventListener('click',()=>{
            hideSections()
            $section.classList.remove('hide-section')
            $btn.classList.add('btn-select')
            history.pushState(null,'',`profile.html?section=${section}`)
        })
    })

    const searchParams = new URLSearchParams(window.location.search);
    const sectionQuery = searchParams.get('section') ?? '';
    if (sectionQuery) {
        const $btnBySection = document.querySelector(`.btn-${sectionQuery}`)
        $btnBySection.click()    
    }else{
        const $btn = document.querySelector(`.btn-${sections[0]}`)
        $btn.click()    
    }

})
import { allCategories } from "../user-logged/userServices.js"
import { headerMenu, menuVertical } from "./headerView.js"

export async function headerController() {
    const $containerMenu = document.querySelector('.line-2')
    const $containerMenuVertical = document.querySelector('.menu-vertical')
    $containerMenu.innerHTML = headerMenu()
    
    $containerMenuVertical.classList.add('hide-menu')
    const categories = await allCategories()
    $containerMenuVertical.innerHTML = menuVertical(categories)
    const $btnCloseMenuVertical = $containerMenuVertical.querySelector('.btn-close-menu-vertical')
    // console.log($btnCloseMenuVertical);
    
    $btnCloseMenuVertical.addEventListener('click',()=>{
        console.log('removiendo');        
        $containerMenuVertical.classList.add('hide-menu')
    })
    const $btnCategories = $containerMenu.querySelector('.show-categories')
    $btnCategories.addEventListener('click',()=>{
        $containerMenuVertical.classList.toggle('hide-menu')
    })
    
    

}
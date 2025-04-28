import { headerMenu, menuVertical } from "./headerView.js"

export function headerController() {
    const $containerMenu = document.querySelector('.line-2')
    const $containerMenuVertical = document.querySelector('.menu-vertical')
    $containerMenu.innerHTML = headerMenu()
    $containerMenuVertical.classList.add('hide-menu')
    $containerMenuVertical.innerHTML = menuVertical()
    const $btnCategories = $containerMenu.querySelector('.show-categories')
    $btnCategories.addEventListener('click',()=>{
        $containerMenuVertical.classList.toggle('hide-menu')
    })
    

}
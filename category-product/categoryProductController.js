import { getCategories } from "./categoryProductModel.js";
import { buildCategory } from "./categoryProductView.js";

export async function categoryProductController($selectCategory = document.createElement('select')) {


    let categories = []
    try {
        categories = await getCategories();        
    } catch (error) {
        const event = new CustomEvent('error-load-categories', {
            detail: error.message
        })
        $selectCategory.dispatchEvent(event)
    } finally {
        drawCategories($selectCategory,categories);
    }
}

function drawCategories($selectCategory, categories) {
    categories.forEach(category => {
        const $categoryOption = buildCategory(category)
        $selectCategory.appendChild($categoryOption)
    })
}
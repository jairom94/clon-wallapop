export function headerMenu() {
    return `
    <ul class="menu-horizontal">
        <li>
            <button class='show-categories'>
            <div class="ico-burger">
                <iconify-icon icon="tabler:menu-2"></iconify-icon>
            </div>
            <span>
                Todas las categorías
            </span>
            </button>
        </li>
        <li>
            <span>
                Motor y Accesorios
            </span>
        </li>
        <li>
            <span>
                Moda y accesorios
            </span>
        </li>
    </ul>
    `
}

export function menuVertical(categories) {
    return `
    <div class="cont-button-close">
        <button class='btn-close-menu-vertical'>
            <div class="ico-close">
                <iconify-icon icon="ic:baseline-close"></iconify-icon>
            </div>
        </button>
    </div>
    <p>Todas las categorías</p>
    <nav>
        <ul>
            <li>
                <a href="/products.html">
                    <div class="ico">
                        <iconify-icon icon="material-symbols:border-all-rounded"></iconify-icon>
                    </div>
                    <span>
                        Ver todo
                    </span>
                </a>
            </li>
            ${categories.map(({name}) => (
                `<li>
                    <a href="/products.html?category=${name}">
                        <div class="ico">
                            <iconify-icon icon="material-symbols:category"></iconify-icon>
                        </div>
                        <span>
                            ${name}
                        </span>
                    </a>
                </li>`
            )).join('')}            
        </ul>
    </nav>
    `
}
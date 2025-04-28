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

export function menuVertical() {
    return `
    <div class="cont-button-close">
        <button>
            <div class="ico-close">
                <iconify-icon icon="ic:baseline-close"></iconify-icon>
            </div>
        </button>
    </div>
    <p>Todas las categorías</p>
    <nav>
        <ul>
            <li>
                <a href="#">
                    <div class="ico">
                        <iconify-icon icon="material-symbols:border-all-rounded"></iconify-icon>
                    </div>
                    <span>
                        Ver todo
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <div class="ico">
                        <iconify-icon icon="material-symbols:directions-car-outline-sharp"></iconify-icon>
                    </div>
                    <span>
                        Coche
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <div class="ico">
                        <iconify-icon icon="material-symbols:motorcycle-rounded"></iconify-icon>
                    </div>
                    <span>
                        Motos
                    </span>
                </a>
            </li>
            <li>
                <a href="#">
                    <div class="ico">
                        <iconify-icon icon="material-symbols:warehouse-outline-rounded"></iconify-icon>
                    </div>
                    <span>
                        Inmobiliaria
                    </span>
                </a>
            </li>
        </ul>
    </nav>
    `
}
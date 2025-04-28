export function profileView({name,username},publicaciones,totalCompras,totalVentas) {
    return `
    <figure class="banner-header">
        <img src="./imgs/banner-profile.avif" alt="banner profile">
        <div>
            <img class="user-image" src="./imgs/profile-user.avif" alt="user image">
        </div>
    </figure>
    <div class="information">
        <h2>${name}</h2>
    </div>
    <div class="items">
        <div class="item">
            <div>
                <div class="icon-cont">
                    <iconify-icon icon="fluent-mdl2:product"></iconify-icon>
                </div>
                <span>${publicaciones}</span>
            </div>
            <p>Publicaciones</p>
        </div>
        <div class="item">
            <div>
                <div class="icon-cont">
                    <iconify-icon icon="bxs:purchase-tag"></iconify-icon>
                </div>
                <span>${totalCompras}</span>
            </div>
            <p>Compras</p>
        </div>
        <div class="item">
            <div>
                <div class="icon-cont">
                    <iconify-icon icon="material-symbols:shopping-cart-rounded"></iconify-icon>
                </div>
                <span>${totalVentas}</span>
            </div>
            <p>Ventas</p>
        </div>
    </div>
    <div class="personal-dates">
        <div>
            <div class="icon-cont">
                <iconify-icon icon="tabler:phone-filled"></iconify-icon>
            </div>
            <span>+34 123 123 212</span>
        </div>
        <div>
            <div class="icon-cont">
                <iconify-icon icon="ic:baseline-mail"></iconify-icon>
            </div>
            <span>${username}</span>
        </div>
        <div>
            <div class="icon-cont">
                <iconify-icon icon="mdi:address-marker"></iconify-icon>
            </div>
            <span>456 Anytown, Near Anywhere, ST 47523</span>
        </div>
    </div>
    `
}
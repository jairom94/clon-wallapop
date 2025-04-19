export function buildProduct({image,name,price,description}){
    return `
    <a href="#">
                            <figure>
                                <img src="./imgs/products/placeholder_image.png" alt="placeholder">                                
                                <span>Venta</span>
                            </figure>
                            <div class="detail">
                                <p class="price">10.30 EUR</p>
                                <h2 class="name">Deposito de aceite</h2>
                                <div class="delivery-type">
                                    <div class="ico-delivery">
                                        <iconify-icon icon="ic:round-fire-truck"></iconify-icon>
                                    </div>
                                    <span>Envio Disponible</span>
                                </div>
                                <p class="detail-product">
                                    Se vende buena batería de coche 70Ah 12V 760A esta en perfecto estado funciona genial
                                </p>
                                <div class="rating-cont">
                                    <h3>Vendido por:</h3>
                                    <div>
                                        <span class="owner">Layla</span>
                                        <span class="star">
                                            <div class="ico-star">
                                                <iconify-icon icon="ic:round-star"></iconify-icon>
                                            </div>
                                            <span class="rating">5(20)</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </a>
    `
}
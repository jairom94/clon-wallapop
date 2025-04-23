import { fromBase64toImage } from "../utils/funtools.js";

export function loaderProductDetail() {
    return `
    <div class="product-loader">                        
                        <div aria-label="Orange and tan hamster running in a metal wheel" role="img"
                            class="wheel-and-hamster">
                            <div class="wheel"></div>
                            <div class="hamster">
                                <div class="hamster__body">
                                    <div class="hamster__head">
                                        <div class="hamster__ear"></div>
                                        <div class="hamster__eye"></div>
                                        <div class="hamster__nose"></div>
                                    </div>
                                    <div class="hamster__limb hamster__limb--fr"></div>
                                    <div class="hamster__limb hamster__limb--fl"></div>
                                    <div class="hamster__limb hamster__limb--br"></div>
                                    <div class="hamster__limb hamster__limb--bl"></div>
                                    <div class="hamster__tail"></div>
                                </div>
                            </div>
                            <div class="spoke"></div>
                        </div>
                    </div>
    `
}

export function productDetail({title,description,images,price,type,category}) {
    const defaultImage = './imgs/products/placeholder_image.png';
    const cleanImage = images.map(img => fromBase64toImage(img.datos_base64, img.formato))
    return `
                    <div class="product-detail">
                        <header class="header-product">
                            <div class="owner">                                
                                <figure>
                                    <img src="./imgs/user-placeholder.avif" alt="user image">
                                </figure>
                                <div class="rating">
                                    <div>
                                        <span>Miguel O.</span>
                                    </div>
                                    <div>
                                        <div class="ico star">
                                            <iconify-icon icon="gravity-ui:star-fill"></iconify-icon>
                                        </div>
                                        <div class="ico star">
                                            <iconify-icon icon="gravity-ui:star-fill"></iconify-icon>
                                        </div>
                                        <div class="ico star">
                                            <iconify-icon icon="gravity-ui:star-fill"></iconify-icon>
                                        </div>
                                        <div class="detail">
                                            <span>3(12)</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="social">
                                <button>
                                    <div class="ico like">
                                        <iconify-icon icon="emojione-monotone:red-heart"></iconify-icon>
                                    </div>
                                    <div class="ico like shadow">
                                        <iconify-icon icon="emojione-monotone:red-heart"></iconify-icon>
                                    </div>
                                </button>
                                <button>
                                    Chat
                                </button>
                            </div>
                        </header>
                        <figure>
                            <img src="${cleanImage.length > 0 ? cleanImage[0] : defaultImage }" alt="">
                            <span>
                                ${type}
                            </span>
                        </figure>
                        <div class="price">
                            <span>${price} EUR</span>
                        </div>
                        <div class="title">
                            ${title}
                        </div>
                        <div class="delivery-avaliable">
                            <div class="ico delivery">
                                <iconify-icon icon="ic:round-fire-truck"></iconify-icon>
                            </div>
                            <span>Envio Disponible</span>
                        </div>
                        <div class="description">
                            <h2>Detalle del Producto</h2>
                            <p>
                                ${description}
                            </p>
                        </div>
                    </div>
    `
}
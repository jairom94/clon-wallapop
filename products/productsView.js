import { fromBase64toImage } from "../utils/funtools.js"

export function buildProduct({ id,title, description, images, price, type, category }) {
  const defaultImage = './imgs/products/placeholder_image.png';
  const cleanImage = images.map(img => fromBase64toImage(img.datos_base64,img.formato))    
  return `
    <a href="/product-detail.html?id=${id}">
        <figure>
            <img src="${cleanImage.length > 0 ? cleanImage[0] : defaultImage}" alt="placeholder">                                
            <span class='${type.toLowerCase()}'>${type}</span>
        </figure>
        <div class="detail">
            <p class="price">${Number(price).toFixed(2)} EUR</p>
            <h2 class="name">${title}</h2>
            <div class="delivery-type">
                <div class="ico-delivery">
                    <iconify-icon icon="ic:round-fire-truck"></iconify-icon>
                </div>
                <span>Envio Disponible</span>
            </div>
            <p class="detail-product">
                ${description}
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

export function whitoutConnection() {
    return `    
<li class="main_wrapper">
  <div class="main">
    <div class="antenna">
      <div class="antenna_shadow"></div>
      <div class="a1"></div>
      <div class="a1d"></div>
      <div class="a2"></div>
      <div class="a2d"></div>
      <div class="a_base"></div>
    </div>
    <div class="tv">
      <div class="cruve">
        <svg
          class="curve_svg"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlns:xlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 189.929 189.929"
          xml:space="preserve"
        >
          <path
            d="M70.343,70.343c-30.554,30.553-44.806,72.7-39.102,115.635l-29.738,3.951C-5.442,137.659,11.917,86.34,49.129,49.13
        C86.34,11.918,137.664-5.445,189.928,1.502l-3.95,29.738C143.041,25.54,100.895,39.789,70.343,70.343z"
          ></path>
        </svg>
      </div>
      <div class="display_div">
        <div class="screen_out">
          <div class="screen_out1">
            <div class="screen">
              <span class="notfound_text">Check Your Network :(</span>
            </div>
          </div>
        </div>
      </div>
      <div class="lines">
        <div class="line1"></div>
        <div class="line2"></div>
        <div class="line3"></div>
      </div>
      <div class="buttons_div">
        <div class="b1"><div></div></div>
        <div class="b2"></div>
        <div class="speakers">
          <div class="g1">
            <div class="g11"></div>
            <div class="g12"></div>
            <div class="g13"></div>
          </div>
          <div class="g"></div>
          <div class="g"></div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="base1"></div>
      <div class="base2"></div>
      <div class="base3"></div>
    </div>
  </div>
</li>
    `
}

export function pagination(){
  
}
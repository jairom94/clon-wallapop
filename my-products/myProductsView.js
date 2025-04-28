import { crearArchivoDesdeBase64, fromBase64toImage, imagesBase64 } from "../utils/funtools.js";

export function tableToProducts($myProducts) {
    const $table = document.createElement('table');
    $table.classList.add('table')
    $table.classList.add('table-hover')
    $table.classList.add('table-striped')
    const $thead = document.createElement('thead');
    const header = `
        <tr>
            <th scope="col">Nro.</th>
            <th scope="col">Titulo</th>
            <th scope="col">Precio</th>
            <th scope="col">Acciones</th>
        </tr>
    `;
    $thead.innerHTML = header;
    $table.appendChild($thead);
    // const $tbody = document.createElement('tbody');
    // products.forEach(({ id, title, price, description, images, category }, index) => {
    //     const $tr = document.createElement('tr');
    //     const $th = document.createElement('th')
    //     $th.textContent = index + 1
    //     const tdTitle = document.createElement('td')
    //     tdTitle.textContent = title
    //     const tdPrice = document.createElement('td')
    //     tdPrice.textContent = `${Number(price).toFixed(2)} EUR`;
    //     const tdActions = document.createElement('td')
    //     tdActions.classList.add('d-flex')
    //     tdActions.classList.add('gap-2')
    //     const btnUpdate = document.createElement('button')
    //     const btnDelete = document.createElement('button')
    //     btnUpdate.classList.add('btn')
    //     btnUpdate.classList.add('btn-primary')
    //     btnUpdate.innerHTML = `
    //     <div class="icon-container">
    //         <iconify-icon icon="tabler:edit"></iconify-icon>
    //     </div>
    //     `;
    //     btnDelete.classList.add('btn')
    //     btnDelete.classList.add('btn-danger')
    //     btnDelete.innerHTML = `
    //     <div class="icon-container">
    //         <iconify-icon icon="material-symbols:delete-outline"></iconify-icon>
    //     </div>
    //     `;
    //     btnUpdate.addEventListener('click', () => {
    //         $modaUpdate.showModal()
    //     })
    //     btnDelete.addEventListener('click', () => {
    //         // confirm.setProductID(id)
    //         // $dialog.showModal()
    //     })
    //     tdActions.appendChild(btnUpdate)
    //     tdActions.appendChild(btnDelete)
    //     $tr.appendChild($th);
    //     $tr.appendChild(tdTitle);
    //     $tr.appendChild(tdPrice);
    //     $tr.appendChild(tdActions);

    //     $tbody.appendChild($tr);
    // });
    // $table.appendChild($tbody);
    $myProducts.appendChild($table);
}

export function bodyTableProducts(){
    const $tbody = document.createElement('tbody');
    return {
        addRowProduct(rowProduct){
            $tbody.appendChild(rowProduct)
        },
        bodyTable(){
            return $tbody
        }
    }
}

export function buildRowProduct({title,price,id}) {
    const $tr = document.createElement('tr');
    const $th = document.createElement('th')
    $th.textContent = id
    const tdTitle = document.createElement('td')
    tdTitle.textContent = title
    const tdPrice = document.createElement('td')
    tdPrice.textContent = `${Number(price).toFixed(2)} EUR`;
    const tdActions = document.createElement('td')
    tdActions.classList.add('d-flex')
    tdActions.classList.add('gap-2')
    const btnUpdate = document.createElement('button')
    const btnDelete = document.createElement('button')
    btnUpdate.classList.add('btn')
    btnUpdate.classList.add('btn-primary')
    btnUpdate.innerHTML = `
        <div class="icon-container">
            <iconify-icon icon="tabler:edit"></iconify-icon>
        </div>
        `;
    btnDelete.classList.add('btn')
    btnDelete.classList.add('btn-danger')
    btnDelete.innerHTML = `
        <div class="icon-container">
            <iconify-icon icon="material-symbols:delete-outline"></iconify-icon>
        </div>
        `;    
    tdActions.appendChild(btnUpdate)
    tdActions.appendChild(btnDelete)
    $tr.appendChild($th);
    $tr.appendChild(tdTitle);
    $tr.appendChild(tdPrice);
    $tr.appendChild(tdActions);
    return {
        rowProduct(){
            return $tr
        },
        buttonUpdate(){
            return btnUpdate
        },
        buttonDelete(){
            return btnDelete
        }
    }
}

export function noProducts($myProducts) {
    const $message = document.createElement('p');
    $message.textContent = 'No ha ingresado productos.'
    $myProducts.appendChild($message);
}

export function deleteConfirm($myProducts) {    
    const $dialog = document.createElement('dialog')
    $dialog.classList.add('delete-confirm')
    const $container = document.createElement('div')
    const $headerDialog = document.createElement('div')
    $headerDialog.classList.add('header-modal')
    $headerDialog.innerHTML = `
    <h3>Borrar Producto</h3>
    `
    const $btnCloseModal = document.createElement('button')
    $btnCloseModal.classList.add('close-dialog')
    $btnCloseModal.innerHTML = `    
    <div class="icon-container">
        <iconify-icon icon="pajamas:close"></iconify-icon>
    </div>
    `;
    $headerDialog.appendChild($btnCloseModal)
    $container.appendChild($headerDialog)
    const $bodyDialog = document.createElement('div')
    $bodyDialog.classList.add('body-modal')
    $bodyDialog.innerHTML = `
    <input type='hidden' name='id' id='id-product-delete'>
    <p>¿Estas seguro de borrar esté producto?</p>
    `
    $container.appendChild($bodyDialog)
    const $footerDialog = document.createElement('div')
    $footerDialog.classList.add('footer-modal')
    const $btnAllow = document.createElement('button')
    $btnAllow.classList.add('btn')
    $btnAllow.classList.add('btn-success')
    $btnAllow.textContent = 'Aceptar';
    const $btnCancel = document.createElement('button')
    $btnCancel.classList.add('btn')
    $btnCancel.classList.add('btn-danger')

    $btnCancel.textContent = 'Cancelar';
    $footerDialog.appendChild($btnAllow)
    $footerDialog.appendChild($btnCancel)
    $container.appendChild($footerDialog)
    $dialog.appendChild($container)

    $myProducts.appendChild($dialog)

    return {
        getDialog() {
            return $dialog
        },
        buttonDeleteOk(){
            return $btnAllow
        },
        buttonDeleteCancel(){
            return $btnCancel
        },
        buttonCloseModal(){
            return $btnCloseModal
        }

    }
}

export function updateProductModal(handleClickUpdate) {
    let productID = 0;
    const $dialog = document.createElement('dialog')
    $dialog.classList.add('update-product')
    const $container = document.createElement('div')
    $container.innerHTML = `
    <form class='form-update-product'>
        <input type='hidden' name='id' id='id-update'>
        <div>
            <label for='title'>Titulo</label>
            <input type='text' name='title' id='title-update' value=''>
        </div>
        <fieldset>
            <legend>Descripción</legend>            
            <textarea rows="3" name="description" id="description-update" maxlength="200" placeholder="Escribe una breve descripción del producto...">
            </textarea>
        </fieldset>
        <fieldset>
            <legend>Imagen</legend>
            <div class="drop-zone">                                                
            </div>
            <div class="preview-container"></div>
        </fieldset>
        <div>
            <label for='price'>Precio</label>
            <input type='number' name='price' id='price-update'>
        </div>
        <div class="dropdown-cont">
            <div class="ico">
                <iconify-icon icon="mdi:arrow-down-bold-box"></iconify-icon>
            </div>
            <select name="category" id="category-update">
                <option value="">--Select category--</option>
            </select>
        </div>
        <div>
            <button class='btn btn-success btn-update'>Aceptar</button>
            <button type='button' class='btn btn-danger btn-cancel-update'>Cancelar</button>
        </div>
    </form>
    `
    $dialog.appendChild($container)
    const $titleInput = $dialog.querySelector('#title-update');
    const $priceInput = $dialog.querySelector('#price-update');
    const $btnCancelUpdate = $dialog.querySelector('.btn-cancel-update');

    $btnCancelUpdate.addEventListener('click', () => {
        $dialog.close()
    })


    const $formUpdate = $dialog.querySelector('.form-update-product');
    $formUpdate.addEventListener('submit', async (e) => {
        e.preventDefault()
        const $title = $dialog.querySelector('#title-update');
        const $price = $dialog.querySelector('#price-update');
        const $imgs = $dialog.querySelector('#images-update');
        const $description = $dialog.querySelector('#description-update');
        const $category = $dialog.querySelector('#category-update');

        const product = {
            title: $title.value,
            description: $description.value,
            price: $price.value,
            images: await Promise.all(imagesBase64($imgs)),
            type: 'Venta',
            category: $category.value
        }

        handleClickUpdate(productID, product)
        $dialog.close()
    })

    return {
        getDialog() {
            return $dialog;
        },
        setProductID(value) {
            productID = value
        },
        setProductUpdate(productToUpdate) {
            $titleInput.value = productToUpdate?.title
            $priceInput.value = productToUpdate?.price
            const $category = $dialog.querySelector('#category-update');
            const $description = $dialog.querySelector('#description-update');
            const $images = $dialog.querySelector('#images-update');
            const dataTransfer = new DataTransfer();
            productToUpdate.images.forEach(img => {
                const imageFile = crearArchivoDesdeBase64(img)
                dataTransfer.items.add(imageFile)
            })
            $images.files = dataTransfer.files;
            const event = new Event('change');
            $images.dispatchEvent(event);


            Array.from($category.children).forEach(category => {
                if (category.value === productToUpdate?.category) {
                    category.selected = true
                }
            })
            $description.value = productToUpdate?.description
        }
    }
}

export function buildModalUpdate($myProducts,categories=[]) {
    const $dialog = document.createElement('dialog')
    $dialog.classList.add('update-product')
    const $container = document.createElement('div')
    $container.innerHTML = `
    <form class='form-update-product'>
    <input type='hidden' name='id' id='id-update'>
    <div>
        <label for='title'>Titulo</label>
        <input type='text' name='title' id='title-update' value=''>
    </div>
    <fieldset>
        <legend>Descripción</legend>            
        <textarea rows="3" name="description" id="description-update" maxlength="200" placeholder="Escribe una breve descripción del producto...">
        </textarea>
    </fieldset>
    <fieldset>
        <legend>Imagen</legend>
        <div class="drop-zone">                                    
        <input type="file" id="images-update" multiple="" accept="image/png, image/jpeg" class="fileInput" name="images"><div class="drop-message">Arrastra tus imágenes aquí o haz clic para seleccionar</div></div>
        <div class="preview-container" id='preview-images-update'></div>
    </fieldset>
    <div>
        <label for='price'>Precio</label>
        <input type='number' name='price' id='price-update'>
    </div>
    <div class="dropdown-cont">
        <div class="ico">
            <iconify-icon icon="mdi:arrow-down-bold-box"></iconify-icon>
        </div>
        <select name="category" id="category-update">
            <option value="">--Select category--</option>
            ${categories.map(cat => `<option value="${cat.name}">${cat.name}</option>`).join('')}
        </select>
    </div>
    <div>
        <button class='btn btn-success btn-update'>Aceptar</button>
        <button type='button' class='btn btn-danger btn-cancel-update'>Cancelar</button>
    </div> 
    </form>   
    `
    $dialog.appendChild($container)
    $myProducts.appendChild($dialog)

    const $btnUpdateOk = $dialog.querySelector('.btn-update')
    const $btnUpdateCancel = $dialog.querySelector('.btn-cancel-update')
    return {
        getModalUpdateProduct(){
            return $dialog
        },        
        buttonUpdateOk(){
            return $btnUpdateOk
        },
        buttonUpdateCancel(){
            return $btnUpdateCancel
        }
    }
}

export function errorMessage(message) {
    const $errorCont = document.createElement('div');
    $errorCont.textContent = message
    $errorCont.classList.add('error-message')
    return $errorCont
}

export function clearImages($previewImages) {              
    $previewImages.innerHTML = '';
}
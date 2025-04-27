import { crearArchivoDesdeBase64, fromBase64toImage } from "../utils/funtools.js";

export function tableToProducts($myProducts,products,handleClickDelete,handleClickUpdate) {
    const confirm = deleteConfirm(handleClickDelete)
    const $dialog = confirm.getDialog()
    $myProducts.appendChild($dialog);

    const update = updateProductModal(handleClickUpdate)
    const $dialogUpdate = update.getDialog()
    $myProducts.appendChild($dialogUpdate)
    

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
    const $tbody = document.createElement('tbody');
    products.forEach(({id,title,price,description,images,category},index)=>{
        const $tr = document.createElement('tr');
        const $th = document.createElement('th')
        $th.textContent = index+1
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
        btnUpdate.addEventListener('click',()=>{            
            update.setProductUpdate({
                title,
                price,
                description,
                category,
                images
            })
            $dialogUpdate.showModal()
        })
        btnDelete.addEventListener('click',()=>{
            // handleClickDelete(id)
            confirm.setProductID(id)
            $dialog.showModal()
        })
        tdActions.appendChild(btnUpdate)
        tdActions.appendChild(btnDelete)        
        $tr.appendChild($th);
        $tr.appendChild(tdTitle);
        $tr.appendChild(tdPrice);
        $tr.appendChild(tdActions);

        // $tr.innerHTML = contRow;        
        $tbody.appendChild($tr);
    });
    $table.appendChild($tbody);
    $myProducts.appendChild($table);
}

export function noProducts($myProducts) {
    const $message = document.createElement('p');
    $message.textContent = 'No ha ingresado productos.'
    $myProducts.appendChild($message);
}

export function deleteConfirm(handleClickDelete){
    let result = false
    let productID = 0
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

    $btnCloseModal.addEventListener('click',()=>{
        $dialog.close()        
    })
    $btnCancel.addEventListener('click',()=>{
        $dialog.close()        
    })
    $btnAllow.addEventListener('click',()=>{
        result = true;
        handleClickDelete(productID)        
    })
    return {
        getDialog(){
            return $dialog
        },
        getValue(){
            return result
        },
        setProductID(value){
            productID = value
        }

    }
}

export function updateProductModal(handleClickUpdate){
    // let productUpdate = {
    //     price:0,
    //     title:''
    // }
    const $dialog = document.createElement('dialog')
    $dialog.classList.add('update-product')
    const $container = document.createElement('div')
    $container.innerHTML = `
    <form class='form-update-product'>
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
        </div>
    </form>
    `
    $dialog.appendChild($container)
    const $titleInput = $dialog.querySelector('#title-update');
    const $priceInput = $dialog.querySelector('#price-update');    
    const $btnAllowUpdate = $dialog.querySelector('.btn-update')

    return {
        getDialog(){
            return $dialog;
        },
        setProductUpdate(productToUpdate){
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
            
            
            
            Array.from($category.children).forEach(category => {
                if (category.value === productToUpdate?.category) {
                    category.selected = true                    
                }                
            })
            $description.value = productToUpdate?.description
        }
    }
}

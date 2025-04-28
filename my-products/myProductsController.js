import { allCategories } from "../user-logged/userServices.js";
import { crearArchivoDesdeBase64, imagesBase64 } from "../utils/funtools.js";
import { getMyProducts, removeProduct, updateProduct } from "./myProductsModel.js";
import { bodyTableProducts, buildModalUpdate, buildRowProduct, clearImages, deleteConfirm, errorMessage, noProducts, tableToProducts } from "./myProductsView.js";

export async function myProductsController(userID) {
    const $myProducts = document.querySelector('.my-products');
    $myProducts.innerHTML = '';
    let products = []
    try {
        products = await getMyProducts(userID);
        if (products.length > 0) {
            const categories = await allCategories()
            //Modal update
            const useModalUpdate = buildModalUpdate($myProducts, categories)
            const $modaUpdate = useModalUpdate.getModalUpdateProduct()
            const $formUpdate = $modaUpdate.querySelector('.form-update-product')

            //Modal delete
            const useModaleDelete = deleteConfirm($myProducts)
            const $modalDelete = useModaleDelete.getDialog()

            //diseño input file update
            const formatFiles = ['image/png', 'image/jpeg'];
            const $inputFile = $formUpdate.querySelector('#images-update')
            const $dropZone = $formUpdate.querySelector('.drop-zone')
            const $previewImages = $dropZone.nextElementSibling
            // console.log($previewImages);
            
            const $errorMessage = errorMessage('Formato incorrecto.')
            let objectURLs = [];

            buildEnviromentDragAndDrop($dropZone);

            $dropZone.addEventListener('drop', function handleDrop(e) {
                const dt = e.dataTransfer;
                const files = dt.files;
        
                // Validar tipos de archivo
                const validFiles = validateFiles(files, formatFiles)
        
                if (validFiles.length > 0) {
                    $dropZone.classList.remove('error-format');
                    $errorMessage.remove();
                    // Crear un nuevo DataTransfer para asignar los archivos válidos
                    const dataTransfer = new DataTransfer();
                    validFiles.forEach(file => dataTransfer.items.add(file));
        
                    clearPreviews(objectURLs, $previewImages)
                    displayPreviews(validFiles, $inputFile, objectURLs)
                    // Asignar los archivos al input
                    $inputFile.files = dataTransfer.files;
        
                    // Disparar evento change para manejar la subida
                    const event = new Event('change');
                    $inputFile.dispatchEvent(event);
                } else {            
                    $dropZone.classList.add('error-format')
                    $dropZone.appendChild($errorMessage)
                }
        
        
            }, false);

            $inputFile.addEventListener('change', function (e) {
                const validFiles = validateFiles(this.files, formatFiles);
        
                if (validFiles.length > 0) {
                    $dropZone.classList.remove('error-format');
                    $errorMessage.remove();
                    // Actualizar archivos válidos en el input
                    const dataTransfer = new DataTransfer();
                    validFiles.forEach(file => dataTransfer.items.add(file));
                    this.files = dataTransfer.files;
        
                    clearPreviews(objectURLs, $previewImages)
                    displayPreviews(validFiles, $inputFile, objectURLs)
                }else {
                    $dropZone.classList.add('error-format')
                    $dropZone.appendChild($errorMessage)
                }
            })
            

            tableToProducts($myProducts);
            const $table = $myProducts.querySelector('.table')
            const useBodyTable = bodyTableProducts()
            products.forEach(product => {
                const useRowProduct = buildRowProduct(product)
                const $row = useRowProduct.rowProduct();
                const $btnUpdate = useRowProduct.buttonUpdate()
                $btnUpdate.addEventListener('click', () => {
                    fillFormToUpdate($formUpdate, product);
                    $modaUpdate.showModal()
                })
                const $btnDelete = useRowProduct.buttonDelete()
                $btnDelete.addEventListener('click',()=>{
                    const $id = $modalDelete.querySelector('#id-product-delete')
                    $id.value = product?.id
                    // console.log($id);                    
                    $modalDelete.showModal()
                })
                useBodyTable.addRowProduct($row);
            });
            const $bodyTable = useBodyTable.bodyTable()
            $table.appendChild($bodyTable)

            $formUpdate.addEventListener('submit', async (e) => {
                e.preventDefault()
                const $id = $formUpdate.querySelector('#id-update');
                const $title = $formUpdate.querySelector('#title-update');
                const $price = $formUpdate.querySelector('#price-update');
                const $imgs = $formUpdate.querySelector('#images-update');
                const $description = $formUpdate.querySelector('#description-update');
                const $category = $formUpdate.querySelector('#category-update');

                const product = {
                    title: $title.value,
                    description: $description.value,
                    price: $price.value,
                    images: await Promise.all(imagesBase64($imgs)),
                    type: 'Venta',
                    category: $category.value
                }
                await updateProduct($id.value, product)
                // $table.remove()
                $modaUpdate.close()
                // $modaUpdate.remove()
                myProductsController(userID)

            })

            const $btnUpdateCancel = useModalUpdate.buttonUpdateCancel()            
            $btnUpdateCancel.addEventListener('click', () => {
                $modaUpdate.close()
            })

            //Modal Delete Actions
            const $btnModalDeleteConfirmOk = useModaleDelete.buttonDeleteOk()
            $btnModalDeleteConfirmOk.addEventListener('click',async ()=>{
                const $id = $modalDelete.querySelector('#id-product-delete')
                const productID = $id.value
                await removeProduct(productID)
                $modalDelete.close()
                myProductsController(userID)

            })

            const $btnCloseModalDelete = useModaleDelete.buttonCloseModal()
            $btnCloseModalDelete.addEventListener('click',()=>{
                $modalDelete.close()
            })
            const $btnCancelModalDelete = useModaleDelete.buttonDeleteCancel()
            $btnCancelModalDelete.addEventListener('click',()=>{
                $modalDelete.close()
            })

        } else {
            noProducts($myProducts);
        }
        const eventSuccess = new CustomEvent('success-load-products');
        $myProducts.dispatchEvent(eventSuccess);
    } catch (error) {
        const event = new CustomEvent('error-load-products', {
            detail: error.message
        });
        $myProducts.dispatchEvent(event);
    }
}

function handleUpdateProduct($myProducts) {
    const useModalUpdateProduct = buildModalUpdate($myProducts);
    let productID = 0;
    const $modaUpdate = useModalUpdateProduct.getModalUpdateProduct()
}

function fillFormToUpdate($formUpdate, { id, title, price, images, category, description }) {
    const eventForm = new CustomEvent('fill-form-update');
    $formUpdate.dispatchEvent(eventForm)

    const $id = $formUpdate.querySelector('#id-update');
    const $title = $formUpdate.querySelector('#title-update');
    const $price = $formUpdate.querySelector('#price-update');
    const $images = $formUpdate.querySelector('#images-update');
    const $description = $formUpdate.querySelector('#description-update');
    const $category = $formUpdate.querySelector('#category-update');
    $id.value = id
    $title.value = title
    $price.value = price
    // console.log(images);

    const dataTransfer = new DataTransfer();
    images.forEach(img => {
        const imageFile = crearArchivoDesdeBase64(img)
        dataTransfer.items.add(imageFile)
    })
    $images.files = dataTransfer.files;
    const event = new Event('change');
    $images.dispatchEvent(event);


    Array.from($category.children).forEach(category_ => {
        if (category_.value === category) {
            category_.selected = true
        }
    })
    $description.value = description
}

function clearPreviews(objectURLs, $previewImages) {
    // Liberar memoria de las URLs
    objectURLs.forEach(url => URL.revokeObjectURL(url));
    objectURLs = [];

    clearImages($previewImages);
}

function removePreview(index_, $previewImages, fileInput, objectURLs) {
    // Eliminar archivo del input
    const dataTransfer = new DataTransfer();
    let files = Array.from(fileInput.files);
    // files.splice(index, 1);
    files = files.filter((file, index) => index !== index_)
    // console.log(files);

    files.forEach(file => dataTransfer.items.add(file));
    fileInput.files = dataTransfer.files;

    // Volver a generar previsualizaciones
    clearPreviews(objectURLs, $previewImages);
    displayPreviews(files, fileInput, objectURLs)
}

function validateFiles(files, formatFiles) {
    return Array.from(files).filter(file =>
        formatFiles.includes(file.type)
    );

}

function displayPreviews(files, $inputFile, objectURLs) {
    const $previewImages = document.querySelector('#preview-images-update')
    files.forEach((file, index) => {
        const $containerImages = document.createElement('div')
        $containerImages.classList.add('image-container')

        const $imgPreview = document.createElement('img')
        $imgPreview.classList.add('preview-image')

        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-btn';
        removeBtn.innerHTML = '×';
        removeBtn.type = 'button'

        const objectUrl = URL.createObjectURL(file);
        objectURLs.push(objectUrl)
        $imgPreview.src = objectUrl

        removeBtn.addEventListener('click', (e) => {
            e.preventDefault()
            removePreview(index, $previewImages, $inputFile, objectURLs)
        })

        $containerImages.appendChild($imgPreview);
        $containerImages.appendChild(removeBtn);
        $previewImages.appendChild($containerImages);
    })


}

function buildEnviromentDragAndDrop($dropZone) {
    const eventsDragDrop = ['dragenter', 'dragover', 'dragleave', 'drop']
    eventsDragDrop.forEach(eventName => {
        $dropZone.addEventListener(eventName, preventDefaults, false);
        document.body.addEventListener(eventName, preventDefaults, false);
    });
    function preventDefaults(e) {
        e.preventDefault();
        e.stopPropagation();
    }

    ['dragenter', 'dragover'].forEach(eventName => {
        $dropZone.addEventListener(eventName, highlight, false);
    });

    ['dragleave', 'drop'].forEach(eventName => {
        $dropZone.addEventListener(eventName, unhighlight, false);
    });

    function highlight(e) {
        $dropZone.classList.add('dragover');
    }

    function unhighlight(e) {
        $dropZone.classList.remove('dragover');
    }
}
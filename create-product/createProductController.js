import { inputDescription, maxLengthByDescription } from "./createProductView.js";

export function createProductController() {
    const $formCreateProduct = document.querySelector('.form-create-product');
    const $descriptionContainer = $formCreateProduct.querySelector('.description-container');
    const $maxLengthContainer = $descriptionContainer.querySelector('.max-lenght-container');
    const { currentLength, getMaxLength, getDescription } = inputDescription($descriptionContainer);

    //Textarea custom
    const $description = getDescription()
    maxLengthByDescription($maxLengthContainer, currentLength(), getMaxLength())
    $description.addEventListener('keyup', (e) => {
        const current = currentLength();
        const max = getMaxLength();
        $maxLengthContainer.innerHTML = '';
        maxLengthByDescription($maxLengthContainer, current, max)
    });


    $formCreateProduct.addEventListener('submit', async(e) => {
        e.preventDefault();
        const $title = $formCreateProduct.querySelector('#title');
        const title = $title.value;
        const $description = $formCreateProduct.querySelector('#description');
        const description = $description.value;
        const $price = $formCreateProduct.querySelector('#price');
        const price = $price.value;
        const $buy = $formCreateProduct.querySelector('#buy');
        const buy = $buy.checked;
        const $sell = $formCreateProduct.querySelector('#sell');
        const sell = $sell.checked;
        const typeRaw = [
            {
                type:'buy',
                state:buy
            },
            {
                type:'sell',
                state:sell
            },
        ]
        const type = typeRaw.find(t => t.state) ?? {}
        const $images = $formCreateProduct.querySelector('#images');

        const $category = $formCreateProduct.querySelector('#category');
        const category = $category.value;

        const imagestoBase64 = await Promise.all(imagesBase64($images))

        const errors = []

        const fields = [
            {                
                name:'title',
                initialValue:'',
                currentValue:title,
                required:true,
                minlength:10                
            },
            {                
                name:'description',
                initialValue:'',
                currentValue:description,
                required:true,
                minlength:20
            },
            {                
                name:'images',
                currentValue:imagestoBase64,//Array.from($images.files),
                initialValue:[],
                required:true,               
            },
            {                
                name:'price',
                currentValue:price,
                initialValue:'',  
                required:true,            
            },
            {                
                name:'type',
                currentValue:type,
                initialValue:{}, 
                required:true,               
            },
            {                
                name:'category',
                currentValue:category,
                initialValue:'', 
                required:true,               
            },
        ]

        for (const field_ of fields) {
            const buildField = field(field_);
            const errorsValidate = buildField.validateField()
            if (JSON.stringify(errorsValidate[field_.name].errors) !== "{}") {                
                // console.log(errorsValidate);
                errors.push(errorsValidate)
            }           
        }

        if (errors.length === 0) {

        }else{
            // console.log(errors);
            
            const event = new CustomEvent('error-create-product',{
                detail:errors
            });
            $formCreateProduct.dispatchEvent(event);

        }
    })
}

function imagesBase64($images) {
    return Array.from($images.files)
    .map(image => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                resolve(e.target.result.split(',')[1]);
            };
            reader.readAsDataURL(image);
        });
    })
}

function field({name,currentValue,initialValue,required=false,minlength=0}) {
    const value = currentValue;
    const error={}
    const validations = {
        required:{
            message:`${name} is required.`
        },
        minlength:{
            message:`${name} must have min ${minlength} characters.`
        }
    }
    function funValidation(test){
        return test(value)
    }
    return {
        validateField(){
            const err = {}            
            if (required) {
                if (funValidation((value_)=>JSON.stringify(value_)===JSON.stringify(initialValue))) {
                    err['required'] = validations.required
                }
            }
            if (minlength>0) {
                if (funValidation((value_)=>value_.length < minlength)) {
                    err['minlength'] = validations.minlength
                }
            }
            error[name] = {
                errors:err
            }
            return error
        }
    }
}
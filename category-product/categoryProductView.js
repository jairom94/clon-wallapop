export function buildCategory({id,name}) {
    const $option = document.createElement('option');
    $option.value = id;
    $option.textContent = name;
    return $option
}
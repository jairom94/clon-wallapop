export function buildCategory({id,name}) {
    const $option = document.createElement('option');
    $option.value = name;
    $option.textContent = name;
    return $option
}
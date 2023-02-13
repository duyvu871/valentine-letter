function filterContain(text, relativeIndex) {

    const filter = text.value.toUpperCase();
    const list = [...$(`[data-col="${relativeIndex}"]`)];
    const length = list.length;
    let el, txtValue;

    for (let i = 0; i < length; i++) {
        el = list[i];
        txtValue = el.textContent || el.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {   
            $(`#row-${i + 1}`)[0].style.display = "";
        } else {
            $(`#row-${i + 1}`)[0].style.display = "none";
        }
    }
}
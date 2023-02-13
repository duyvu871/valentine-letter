function toggleSorted(event) {
    const relativeIndex = event.id.replace('sort-column-','');
   
    if (event.getAttribute('active') === 'on') {
        sortTable(relativeIndex);
        event.innerText = 'Về ban Đầu';
        event.setAttribute('active', 'off');
    } else if (event.getAttribute('active') === 'off') {
        setPrimaryItems();
        event.innerText = 'Sort';
        event.getAttribute('active', 'on');
    }
}

function sortTable(relativeIndex) {
    const table =[...document.querySelectorAll(`[data-col="${relativeIndex}"]`)];
    const sortedTable = quickSort(table).map(el => el.parentNode);
    $('#table-items').html('');
    
    sortedTable.forEach(element => {

        $('#table-items').append(element);
    });
}

function setPrimaryItems() {
   createFeatured.createGridTable(products);
}

  function quickSort(arr) {
    if (arr.length < 2) return arr;

    let newArr = arr;
    const pivotIndex = newArr.length -1 ;
    const pivot = newArr[pivotIndex];

    const left = [];
    const right = [];

    let current;

    for (let i = 0; i < pivotIndex ; i++) {
        current = newArr[i];

        if (!isNaN(current.innerText)) {
            
            if (Number(current.innerText.toLowerCase() ) < Number(pivot.innerText.toLowerCase() )) {
                left.push(current);
            } else {
                right.push(current);
            }
        } else {
            if (
                current.innerText.toLowerCase() 
                < pivot.innerText.toLowerCase()
            ) {
    
                left.push(current);
            } else {
                right.push(current);
            }
        }

    }
    
    return [...quickSort(left), pivot, ...quickSort(right)];
}

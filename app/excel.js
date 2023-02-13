function convertDataToExport(dataProducts) {
    const col = dataProducts.columns;
    const row = dataProducts.data;
    const converted = row.map((item, index) => {  
        const dataItem = {};
        for (let i = 0; i < row[index].length; ++i) {
            if (col[i] === 'STT')  dataItem[col[i]] = index + 1;
            else dataItem[col[i]] = row[index][i];
        }
        return dataItem;
    })
    return {
        rawData: converted,
        json: JSON.stringify(converted)
    };
}

function getProduct() {
    const uid = apiFirebase.getLogin().uid;
    database.ref('table/'+ uid).once('value', (snapShoot) => {
        products = snapShoot.val();
    }).then((result) => {
       console.log(products);

       createFeatured.createGridTable(products);
      
    }).catch((err) => {
        alert(err)
    });
}

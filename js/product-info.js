let productName = document.getElementById("productName");
let productDescrip = document.getElementById("productDescription");
let productCostandCurrency = document.getElementById("costandCurrency");
let productSoldCount = document.getElementById("productSoldCount");
let productCategory = document.getElementById("productCategory");
let prodID = localStorage.getItem("prodID");
let localemail = localStorage.getItem("email");
let array = JSON.parse(localStorage.getItem("comentarios"));
let compra = JSON.parse(localStorage.getItem("compra"));
let comentario = [];
let product = [];
let peugueotAzul = [];



document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(PRODUCT_INFO_URL + prodID + EXT_TYPE ).then(function (resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;

            productName.innerHTML = product.name;
            productDescrip.innerHTML = product.description;
            productCostandCurrency.innerHTML = product.currency + " " + product.cost;
            productSoldCount.innerHTML = product.soldCount;
            productCategory.innerHTML = product.category;
            showImagenes(product.images);
            showProductRelacionados(product.relatedProducts);
        }
    });
    getJSONData(CART_INFO_URL + 25801 + EXT_TYPE ).then(function (resultObj) {
        if (resultObj.status === "ok") {
            peugueotAzul = resultObj.data.articles;
        }
    });


    getJSONData(PRODUCT_INFO_COMMENTS_URL + prodID + EXT_TYPE).then(function (resultObj) {
        if (resultObj.status === "ok") {
            comentario = resultObj.data;

            if (!array) {
                showComentario(comentario);
            } else {
                console.log(array)
                let arrayFiltrado = array.filter(item => item.product == prodID)
                console.log(arrayFiltrado);
                comentario = comentario.concat(arrayFiltrado);
                showComentario(comentario);

            }
        }

    });
});

function showComentario(array) {

    let htmlContentToAppend = "";

    for (let i = 1; i < array.length; i++) {

        let comentario = array[i];

        htmlContentToAppend += `<div class="img-fluid img-thumbnail">
                    <h6 >${comentario.user}-${comentario.dateTime} </h6>`

        for (let i = 1; i <= comentario.score; i++) {
            htmlContentToAppend += ` <span class="fa fa-star checked"></span>`
        }

        for (let i = 5; i > comentario.score; i--) {
            htmlContentToAppend += `<span class="fa fa-star"></span>`
        }

        htmlContentToAppend += `<p class="mb-1">${comentario.description}</p>
                </div>`

        document.getElementById("comentarios").innerHTML = htmlContentToAppend;

    }
};

/////// Desafiate 2 pronto Producto relacionados /////////////////////////////////
function showProductRelacionados(array) {

    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let relacionado = array[i];

        htmlContentToAppend += ` 
        <div onclick="setRelacionadosID(${relacionado.id})" class="list-group-item list-group-item-action cursor-active">
        <div class="row">
           <div class="col">
               <h4 class="signin">${relacionado.name}</h4>
           </div>
           <div class="col-3">
               <img src="${relacionado.image}" alt="" class="img-thumbnail">
           </div>
       </div>
   </div>`


        document.getElementById("productSRelacionados").innerHTML = htmlContentToAppend;
    }
}

function setRelacionadosID(id) {
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"
}


/////// Desafiate 3 pronto Comentario /////////////////////////////////
document.getElementById("enviar").addEventListener("click", function () {
    let hoy = new Date();
    let fecha = hoy.getFullYear() + '-' + (hoy.getMonth() + 1) + '-' + hoy.getDate();
    let hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    let fechaYHora = fecha + ' ' + hora;

    let opinion = document.getElementById("opinion").value;
    if (opinion.length == 0) {
        alert('Completá tu opinión (Campo "opinión" vacio )');
    }

    let puntos = document.getElementById("puntos");
    let valorSeleccionado = puntos.options[puntos.selectedIndex].value;
    if (valorSeleccionado == 0) {
        alert('Calificá tu experiencia (Califica del 1 al 5 )');

    } else {


        if ((opinion.length != 0) && (valorSeleccionado != 0)) {
            let comentarios = JSON.parse(localStorage.getItem("comentarios"));
            let prod = JSON.parse(localStorage.getItem("prodID"));
            let score = JSON.parse(valorSeleccionado);
            let myComent = { product: prod, score: score, description: opinion, user: localemail, dateTime: fechaYHora };
            console.log(myComent);
            console.log(comentario);
            console.log(comentarios);

            if (!comentarios) {
                comentarios = myComent;

                alertaComent.classList.remove("visually-hidden");
                setTimeout(() => {
                    alertaComent.classList.add("visually-hidden");
                }, 10000);
             
                console.log(comentarios)
                localStorage.setItem("comentarios", JSON.stringify([comentarios]));
                window.location = "product-info.html"

            } else {
                comentarios.push(myComent);
                localStorage.setItem("comentarios", JSON.stringify(comentarios));
                window.location = "product-info.html"

                alertaComent.classList.remove("visually-hidden");
                setTimeout(() => {
                    alertaComent.classList.add("visually-hidden");
                }, 10000);
            }

        }
    }

});


/////// Desafiate 4 Carrusel  /////////////////////////////////


function showImagenes(array) {

    let htmlContentToAppend = "";
    let primero = array[0];

    htmlContentToAppend += `  
      <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
           <div class="carousel-item active">
            <img  src="` + primero + `" alt="First slide" width="600 "height="auto" class="img-fluid" >
           </div>`

    for (let i = 1; i < array.length; i++) {
        let imageSrc = array[i];
        htmlContentToAppend +=
            `<div class="carousel-item"> <img src="` + imageSrc + `" alt="..." width="600 "height="auto" class="img-fluid">
             </div> `
    }

    htmlContentToAppend += ` 
       </div>    
   <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev" >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Anterior</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next" >
          <span class="carousel-control-next-icon" aria-hidden="true" ></span>
          <span class="visually-hidden">Siguiente</span>
        </button> `

    document.getElementById("productImages").innerHTML = htmlContentToAppend;

}


/// Desafiate 5 Agregar al Carrito  ///////////////////////////////////////////////
document.getElementById("botonComprar").addEventListener("click", function () {

   let productComp = {id: product.id, name: product.name, image: product.images[0], unitCost: product.cost, currency: product.currency, count: 1 };
 
    if (!compra) {
        let ambos= peugueotAzul.concat(productComp);
        localStorage.setItem("compra", JSON.stringify(ambos));
        
        alertaShow.classList.remove("visually-hidden");
        setTimeout(() => {
            alertaShow.classList.add("visually-hidden");
        }, 1000);

        window.location = "product-info.html";
    }


    let compraFiltrada = compra.find((product) => product.id == prodID)
    if (compraFiltrada) {
        compraFiltrada.count++;

        alertaShowNew.classList.remove("visually-hidden");
        setTimeout(() => {
            alertaShowNew.classList.add("visually-hidden");
        }, 10000);
    
    } else {
        compra.push(productComp);

        

        alertaShow.classList.remove("visually-hidden");
        setTimeout(() => {
            alertaShow.classList.add("visually-hidden");
        }, 10000);


    }

    localStorage.setItem("compra", JSON.stringify(compra));
    window.location = "product-info.html"
   
}
);



const CategoriaProduct = localStorage.getItem("catID");
const ASCENDENTE = "";
const DESCENDENTE = "";
const RELEVANCIA = "";
let currentProductsArray = [];
let currentSortCriteria = undefined;
let minCost = undefined;
let maxCost = undefined;
let buscar = undefined;


function setProdID(id) {
  localStorage.setItem("prodID", id);
  window.location = "product-info.html"
}

document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCTS_URL + CategoriaProduct +  EXT_TYPE).then(function (resultObj) {
    if (resultObj.status === "ok") {
      currentProductsArray = resultObj.data.products
      showProductsList();
    }
  });

  let descripPagProduct = document.getElementById("productos-categoria ");
  descripPagProduct.innerHTML += CategoriaProduct;

});

function showProductsList() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentProductsArray.length; i++) {
    let product = currentProductsArray[i];

    if (((minCost == undefined) || (minCost != undefined && parseInt(product.cost) >= minCost)) &&
      ((maxCost == undefined) || (maxCost != undefined && parseInt(product.cost) <= maxCost)))
      //DESAFIATE #2
      if (buscar == undefined || product.name.toLowerCase().indexOf(buscar) != -1 || product.description.toLowerCase().indexOf(buscar) != -1) {

        
        htmlContentToAppend +=
          `<div onclick="setProdID(${product.id})" class="list-group-item list-group-item-action cursor-active">
          <div class="row">
              <div class="col-3" >
                  <img src="${product.image}" alt="${product.description}" class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <h4 class="mb-1">${product.name}-${product.currency} ${product.cost}</h4>
                      <small>${product.soldCount} artículos</small>
                  </div>
                  <p class="mb-1">${product.description}</p>
              </div>
          </div>
      </div>`
      }
    document.getElementById("allproducts").innerHTML = htmlContentToAppend;
  }
}

document.getElementById("ordenarDesc").addEventListener("click", function () {
  sortAndShowProducts(DESCENDENTE);
});

document.getElementById("ordenarAsc").addEventListener("click", function () {
  sortAndShowProducts(ASCENDENTE);
});

document.getElementById("rel").addEventListener("click", function () {
  sortAndShowProducts(RELEVANCIA);
});

function sortAndShowProducts(sortCriteria, productsArray) {
  currentSortCriteria = sortCriteria;

  if (productsArray != undefined) {
    currentProductsArray = productsArray;
  }
  currentProductsArray = sortProducts(currentSortCriteria, currentProductsArray);
  showProductsList();
}


function sortProducts(criteria, array) {
  let result = [];
  if (criteria === ASCENDENTE) {
    result = array.sort(function (a, b) {
      if (a.cost < b.cost) { return -1; }
      if (a.cost > b.cost) { return 1; }
      return 0;
    });
  } else if (criteria === DESCENDENTE) {
    result = array.sort(function (a, b) {
      if (a.cost > b.cost) { return -1; }
      if (a.cost < b.cost) { return 1; }
      return 0;
    });
  } else if (criteria === RELEVANCIA) {
    result = array.sort(function (a, b) {
      if (a.soldCount > b.soldCount) { return -1; }
      if (a.soldCount < b.soldCount) { return 1; }
      return 0;
    });
  }

  return result;
}

document.getElementById("borrarPrecio").addEventListener("click", function () {
  document.getElementById("precioMin").value = "";
  document.getElementById("precioMax").value = "";

  minCost = undefined;
  maxCost = undefined;

  showProductsList(currentProductsArray);
});

document.getElementById("filtrarPrecio").addEventListener("click", function () {

  minCost = document.getElementById("precioMin").value;
  maxCost = document.getElementById("precioMax").value;

  if ((minCost != undefined) && (minCost != "") && (parseInt(minCost)) >= 0) {
    minCost = parseInt(minCost);
  }
  else {
    minCost = undefined;
  }

  if ((maxCost != undefined) && (maxCost != "") && (parseInt(maxCost)) >= 0) {
    maxCost = parseInt(maxCost);
  }
  else {
    maxCost = undefined;
  }

  showProductsList();
});

//DESAFIATE # 2 ///////////////////////////////
document.getElementById("search").addEventListener("input", function () {
  buscar = document.getElementById("search").value.toLowerCase();
  showProductsList(currentProductsArray);

});

document.getElementById("c_search").addEventListener("click", function () {
  document.getElementById("search").value = "";
  buscar = undefined;
  showProductsList(currentProductsArray);
});






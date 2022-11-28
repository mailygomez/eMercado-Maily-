
let myDataLocalS = JSON.parse(localStorage.getItem("myData"));
let compra = JSON.parse(localStorage.getItem("compra"))
let button = document.getElementById("submit");
let buttonTipoPago = document.getElementById("buttonTipoPago");
let nCard = document.getElementById("n_card");
button.disabled = true;
let p_compro = [];
let arrayCom = [];



document.addEventListener("DOMContentLoaded", function (e) {

  if (compra !== "" && compra !== null) {
    showCart(compra);
    validityButton();
  }

  cal_subtot();
  cal_Envio();

});


function showCart(arrayCom) {
  let htmlContentToAppend = "";

  for (let i = 0; i < arrayCom.length; i++) {
    p_compro = arrayCom[i];

    if (p_compro.currency === "UYU") {
      let usd = (p_compro.unitCost / 40)
      let usdCost = Math.round(usd)
      let prodTot = (p_compro.count * usdCost);

      htmlContentToAppend +=
        ` <tr>
           <td class="col-2"><img width=150px src="${p_compro.image}" alt="${p_compro.name}" class="img-thumbnail"></td >
           <td class="col-2" ><p>${p_compro.name}</p> </td>
           <td> <p> USD  ${usdCost}</p> </td>
           <td class="text-center"><input oninput="cal_artsub(${usdCost}, ${i})" type="number" id="cantidad${i}" value="${p_compro.count}" style="width:50px;" min="1"></input></td>
           <td class="text-center"> USD <span class="artTot" id="articleTot${i}">${prodTot}</span>
           <td class="text-center"><button class="delete" onclick="delete_item( ${i})"><i class="fa fa-times" aria-hidden="true"></i></button> </td> </tr>  `


    } else {
      let prodTot = (p_compro.count * p_compro.unitCost);

      htmlContentToAppend += `
         <tr>
        <td class="col-2"><img width=150px src="${p_compro.image}" alt="${p_compro.name}" class="img-thumbnail"></td>
        <td class="col-2" ><p>${p_compro.name}</p> </td>
        <td> <p> ${p_compro.currency} ${p_compro.unitCost}</p> </td>
        <td class="text-center"><input oninput="cal_artsub(${p_compro.unitCost}, ${i})" type="number" id="cantidad${i}" value="${p_compro.count}" style="width:50px;" min="1"></td>
        <td class="text-center"> ${p_compro.currency} <span class="artTot" id="articleTot${i}">${prodTot}</span></td>
        <td class="text-center"><button class="delete" onclick="delete_item( ${i})"><i class="fa fa-times" aria-hidden="true"></i></button> </td> </tr>  `

    }
    document.getElementById("cartitems").innerHTML = htmlContentToAppend;
  }
}


function cal_subtot() {
  let subtotal = 0;
  let subs = document.getElementsByClassName("artTot");

  for (let i = 0; i < subs.length; i++) {
    subtotal += parseInt(subs[i].innerHTML);
  }
  document.getElementById("subtot").innerHTML = "Subtotal: USD " + subtotal;
}

function cal_artsub(cost, i) {
  let totalCount = parseInt(document.getElementById(`cantidad${i}`).value);
  prodTot = (totalCount * cost);
  document.getElementById(`articleTot${i}`).innerHTML = prodTot;

  cal_subtot();
  cal_Envio();

}

function cal_Envio() {
  let s_cost = "";
  let total = "";
  let subtotal = 0;
  let subs = document.getElementsByClassName("artTot");


  for (let i = 0; i < subs.length; i++) {
    subtotal += parseInt(subs[i].innerHTML);
  }
  if (document.getElementById("premium").checked == true) {
    s_cost = Math.round(subtotal * 0.15);
    total = (s_cost + subtotal)
  }
  else if (document.getElementById("express").checked == true) {
    s_cost = Math.round(subtotal * 0.07);
    total = (s_cost + subtotal)
  }
  else {
    s_cost = Math.round(subtotal * 0.05);
    total = (s_cost + subtotal)

  }
  document.getElementById("envio").innerHTML = "Envio: USD " + s_cost;
  document.getElementById("tot").innerHTML = "Total: USD " + total;
}



function payment_form() {
  if (document.getElementById("bank").checked == true) {
    document.getElementById("nt_card").disabled = true; //nombre titular tarjeta
    document.getElementById("n_card").disabled = true; // numero de tarjeta
    document.getElementById("v_card").disabled = true;// vencimiento
    document.getElementById("md_card").disabled = true; //mes de vencimiento
    document.getElementById("yd_card").disabled = true; // ano de vencimiento
    document.getElementById("n_bank").disabled = false; // cuenta banco

    document.getElementById("nt_card").value = "";
    document.getElementById("n_card").value = "";
    document.getElementById("v_card").value = "";
    document.getElementById("md_card").value = "";
    document.getElementById("yd_card").value = "";

  }
  else if (document.getElementById("card").checked == true) {
    document.getElementById("nt_card").disabled = false;
    document.getElementById("n_card").disabled = false;
    document.getElementById("v_card").disabled = false;
    document.getElementById("md_card").disabled = false;
    document.getElementById("yd_card").disabled = false;
    document.getElementById("n_bank").disabled = true;

    document.getElementById("n_bank").value = "";
  }

}


function payment_validate() {
  let payment = true;
  let fb0 = "";
  let fb1 = "";
  let fb2 = "";
  let fb3 = "";
  let fb4 = "";

  if (document.getElementById("bank").checked == true) {
    if (document.getElementById("n_bank").value == "") {
      payment = false;
      fb3 = "Debe ingresar un número de cuenta <br>"
    }
  }

  else if (document.getElementById("card").checked == true) {
    if (document.getElementById("nt_card").value == "" || document.getElementById("nt_card").value == false) {
      payment = false;
      fb0 = "Debe ingresar el nombre del titular <br>"
    }
    if (document.getElementById("n_card").value == "") {
      payment = false;
      fb1 = "Debe ingresar el número de la tarjeta <br>"
    } 

    if (document.getElementById("v_card").value == "" || document.getElementById("v_card").value.length < 3) {
      payment = false;
      fb2 = "Debe ingresar el código de seguridad correctamente <br>"
    }
    if (document.getElementById("md_card").value == "" || document.getElementById("yd_card").value == "") {
      payment = false;
      fb4 = "Debe seleccionar unaa fecha  <br>"
    }
  } if (document.getElementById("bank").checked == false && document.getElementById("card").checked == false) {
    document.getElementById("aviso1").innerHTML = "";
    document.getElementById("aviso1").innerHTML = '<p> Debes seleccionar una forma de pago </p>'
  }
 


  document.getElementById("fb0").innerHTML = fb0;
  document.getElementById("fb1").innerHTML = fb1;
  document.getElementById("fb2").innerHTML = fb2;
  document.getElementById("fb3").innerHTML = fb3;
  document.getElementById("fb4").innerHTML = fb4;
  return payment;

}



function purchase_validate() {
  let payment3 = true;
  let str = "";
  let numb = "";
  let cor = "";

  if (document.getElementById("street").value == "" ) {
    payment3 = false;
    str = "Ingresá una calle <br>"
  }
  if (document.getElementById("numbering").value == "") {
    payment3 = false;
    numb = "Ingresá un número  <br>"
  }
  if (document.getElementById("s_corner").value == "") {
    payment3 = false;
    cor = "Ingresá una esquina <br>"
  }

  document.getElementById("str").innerHTML = str;
  document.getElementById("numb").innerHTML = numb;
  document.getElementById("cor").innerHTML = cor;
  return payment3;
}



function validityButton() {
  if (compra.length >= 1) {
    button.disabled = false;
  }
};

document.getElementById("f_compra").addEventListener('submit', function (event) {
  if (!purchase_validate()) {
    event.preventDefault()
    event.stopPropagation()
    document.getElementById("fb").innerHTML = '<div class="p-3 mb-2 bg-warning text-dark">  Completá la dirección y Te lo llevamos a tu hogar! </div>'
  }

  else if (document.getElementById("estandar").checked != true && document.getElementById("express").checked != true && document.getElementById("premium").checked != true) {
    event.preventDefault()
    event.stopPropagation()
    document.getElementById("fb").innerHTML = '<div class="p-3 mb-2 bg-danger text-white"> Elegí Tipo de Envió </div> '
  }

  else if (document.getElementById("bank").checked != true && document.getElementById("card").checked != true) {
    event.preventDefault()
    event.stopPropagation()
    document.getElementById("fb").innerHTML = '<div class="p-3 mb-2 bg-warning text-dark"> <p>Elegí una forma de Pago!</p> <button type="button" class="btn btn-link ps-0" data-bs-toggle="modal"data-bs-target="#modalPayment" id="terminos1" >Seleccionar </button></p> </div>'
  }

  else if (!payment_validate()) {
    event.preventDefault()
    event.stopPropagation()
    document.getElementById("fb").innerHTML = '<div class="p-3 mb-2 bg-danger text-white"><p>"Ya casi..para continuar </p><p> Completá el formulario de Pago! "</p><button type="button" class="btn btn-link ps-0" data-bs-toggle="modal"data-bs-target="#modalPayment" id="terminos1" >Completar </button></p></div>'

  } else {

    localStorage.removeItem('compra');

    alertaPurchase.classList.remove("visually-hidden");
    setTimeout(() => {
      alertaPurchase.classList.add("visually-hidden");
    }, 10000);

  

    document.getElementById("f_payment").submit();
  }
});

// desafiate 6 elimina item /////////////////////////
function delete_item(i) {
  compra.splice((i), 1);
  localStorage.removeItem("compra");
  localStorage.setItem('compra', JSON.stringify(compra));
  window.location = "cart.html";
  alertaDelete.classList.remove("visually-hidden");
  setTimeout(() => {
      alertaDelete.classList.add("visually-hidden");
  }, 3000);

}

//  elimina todos los item /////////////////////////
document.getElementById("deleteAll").addEventListener("click", function () {
  localStorage.removeItem("compra");
  window.location = "cart.html"
});





///////  Muestra la tarjeta y la finaciera en Modal de pago ////////////////////

  function imgCard(){
    let tCard = typeCard(nCard.value);
    console.log(nCard.value)
    console.log(tCard);
   

    document.getElementById("imagenCard").innerHTML = `<img class="bd-placeholder-img card-img-top" src= "/img/Tu Banco es anonimo.png"
    alt="Imagen representativa del Perfil" id="cardBackground"> 
    <div class="texto-ensima">
    <h5>${nCard.value} </h5>
    <h6>${tCard} </h6>
    </div>   
    </div>`

  }
///////  tipo de Finaciera ////////////////////
  
function typeCard(number) {

// visa 
let re = new RegExp("^4");
if (number.match(re) != null)
  return "Visa";

// Visa Electron
re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
if (number.match(re) != null)
  return "Visa Electron";


// Mastercard
// Updated for Mastercard 2017 BINs expansion
if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
  return "Mastercard";

// American express
re = new RegExp("^3[47]");
if (number.match(re) != null)
  return "American express";

// Maestro
re = new RegExp("^(5018|5020|5038|5612|5893|6304|6759|6761|6762|6763|0604|6390)");
if (number.match(re) != null)
  return "Maestro";

// Maestro
re = new RegExp("^(5[06789]|6)[0-9]{0,}");
if (number.match(re) != null)
  return "Maestro";

// Discover
re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
if (number.match(re) != null)
  return "Discover";

// Diners
re = new RegExp("^36");
if (number.match(re) != null)
  return "Diners";

// Diners
re = new RegExp("^3(?:0[0-59]{1}|[689])[0-9]{0,}");
if (number.match(re) != null)
  return "Diners";

// Diners - Carte Blanche
re = new RegExp("^30[0-5]");
if (number.match(re) != null)
  return "Diners - Carte Blanche";

// JCB
re = new RegExp("^35(2[89]|[3-8][0-9])");
if (number.match(re) != null)
  return "JCB";

// JCB
re = new RegExp("^(?:2131|1800|35)[0-9]{0,}$");
if (number.match(re) != null)
  return "JCB";

// JCB
re = new RegExp("^30");
if (number.match(re) != null)
  return "JCB";

return "Tu Banco es Anónimo";
  }
  
  





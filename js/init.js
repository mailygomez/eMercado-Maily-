const CATEGORIES_URL = "https://japceibal.github.io/emercado-api/cats/cat.json";
const PUBLISH_PRODUCT_URL = "https://japceibal.github.io/emercado-api/sell/publish.json";
const PRODUCTS_URL = "https://japceibal.github.io/emercado-api/cats_products/";
const PRODUCT_INFO_URL = "https://japceibal.github.io/emercado-api/products/";
const PRODUCT_INFO_COMMENTS_URL = "https://japceibal.github.io/emercado-api/products_comments/";
const CART_INFO_URL = "https://japceibal.github.io/emercado-api/user_cart/";
const CART_BUY_URL = "https://japceibal.github.io/emercado-api/cart/buy.json";
const EXT_TYPE = ".json";
const myModal = new bootstrap.Modal(document.getElementById("dataModal"), {});
let ingresarProfile = document.getElementById("ingresarProfile");




let showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

let hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

let getJSONData = function(url){
    let result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}


document.addEventListener("DOMContentLoaded", function(e){
  if (localStorage.getItem("email")){
    let localemail = localStorage.getItem("email");
    document.getElementById("user").innerHTML += `${localemail}`;
  }
});


document.getElementById("cerrar").addEventListener("click", function () {
  localStorage.removeItem("email");
  window.location = "index.html"
});


document.getElementById("perfil").addEventListener("click", function () {
  if (localStorage.getItem("email")){
    window.location = "my-profile.html"
  } else {
    myModal.show();
  }
});


    let nameUser= document.getElementById("nameUser");
    let passwordUser = document.getElementById("passwordUser");


function validityButtonIngresar() {
    if (nameUser.value !== "" && passwordUser.value !== ""){
    ingresarProfile.disabled = false;
  } else {
    ingresarProfile.disabled = true;
  }
};
 

ingresarProfile.addEventListener("click", () => {
    if (validarEmail() === false){  
      alert("E-mail incorrecto");
} else {
  localStorage.setItem("email", nameUser.value);
  window.location = "my-profile.html";
}
})

function validarEmail(){
  let email = document.getElementById("nameUser");    
  let validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
  if( validEmail.test(email.value) ){
      return true;
  }else{
      return false;
  }
} 


 
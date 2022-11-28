
function validarEmail(){
    let email = document.getElementById("inputemail");         
    let validEmail =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
    if( validEmail.test(email.value) ){
        return true;
    }else{
        alert('Email is invalid');
        return false;
    }
} 
        
        document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("login").addEventListener("click", function () {
        let email = document.getElementById("inputemail");
        let pass = document.getElementById("inputpass");
        
        if ((email.value === "") || (pass.value === "")) {
            alert("Hay Campos Vacios");

        } else {
            if (validarEmail() === true){  
            localStorage.setItem("email", email.value);
            window.location = "inicio.html";
        }}

    });
});






   











 const reader = new FileReader();
 reader.onload = function(e) {
localStorage.setItem("Photo",e.target.result)
 }



document.addEventListener("DOMContentLoaded", function (e) {
    autocompletar();
    showImagen();

});


function autocompletar() {
    let localemail = localStorage.getItem("email");
    let placeholderEmail = ".";
    if (localemail !== "" && localemail !== null) {
        placeholderEmail = localemail;
    }


    let localname = localStorage.getItem("Name");
    let placeholderName = '.';
    if (localname !== "" && localname !== null) {
        placeholderName = localname;
    }

    let localSecondname = localStorage.getItem("SecondName");
    let placeholderSecondname = '.';
    if (localSecondname !== "" && localSecondname !== null) {
        placeholderSecondname = localSecondname;
    }

    let localSurname = localStorage.getItem("Surname");
    let placeholderSurname = '.';
    if (localSurname !== "" && localSurname !== null) {
        placeholderSurname = localSurname;
    }

    let localSecondsuname = localStorage.getItem("Secondsurname");
    let placeholderSecondsurname = '.';
    if (localSecondsuname !== "" && localSecondsuname !== null) {
        placeholderSecondsurname = localSecondsuname;
    }

    let localPhone = localStorage.getItem("Phone");
    let placeholderPhone = '.';
    if (localPhone !== "" && localPhone !== null) {
        placeholderPhone = localPhone;
    }

    document.getElementById("formUser").innerHTML += `
       <div class="container text-center  p-2">
        <div class="btn">
          <label for="name">Primer Nombre *</label>
          <input type="text" class="form-control" id="name" placeholder=${placeholderName} style="width:250px;" required
            pattern="[A-Za-z]+" required minlength="2">
            <p id="nameRed" class="text-danger" ></p>
        </div>
        <div class="btn">
          <label for="secondName">Segundo Nombre</label>
          <input type="text" class="form-control" id="secondName" placeholder=${placeholderSecondname} style="width:250px;"
            pattern="[A-Za-z]+" required minlength="2">
            <p></p>
        </div>
      </div>
      <div class="container text-center  p-2">
        <div class="btn">
          <label for="apellido">Primer Apellido *</label>
          <input type="text" class="form-control" id="surname" placeholder=${placeholderSurname} style="width:250px;"
            required pattern="[A-Za-z]+" required minlength="2">
             <p id="surnameRed" class="text-danger"></p>
        </div>
        <div class="btn">
          <label for="secondApellido">Segundo Apellido</label>
          <input type="text" class="form-control" id="secondSurname" placeholder=${placeholderSecondsurname}
            style="width:250px;" pattern="[A-Za-z]+" required minlength="2">
            <p></p>
        </div>
      </div> 
      <div class="container text-center  p-2">
        <div class="btn" >
        <label for="email">E-mail *</label>
      <input type="text" class="form-control" id="email" placeholder=${placeholderEmail} style="width:250px;">
      <p id="emailRed" class="text-danger"></p>
        </div>
        <div class="btn">
          <label for="phone">Teléfono de contacto</label>
          <input type="text" class="form-control card" id="phone" placeholder=${placeholderPhone} style="width:250px;" required
            pattern="^[0-9]+$" required minlength="7" maxlength="19" size="9">
            <p></p>
        </div>
      </div>

        <div class="container text-center  p-2">
          <div class="btn">
            <label for="formFile">Imagen de Perfil</label>
            <div class="form-label">
              <input class="form-control" type="file" id="formFile" style="width:250px;">
        </div>`


}

document.getElementById("guardarCambios").addEventListener("click", function () {

    let name = document.getElementById("name").value;
    let secondName = document.getElementById("secondName").value;
    let surname = document.getElementById("surname").value;
    let secondSurname = document.getElementById("secondSurname").value;
    let phone = document.getElementById("phone").value;
    let newEmail = document.getElementById("email").value;
    let localemail = localStorage.getItem("email");
    //let photo = document.getElementById("formFile").value;

   
    
    
    if (localemail == null) {

        alertaErrorUser.classList.remove("visually-hidden");
        setTimeout(() => {
          alertaErrorUser.classList.add("visually-hidden");
        }, 10000);
    

        window.location = "index.html";

    } else if (name == "" || surname == "" || newEmail == "") {
        alert('debes completar los datos marcado con  *')
        inputNeedAlert(name, surname, newEmail);

    } else if (newEmail !== localemail) {

        function validarEmail() {
            let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
            if (validEmail.test(newEmail)) {
                return true;
            } else {
                alert('Email is invalid');
                return false;
            }
        }

        if (validarEmail() === true) {

            localStorage.removeItem("email");
            localStorage.setItem('email',(newEmail));
            
            localStorage.setItem("Name", JSON.stringify(name));
            localStorage.setItem("SecondName", JSON.stringify(secondName));
            localStorage.setItem("Surname", JSON.stringify(surname));
            localStorage.setItem("Secondsurname", JSON.stringify(secondSurname));
            localStorage.setItem("Phone", JSON.stringify(phone));
            //localStorage.setItem("Photo", JSON.stringify(photo));
            alertaUserAct.classList.remove("visually-hidden");

            setTimeout(() => {
                alertaUserAct.classList.add("visually-hidden");
            }, 10000);

            window.location = "my-profile.html";

if(document.getElementById("formFile").files.length > 0){
    reader.readAsDataURL(document.getElementById("formFile").files[0])
}

    } else {
        localStorage.setItem("Name", JSON.stringify(name));
        localStorage.setItem("SecondName", JSON.stringify(secondName));
        localStorage.setItem("Surname", JSON.stringify(surname));
        localStorage.setItem("Secondsurname", JSON.stringify(secondSurname));
        localStorage.setItem("Phone", JSON.stringify(phone));
        localStorage.setItem("Photo", JSON.stringify(photo));
        alertaUserAct.classList.remove("visually-hidden");

        setTimeout(() => {
            alertaUserAct.classList.add("visually-hidden");
        }, 10000);
        
        window.location = "my-profile.html";
    }

    function inputNeedAlert() {

        let nameRed = "";
        let surnameRed = "";
        let emailRed = "";
    
        if (name == "" ) {
            nameRed = "Ingresá Nombre "
        }
        if (surname == "") {
            surnameRed = "Ingresá Primer Apellido"
        }
        if (newEmail == "") {
            emailRed = "Ingresá Tu E-mail"

            document.getElementById("surnameRed").innerHTML = surnameRed;
            document.getElementById("nameRed").innerHTML = nameRed;
            document.getElementById("emailRed").innerHTML = emailRed;
        }
    }
    }
})

// desafiate 7 En desarrollo no Evaluar porfa ///////////////////////////
function showImagen(){

    let localImagen = localStorage.getItem("Photo");
    if (localImagen !== "" && localImagen !== null) {
    let profileImagen = localImagen;
    document.getElementById("containerImagen").innerHTML += ` <img class="bd-placeholder-img card-img-top" src= "${profileImagen }"
    alt="Imagen representativa del Perfil"> `
    console.log(localImagen)



} else if (localImagen === "" || localImagen == null) {
    document.getElementById("containerImagen").innerHTML += ` <img class="bd-placeholder-img card-img-top" src= "/img/Perfil design.jpg"
    alt="Imagen representativa del Perfil"> `
}
}




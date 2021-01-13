let LastID = 0;

//Funzione che al caricamento della pagina controlla i vari campi che l'utente compila ad ogni cambiamento
(function onload(){
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("psw");
    const passwordCheck = document.getElementById("psw-repeat");

    username.addEventListener("change", checkDatiUsername);
    email.addEventListener("change", checkDatiEmail);
    password.addEventListener("change", checkDatiPsw);
    passwordCheck.addEventListener("change", checkDatiPswRepeat);
})();

//Funzione che controlla se tutti i campi sono validi ed crea un nuovo utente
function check(){
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("psw").value;

    var checkUsername = checkDatiUsername();
    var checkEmail = checkDatiEmail();
    var checkPsw = checkDatiPsw();
    var checkPswRepeat = checkDatiPswRepeat();

    if(checkUsername && checkEmail && checkPsw && checkPswRepeat){
        document.getElementById("spinner").style.display = "inline";
        nuovoUser(username, email, password);
    }
}

//Funzione che controlla se il campo username è compilato
function checkDatiUsername(){
    var username = document.getElementById("username");
    var usernameError = document.getElementById("usernameError");
    usernameError.innerHTML = "";
    var toRtn = false;

    if(username.value === ""){
        usernameError.innerHTML = "Inserisci un username!";
        usernameError.style.display = "inline";
        usernameError.style.color = "red";
    }else{
        if(username.value.length < 4){
            usernameError.innerHTML = "L'username deve avere minimo 4 caratteri!";
            usernameError.style.display = "inline";
            usernameError.style.color = "red";
        }else{
            usernameError.innerHTML = "Ottima scelta!";
            usernameError.style.display = "inline";
            usernameError.style.color = "green";
            toRtn = true;
        }
    }
    return toRtn;
}

//Funzione che controlla se il campo email è compilato e valido
function checkDatiEmail(){
    var email = document.getElementById("email");
    var emailError = document.getElementById("emailError");
    emailError.innerHTML = "";
    var toRtn = false;

    if(email.value === ""){
        emailError.innerHTML = "Inserisci un'email!";
        emailError.style.display = "inline";
        emailError.style.color = "red";
    }else{
        if(validateEmail(email.value)){
            emailError.innerHTML = "Email valida!";
            emailError.style.display = "inline";
            emailError.style.color = "green";
            toRtn = true;
        }else{
            emailError.innerHTML = "L'email inserita non è valida!";
            emailError.style.display = "inline";
            emailError.style.color = "red";
        }
    }
    return toRtn;
}

//Funzione che controlla se il campo password è compilato e valido
function checkDatiPsw(){
    var psw = document.getElementById("psw");
    var pswError = document.getElementById("pswError");
    pswError.innerHTML = "";
    var toRtn = false;

    if(psw.value === ""){
        pswError.innerHTML = "Inserisci una password!";
        pswError.style.display = "inline";
        pswError.style.color = "red";
    }else{
        if(psw.value.length < 4){
            pswError.innerHTML = "La password deve avere minimo 4 caratteri!";
            pswError.style.display = "inline";
            pswError.style.color = "red";
        }else{
            pswError.innerHTML = "OK!";
            pswError.style.display = "inline";
            pswError.style.color = "green";
            toRtn = true;
        }
    }
    return toRtn;
}

//Funzione che controlla se il campo password repeat è compilato, valido e corriponde a quello inserito precedentemente
function checkDatiPswRepeat(){
    var pswRepeat = document.getElementById("psw-repeat");
    var psw = document.getElementById("psw");

    var pswErrorRepeat = document.getElementById("pswErrorRepeat");
    pswErrorRepeat.innerHTML = "";

    var toRtn = false;

    if(pswRepeat.value === ""){
        pswErrorRepeat.innerHTML = "Inserisci una password!";
        pswErrorRepeat.style.display = "inline";
        pswErrorRepeat.style.color = "red";
    }else{
        if(pswRepeat.value != psw.value){
            pswErrorRepeat.innerHTML = "Le password inserite non corrispondono!";
            pswErrorRepeat.style.display = "inline";
            pswErrorRepeat.style.color = "red";
        }else{
            pswErrorRepeat.innerHTML = "OK!";
            pswErrorRepeat.style.display = "inline";
            pswErrorRepeat.style.color = "green";
            toRtn = true;
        }
    }
    return toRtn;
}

//Funzione che trova l'id dello USER più grande salvato sul DB
async function usersLastID(){
    var urlUser = "/api/v2/registrazione/lastID";
    await fetch(urlUser) 
    .then((resp) => resp.json())
    .then(function(response) {
        //Andato a buon fine
        if(response.length != 0){
            LastID = response[0].id;
            return;
        }
        if(response.status == 404){
            alert("Errore inserimento nuovo utente");
            return;
        }
        if(response.status == 500){
            alert("Errore DB!");
            return;
        }
    })
    .catch( error => console.error(error) );
}
usersLastID();

//Funzione che crea un nuovo utente
function nuovoUser(username, email, password){
    var urlUserEmail = "/api/v2/registrazione/utenti/" + email;
    const urlUser = "/api/v2/registrazione/nuovoUtente";

    var newUser_username = username;
    var newUser_mail = email;
    var newUser_psw = password;
    var newUser_punti = 0;
    var newUser_puntiSet = 0;

    var newID = 0;

    //Variabile per capire se l'utente esiste o meno
    var registrato;
    
    fetch(urlUserEmail)
    .then(function(data) {
        //Utente registrato
        if(data.status == 200){
            registrato = true;
        }
        //Utente non registrato
        if(data.status == 204){
            registrato = false;
        }
        //errore DB
        if(data.status == 500){
            alert(data.error);
            return;
        }
    })
    .then(async () => {
        if(registrato){
            var email = document.getElementById("emailError");
            email.innerHTML = "Email già utilizzata. Effettua login o recupera le credenziali!";
            email.style.color = "red";
        }else{
            newID = LastID + 1;
            fetch(urlUser, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify( { "id": newID,
                                            "username": newUser_username,
                                            "mail": newUser_mail,
                                            "password": newUser_psw,
                                            "punti": newUser_punti,
                                            "puntiSettimanali": newUser_puntiSet}),
            })
            .then(async (resp) => {
                //errore dati sbagliati
                if(resp.status == 400){
                    alert(resp.error);
                }
                //errore dati null o creazione doc sul DB
                if(resp.status == 404){
                    alert(resp.error);
                }
                //errore DB
                if(resp.status == 500){
                    alert(resp.error);
                }
                //Utente registrato correttamente
                if(resp.status == 200){
                    await sendEmail(newUser_mail, newUser_username, newUser_psw);
                    alert("Registrazione avvenuta correttamente!");
                    window.location = "../login.html";
                }
            }).catch( error => console.error(error) );
        }
    }).catch( error => console.error(error) );
}

//Funzione che controlla se l'email inserità è valida
function validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

//Funzione che mostra o nasconde la password inserita
function showPsw(){
    var toggle = document.getElementById("psw");
    if(toggle.type === "password") {
        toggle.type = "text";
    } else {
        toggle.type = "password";
    }
}

async function sendEmail(emailUser, usernameUser, passwordUser){
    const urlUser = "/api/v2/registrazione/send-mail";
    var toRtn = false;

    await fetch(urlUser, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { "email": emailUser,
                                "username": usernameUser,
                                "password": passwordUser })
    }).then((resp) => {
        if(resp.status == 200){
            alert("Email inviata. Controlla la posta elettronica!");
            toRtn = true;
        }else{
            var email = document.getElementById("emailError");
            email.innerHTML = "Email inesistente. Inserire una mail valida!";
            email.style.color = "red";
        }
    });
    return toRtn;
}
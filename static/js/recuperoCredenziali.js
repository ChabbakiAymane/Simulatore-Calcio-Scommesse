//Funzione che controlla se tutti i campi sono validi ed crea un nuovo utente
function check(){
    const email = document.getElementById("emailRecover").value;
    if(checkDatiEmail()){
        recuperaCredenziali(email);
    }
}

//Funzione che controlla se il campo email è compilato e valido
function checkDatiEmail(){
    var email = document.getElementById("emailRecover");
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

//Funzione che controlla se l'email inserità è valida
function validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

async function recuperaCredenziali(emailUser){
    const urlUser = "/api/v2/registrazione/recover-credentials";

    await fetch(urlUser, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( { "email": emailUser })
    }).then((resp) => {
        if(resp.status == 200){
            document.getElementById("emailError").innerHTML = "Email inviata correttamente"
        }else{
            document.getElementById("emailError").innerHTML = "Errore nell'invio dell'email. Assicurarsi che l'email inserita sia corretta!"
            document.getElementById("emailError").style.color = "red";
        }
    });
    return toRtn;
}
//Funzione che controlla se il token è valido e in base al tipo dell'utente mostra i contenuti della pagina
async function controllaToken() {
    var login;

    //se token non è presente o se è undefined
    if(!localStorage.getItem('token') || localStorage.getItem('token') == 'x' || localStorage.getItem('token') === undefined) {
        localStorage.setItem('token', 'x');
        login = false;
    }else{
        //token presente
        const result = await fetch('/api/v2/check', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: localStorage.getItem('token') })
        })
        .then((res) => res.json())
        .then(function(result){
            if (result.status === 'ok') {
                //controlla il tipo di utente
                var x;
                if (result.admin) { 
                    //utente admin
                    x = document.getElementsByClassName("user");
                }else {
                    //utente normale
                    x = document.getElementsByClassName("admin");
                }
                //nascondo parti HTML che non sono dell'admin
                for (i = 0; i < x.length; i++) { 
                    x[i].style.display = "none";
                }
                login = true;
            } else {
                // utente non loggato
                if (result.status === 'Error') { 
                    login = false;
                }
                login = false;
            }
        });
    }
    return login;
}

async function caricaPagine(page){
    //Pagine che non devono essere filtrate (sono visibili da tutti)
    if(page == "login"){
        window.location.href = "./" + page + ".html";
        return true;
    }
    if(page == "index"){
        window.location.href = "./" + page + ".html";
        return true;
    }
    if(page == "classifica"){
        window.location.href = "./" + page + ".html";
        return true;
    }
    //Controllo se il token è valido
    var bool = await controllaToken();
    if(bool){
        document.getElementById("login_failed").innerHTML = "";
        window.location.href = "./" + page + ".html";
        return true;
    }else{
        document.getElementById("login_failed").innerHTML = "<h4 style='color:red'>Per poter utilizzare questa funzionalità devi effettuare l'autenticazione.<br>Iscriviti o effettua il login!</h2><br>"
        return false;
    }
}

async function checkUser(){
    //se token non è presente o se è undefined
    if(!localStorage.getItem('token') || localStorage.getItem('token') == 'x' || localStorage.getItem('token') === undefined) {
        localStorage.setItem('token', 'x');
    }else{
        //token presente
        const result = await fetch('/api/v2/check', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: localStorage.getItem('token')
            })
        })
        .then((res) => res.json())
        .then(function(result){
            if (result.status === 'ok') {
                //controlla il tipo di utente
                var x;
                if (result.admin) {
                    //utente admin
                    x = document.getElementsByClassName("user");
                }else {
                    //utente normale
                    x = document.getElementsByClassName("admin");
                }
                //nascondo parti HTML che non sono dell'admin
                for (i = 0; i < x.length; i++) { 
                    x[i].style.display = "none";
                }
                document.getElementById("login").style.display = "none";
            }
        });
    }
}
checkUser();

//Funzione che libera il localStorage e procede al logout dell'utente
function logout(){
    const form = document.getElementById('logout');
    form.addEventListener('submit', logout);

    async function logout(event) {
        localStorage.setItem('token', 'x');
    }
}

//Funzione per il login
function login(){
    const form = document.getElementById('login');
    form.addEventListener('submit', login);

    async function login(event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const result = await fetch('/api/v2/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username,
                password
            })
        }).then((res) => res.json());

        if (result.status === 'ok') {
            localStorage.setItem('token', result.data);
            window.location.href = "homepage.html";
        } else {
            alert(result.error);
        }
    };
}
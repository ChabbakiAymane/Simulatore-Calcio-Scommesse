
var loggedUser = {};

async function username() { //stampo username utente sullapagina home
    us = document.getElementById('idP'); // Memorizzo il tag da dover cambiare
    var id = document.getElementById("idP").value;
    const result = await fetch('/api/v2/home/username', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json())
        .then(function (data) {
            us.innerHTML = `${data}`;
        })
        .catch(error => console.error(error)); // Se sono presenti errori vengono catturati qui
} 
username();

async function punti() {    //Stampa quanti punti ha l'utente
    pt = document.getElementById('Pt'); // Memorizzo il tag da dover cambiare
    var id = document.getElementById("Pt").value;
    const result = await fetch('/api/v2/home/punti', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json()) // Trasformo i dati in Json
        .then(function (data) {
            let span = document.createElement('span');
            span.innerHTML = `${data}`;

            //Appendo al file Home le modifiche
            pt.appendChild(span);
        })
        .catch(error => console.error(error)); // Se sono presenti errori vengono catturati qui
} 
punti();

//Stampa posizione utente
async function posizione() {
    po = document.getElementById('Po'); // Memorizzo il tag da dover cambiare
    var id = document.getElementById("Po").value;
    const result = await fetch('/api/v2/home/posizione', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json()) // Trasformo i dati in Json
        .then(function (data) {
            let span = document.createElement('span');
            span.innerHTML = data + "°";

            //Appendo al file Home le modifiche
            po.appendChild(span);
        })
        .catch(error => console.error(error)); // Se sono presenti errori vengono catturati qui
};
posizione();

//Stampa punti fatti ultima giornata
async function pun_set() {
    ps = document.getElementById('Ps'); // Memorizzo il tag da dover cambiare
    var id = document.getElementById("Ps").value;

    const result = await fetch('/api/v2/home/punt_set', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    }).then((res) => res.json()) // Trasformo i dati in Json
        .then(function (data) {
            return data.map(function (UserData) {
                let span = document.createElement('span');
                span.innerHTML = `${UserData.puntiSettimanali}`;

                //Appendo al file Home le modifiche
                ps.appendChild(span);
            })
        })
        .catch(error => console.error(error)); // Se sono presenti errori vengono catturati qui
};
pun_set();

//Stampa le prossime 5 partite
function partite() {
    ul = document.getElementById('match');
    ul.innerHTML = "";

    fetch('/api/v2/home/search_p')
        .then((resp) => resp.json()) // Trasforma i dati ricevuti in json
        .then(function (data) {
            return data.map(function (partite) {
                var li = document.createElement('li');
                li.className = "list-group-item d-flex justify-content-between align-items-center row justify-content-center border rounded-pill";
                li.innerHTML = `${partite.squadre1[0].name} vs ${partite.squadre2[0].name}`;
                li.style.width = '50%';

                var span = document.createElement('span');
                
                if(partite.esito == "annullata"){
                    span.innerHTML = "annullata";
                    span.style.backgroundColor = "red";
                }else{
                    span.style.backgroundColor = "green";
                    span.innerHTML = "programmata";
                }

                span.className = "badge badge-primary badge-pill";

                if(ul != undefined){
                    li.appendChild(span)
                    ul.appendChild(li);
                }
            })
        }).catch(error => console.error(error));
}
partite();

//Stampa countdown prossima partita
function date() {
    var data_lontana;
    fetch('/api/v2/home/search5_2')
        .then((resp) => resp.json()) // Trasformo i dati in Json
        .then(function (data) {
            data_lontana = new Date(data.date).getTime();
        });

    da = document.getElementById('Da'); // Memorizzo il tag da dover cambiare
    var id = document.getElementById("Da").value;
    fetch('/api/v2/home/search5')
        .then((resp) => resp.json()) // Trasformo i dati in Json
        .then(function (data) {

            //Creazione timer
            // Seleziono la data del countdown
            var countDownDate = new Date(data).getTime();

            // Aggiorna il count down ogni secondo
            var x = setInterval(function () {
                var now = new Date().getTime(); // Prendo il giorno di oggi e faccio la differenza
                var distance = countDownDate - now;
                var distance2 = data_lontana - now;

                // Sistemo la data per giorni, ore, minuti e secondi
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Invio i risultati al tag "Da" sulla Home
                if(hours < 10) hours = "0" + hours;
                if(minutes < 10) minutes = "0" + minutes;
                if(seconds < 10) seconds = "0" + seconds;
                
                dP = days + " GIORNI | " + hours + ":" + minutes + ":" + seconds;
                document.getElementById("Da").innerHTML = dP;

                // Se il count down finisce scrivo tempo scaduto
                if (distance < 0 && distance2 > 0) {
                    //clearInterval(x);
                    document.getElementById("Da").innerHTML = "LE PARTITE SI STANNO GIOCANDO";
                }
                if (distance < 0 && distance2 < 0) {
                    //clearInterval(x);
                    document.getElementById("Da").innerHTML = "Le partite sono terminate, aspetta che l'admin inserisca le prossime";
                }
            }, 1000);
            return;
        }).catch(error => console.error(error)); // Se sono presenti errori vengono catturati qui
}
date();
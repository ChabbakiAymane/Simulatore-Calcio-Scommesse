async function loadSquadre(){
    var html = document.getElementById("squadre").innerHTML = "";

    await fetch('/api/v2/infoSquadre/getInfoSquadre/')
        .then((resp) => resp.json())
        .then(async function (data) {
            html += "<div class='row'>";
            data.forEach(element => {
                var idS = `${element.id}`
                var nomeS = `${element.name}`;
                var nome = nomeS.toUpperCase();
                var vittorie = parseInt(`${element.v}`);
                var sconfitte = parseInt(`${element.s}`);
                var pareggi = parseInt(`${element.p}`);
                var giocate = parseInt(vittorie + sconfitte + pareggi);

                var nomeimg = "./images/" + nomeS.toLowerCase() + ".png";

                html += "<div class='col-sm-6'>";
                    html += "<div class='card'>";
                        html += "<div class='card-body'>";
                                html += "<a id='" + idS + "'class='text-center' style='text-align: center;' data-toggle='collapse' href='#" + nomeS + "' role='button' aria-expanded='false' aria-controls=' "+ nomeS + "'><img class='card-img-top' style='width:40%; height:40%; display: block; margin: 0 auto;' src='" + nomeimg + "' alt='Card image cap'></a>";
                                html += "<div class='collapse' id='" + nomeS + "'><div class='card card-body'>";
                                html += "<h1 style='text-align: center'>" + nome + "</h1>";
                                html += "<b>Partite giocate: </b>" + giocate + "<br>";
                                html += "<b>Vittorie: </b>" + vittorie + "<br>";
                                html += "<b>Pareggi: </b>" + sconfitte + "<br>";
                                html += "<b>Sconfitte: </b>" + pareggi + "<br>";
                                html += "</div></div>";
                        html += "</div>";
                    html += "</div>";
                html += "</div>";               
            });
            html += "</div>";
            document.getElementById("squadre").innerHTML += html;
        }).catch(error => console.error(error));
}
loadSquadre();

// ------------------------------------------------------------------------------------------------------------------------------ \\
function caricaDatiSquadre(){
    fetch("/api/v2/infoSquadre/"+ids)
        .then((resp) => resp.json()) // Trasformare dati in JSON
        .then(function (Squadre){ //Otteniamo i dati da elaborare
                let span = document.createElement('span');
                //Creazione tabella per l'inserimento degli esiti
                let pg = Squadre.v + Squadre.s + Squadre.p;
                span.innerHTML = "<h1>" +`${Squadre.name}` + "</h1>";
                span.innerHTML += "<b>Partite giocate: </b>" + pg + "<br>";
                span.innerHTML += "<b>Vittorie: </b>" + `${Squadre.v}` + "<br>";
                span.innerHTML += "<b>Pareggi: </b>" + `${Squadre.p}` + "<br>";
                span.innerHTML += "<b>Sconfitte: </b>" + `${Squadre.s}` + "<br>";
                // Append dei nostri elementi
                text.appendChild(span);
                return;
        }).catch(error => console.error(error));// If there is any error you will catch them here
    document.getElementById("datiSquadre").innerHTML += html;
}

function loadInfo() {
    ids = document.getElementById('squad').value;
    text = document.getElementById('info'); //Ottenere tabella in cui mettere le nostre partite
    text.innerHTML = "";
    fetch("/api/v2/infoSquadre/"+ids)
        .then((resp) => resp.json()) // Trasformare dati in JSON
        .then(function (Squadre){ //Otteniamo i dati da elaborare
                let span = document.createElement('span');
                //Creazione tabella per l'inserimento degli esiti
                let pg = Squadre.v + Squadre.s + Squadre.p;
                span.innerHTML = "<h1>" +`${Squadre.name}` + "</h1>";
                span.innerHTML += "<b>Partite giocate: </b>" + pg + "<br>";
                span.innerHTML += "<b>Vittorie: </b>" + `${Squadre.v}` + "<br>";
                span.innerHTML += "<b>Pareggi: </b>" + `${Squadre.p}` + "<br>";
                span.innerHTML += "<b>Sconfitte: </b>" + `${Squadre.s}` + "<br>";
                // Append dei nostri elementi
                text.appendChild(span);
                return;
        }).catch(error => console.error(error));// If there is any error you will catch them here
}
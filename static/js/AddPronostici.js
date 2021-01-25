var nomeUtente, idUtente;

//Contiene tutte le partite programmate per la prossima giornata
var partiteDisponibiliPronostico = [];

//Contiene i pronostici dell'utente
var partitePronosticiUtente = [];

//Ricava dal token l'username dell'utente
function username() {
    var urlUserUsername = "/api/v2/addPronostici/username";
    fetch(urlUserUsername, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    })
    .then((res) => res.json())
    .then(function(data){
        document.getElementById("UserName").value = data;
    });
} 
username();

//Ricava dal token l'id dell'utente
function getUserID(){
    var urlUserID = "/api/v2/addPronostici/id";

    fetch(urlUserID, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            token: localStorage.getItem('token')
        })
    })
    .then((res) => res.json())
    .then(function(data){
        document.getElementById("UserID").value = data;
    });
}
getUserID();

/* Funzione che mostra le partite disponibili per i pronostici */
function caricaPartite() {
    const urlPartite = "/api/v2/addPronostici/partiteDisponibili";

    fetch(urlPartite)
    .then((resp) => resp.json())
    .then(function (data) {
        data.map(function (partite) {
            var table = document.getElementById("partiteTabella");
            var tbody = table.getElementsByTagName('tbody')[0];
            var tr = document.createElement('tr');
            var sq1 = document.createElement('td');
            var sq2 = document.createElement('td');
            var tdOrario = document.createElement('td');
            var tdBtn = document.createElement('td');
            var btn = document.createElement("button");
         
            btn.innerHTML = "<a href='#savePronostico'><button type='button' id='"+ partite.idP + "' class='btn btn-primary'>Nuovo Pronostico</button></a>";
            btn.style.width = "50%";
            btn.style.position = "relative";
            btn.style.display = "flex";
            btn.style.margin = "auto";
            btn.style.padding = "0";
            btn.style.border = "none";

            tdBtn.appendChild(btn);
            
            var tmp = partite.date;
            var dataPartita = tmp.split('T');

            var data = dataPartita[0].split('-');
            var orario = dataPartita[1].split(':');

            dataPartita = data[2] + "/" + data[1] + "/" + data[0] + "  " + orario[0] + ":" + orario[1];

            sq1.innerHTML = partite.squadre1[0].name;
            sq2.innerHTML = partite.squadre2[0].name;
            tdOrario.innerHTML = dataPartita;

            var toSave = partite.idP + " " + partite.sq1 + " " + partite.squadre1[0].name + " " + partite.sq2 + " " + partite.squadre2[0].name;
            partiteDisponibiliPronostico.push(toSave);

            document.addEventListener('click', function(e){
                if(e.target && e.target.id == partite.idP){
                    var html;
                    var collapse = document.getElementById("nuovoPronosticoDati");
                    collapse.style.display = "inline-block";
                    collapse.style.width = "100%";
                    collapse.margin = "0 auto";

                    html += "<div id='errorCheckBox' style='display: none;'>";
                        html += "<p id='mgsCheckBox' style='color: red;'>Selezionare un pronostico!</p>";
                    html += "</div>";
                    html += "<input type='hidden' id='PartitaID' name='hidden' value='"+ partite.idP +"'></input>";
                    html += "<div class='row'>";
                        html += "<div class='col'>";
                            html += "<input class='form-control' id='sq1' type='text' placeholder='Squadra in casa' value='" + `${partite.squadre1[0].name}` + "' readonly>";
                        html += "</div>";
                        html += "<div class='col'>";
                            html += "<input class='form-control' id='sq2' type='text' placeholder='Squadra in trasferta' value='" + `${partite.squadre2[0].name}` + "' readonly>";
                        html += "</div>";
                        html += "<div class='row'>";
                            html += "<div style='vertical-align: top; margin-left: 60px;'>"
                                html += "<div class='form-check form-check-inline'>"
                                    html += "<input name='pronosticoCheckBox' class='form-check-input' type='radio' id='1' value='1' style='width: 1.5em; height: 1.5em;'>";
                                    html += "<label class='form-check-label' for='1'>1</label>";
                                html += "</div>";
                                html += "<div class='form-check form-check-inline'>"
                                    html += "<input name='pronosticoCheckBox' class='form-check-input' type='radio' id='2' value='2' style='width: 1.5em; height: 1.5em;'>";
                                    html += "<label class='form-check-label' for='2'>2</label>";
                                html += "</div>";
                                html += "<div class='form-check form-check-inline'>"
                                    html += "<input name='pronosticoCheckBox' class='form-check-input' type='radio' id='0' value='X' style='width: 1.5em; height: 1.5em;'>";
                                    html += "<label class='form-check-label' for='0'>X</label>";
                                html += "</div>";
                            html += "</div>";
                        html += "</div>";
                        html += "<div class='col' style='margin-left: 10%;'>";
                            html += "<button class='btn btn-primary' id='savePronostico' type='button' value='save'>Salva</button>&ensp;&ensp;";
                            html += "<button class='btn btn-secondary' id='close' type='button' value='" + partite.idP + "'>Chiudi</button>";
                    html += "</div>";
                    html += "</div>";
                    html += "<br><div id='messaggioSuccesso' style='position: center; width:50%; margin: 0 auto; display: none;' class='alert alert-success alert-dismissible'>";
                        html += "<a href='#' class='close' data-dismiss='alert' aria-label='close' id='alertSuccess'>&times;</a>";
                        html += "<strong>Inserimento avvenuto con successo!</strong>";
                    html += "</div>";

                    document.getElementById("nuovoPronosticoDati").innerHTML = html;
                }
            });

            tr.appendChild(sq1);
            tr.appendChild(sq2);
            tr.appendChild(tdOrario);
            tr.appendChild(tdBtn);
            tbody.appendChild(tr);
        });
    }).catch(error => console.error(error));

    document.addEventListener('click', function(e){
        if(e.target && e.target.id == "close"){
            document.getElementById("sq1").innerHTML = "";
            document.getElementById("sq2").innerHTML = "";
            document.getElementById("nuovoPronosticoDati").style.display = "none";
        }
    });

    document.addEventListener('click', function(e){
        if(e.target && e.target.id == "savePronostico"){
            nuovoPronostico();
            document.getElementById("messaggioSuccesso").style.display = "block";
        }
    });

    document.addEventListener('click', function(e){
        if(e.target && e.target.id == "alertSuccess"){
            document.getElementById("sq1").innerHTML = "";
            document.getElementById("sq2").innerHTML = "";
            document.getElementById("nuovoPronosticoDati").style.display = "none";
        }
    });
}
caricaPartite();

function caricaPronosticiUser(){
    var id = document.getElementById("UserID").value;
    pronosticiUser(id);
}

//Carico e mostro i pronostici dell'utente
async function pronosticiUser(id){
    document.getElementById("tbody").innerHTML = "";

    const urlUser = "/api/v2/addPronostici/pronostici/" + id;
    const urlPartite = "/api/v2/addPronostici/partiteDisponibili";

    await fetch(urlPartite)
    .then((resp) => resp.json())
    .then(async function (partiteDisponibili) {
        return partiteDisponibili.map(async function (partite) {
            await fetch(urlUser)
            .then((resp) => resp.json())
            .then(async function(pronostitiUtente) {
                var checkDataExists = true;
                var string1 = pronostitiUtente.error;
                const string2 = "Errore pronostico inesistente";

                if(string1 === string2){
                    document.getElementById("tbody").innerHTML = "<h4 style='color:red; text-align: center;'>NON CI SONO PRONOSTICI!</h4>";
                    checkDataExists = false;
                }
                if(checkDataExists){
                    pronostitiUtente.map(function(pro){
                        var table = document.getElementById("pronosticiUtente");
                        var tbody = table.getElementsByTagName('tbody')[0];
                        var tr = document.createElement('tr');
                        var sq1 = document.createElement('td');
                        var sq2 = document.createElement('td');
                        var pronostico = document.createElement('td');
                        var tdBtn = document.createElement('td');
                        var td1 = document.createElement('td');
                        var td2 = document.createElement('td');
    
                        var collapse = document.createElement("div");
    
                        var btnModifica = document.createElement("button");
                        var btnElimina = document.createElement("button");
                        
                        if(partite.idP == pro.partita){
                            var htmlModifica = "<button class='btn btn-primary' style='border: none;' name='btnModifica' id='modifica' type='button' data-toggle='collapse' data-target='#modificaCollapse" + partite.idP + "' aria-expanded='false' aria-controls='modificaCollapse'>Modifica</button>";
                            btnModifica.innerHTML = htmlModifica;
                            btnModifica.id = "modifica " + partite.idP + " " + pro.id;
                            btnModifica.style.border = "none";
                            btnModifica.style.width = "100%";
                            btnModifica.style.padding = 0;
    
                            var idBtnModifica = "modifica " + partite.idP + " " + pro.id;
    
                            var htmlCollapse = "<div class='collapse' style='margin: 0 auto; width: 100%;' id='modificaCollapse" + partite.idP + "'><div class='card card-body'>";
                            htmlCollapse += "<p>Nuovo pronostico: <p>"
                            htmlCollapse += "<div class='row'>";
                                    htmlCollapse += "<div style='margin-left: 15px;'>"
                                        htmlCollapse += "<div class='form-check form-check-inline'>"
                                            htmlCollapse += "<input name='pronosticoModificaCheckBox' class='form-check-input' type='radio' id='1' value='1' style='width: 1.5em; height: 1.5em;'>";
                                            htmlCollapse += "<label class='form-check-label' for='1'>1</label>";
                                        htmlCollapse += "</div>";
                                        htmlCollapse += "<div class='form-check form-check-inline'>"
                                            htmlCollapse += "<input name='pronosticoModificaCheckBox' class='form-check-input' type='radio' id='2' value='2' style='width: 1.5em; height: 1.5em;'>";
                                            htmlCollapse += "<label class='form-check-label' for='2'>2</label>";
                                        htmlCollapse += "</div>";
                                        htmlCollapse += "<div class='form-check form-check-inline'>"
                                            htmlCollapse += "<input name='pronosticoModificaCheckBox' class='form-check-input' type='radio' id='0' value='X' style='width: 1.5em; height: 1.5em;'>";
                                            htmlCollapse += "<label class='form-check-label' for='0'>X</label>";
                                        htmlCollapse += "</div>";
                                    htmlCollapse += "</div>";
                                htmlCollapse += "</div>";
                                htmlCollapse += "<button class='btn btn-primary' name='modificaPronosticoBtn' id='" + idBtnModifica + "' type='button' value='save'>Salva</button>";
                            htmlCollapse += "</div></div>"
    
                            collapse.innerHTML = htmlCollapse;
                            btnModifica.appendChild(collapse);
    
                            btnElimina.name = "btnEliminaBtn";
                            btnElimina.id = "elimina " + partite.idP + " " + pro.id;
                            btnElimina.innerHTML = "X";
                            btnElimina.className = "btn btn-primary";

                            td1.appendChild(btnModifica);
                            td2.appendChild(btnElimina);

                            sq1.innerHTML = partite.squadre1[0].name;
                            sq2.innerHTML = partite.squadre2[0].name;
                            pronostico.innerHTML = pro.pronostico;
    
                            if(pro.pronostico == 0) pronostico.innerHTML = 'X';
    
                            tr.appendChild(sq1);
                            tr.appendChild(sq2);
                            tr.appendChild(pronostico);
                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            tbody.appendChild(tr);
                        }
                    });
                }
            }).catch( error => console.error(error) );
        });
    }).catch( error => console.error(error) );
}

(function impostaBtn(){
    document.addEventListener('click', function(e){
        if(e.target && e.target.name == "modificaPronosticoBtn"){
            modificaPronostico(e.target.id);
        }
    });
    document.addEventListener('click', function(e){
        if(e.target && e.target.name == "btnEliminaBtn"){
            eliminaPronostico(e.target.id);
        }
    });
})();

/* Funzione che inserisce un nuovo pronostico */
async function  nuovoPronostico(){
    const urlLastId = "/api/v2/addPronostici/pronostici";
    const urlNew = "/api/v2/addPronostici/nuovoPronostico/";

    var id_Partita = document.getElementById("PartitaID").value;
    var idUtente = document.getElementById("UserID").value;

    var pronostico;
    var idPronostico = 0;

    var checkBox = document.getElementsByName("pronosticoCheckBox");
    var checkedBox = false;

    for(var i=0; i < checkBox.length; i++){
        if(checkBox[i].checked){
            checkedBox = true;
            if(checkBox[i].value == 'X'){
                pronostico = 0;
            }else{
                pronostico = checkBox[i].value;
            }
        } 
    }

    if(checkedBox){
        document.getElementById("errorCheckBox").style.display = "none";

        await fetch(urlLastId)
        .then((resp) => resp.json())
        .then(function(data) {
            idPronostico = data.id + 1;
        });

        await fetch(urlNew, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { "id": idPronostico,
                                    "partita": id_Partita,
                                    "idU": idUtente,
                                    "pronostico": pronostico } )
        }).catch( error => console.error(error) );
    }else{
        document.getElementById("errorCheckBox").style.display = "block";
    }
};

//Funzione per modificare un pronostico
async function modificaPronostico(idPro){
    var tmp = idPro.split(" ");
    var checkBox = document.getElementsByName("pronosticoModificaCheckBox");
    var checkedBox = false;
    var nuovoValorePronostico = 0;

    for(var i=0; i<checkBox.length; i++){
        if(checkBox[i].checked){
            checkedBox = true;
            if(checkBox[i].value == 'X'){
                nuovoValorePronostico = 0;
            }else{
                nuovoValorePronostico = parseInt(checkBox[i].value);
            }
        }
    }

    if(checkedBox){
        var id_pronostico = parseInt(tmp[2]);
        var id_partita = parseInt(tmp[1]);
        var idUser = parseInt(document.getElementById("UserID").value);
    
        var urlModifica = "/api/v2/addPronostici/modPronostico/" + id_pronostico;
    
        await fetch(urlModifica, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { "id": id_pronostico,
                                    "partita": id_partita,
                                    "idU": idUser,
                                    "pronostico": nuovoValorePronostico} ),
        }).catch( error => console.error(error) );

        //alert("Modifica avvenuta!");
        pronosticiUser(idUser);
    }else{
        alert("Inserire un pronostico!");
    }
}

/**Funzione che elimina tramite DELETE un pronostico scelto */
async function eliminaPronostico(idPro){
    var conferma = confirm("Eliminare il pronostico?");
    
    if(conferma){
        var tmp = idPro.split(" ");
        var id_pronostico = tmp[2];
        var id_partita = tmp[1];

        var idUser = document.getElementById("UserID").value;

        var urlElimina = "/api/v2/addPronostici/eliminaPronostico/" + id_pronostico;

        await fetch(urlElimina, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify( { "id": id_pronostico,
                                    "partita": id_partita,
                                    "idU": idUser })
        }).catch( error => console.error(error) );

        document.getElementById("tbody").innerHTML = "";
        pronosticiUser(idUser);
    }
}
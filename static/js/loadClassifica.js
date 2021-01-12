//chiamata alla api classifica e stampo la classifica in una tabella nella pagina HTML
function loadClassifica() {
    fetch('api/v2/classifica/classifica')
    .then((resp) => resp.json())
    .then(function (data) {
        var i = 1;
        data.map(function (persona) {
            if (`${persona.punti}`>=0) {
                var table = document.getElementById("classificaTabella");
                var tbody = table.getElementsByTagName('tbody')[0];
                var tr = document.createElement('tr');
                var pos = document.createElement('td');
                var td1 = document.createElement('td');
                var td2 = document.createElement('td');

                if(i === 1){
                    tr.className += " table-warning";
                }

                pos.innerHTML = i++;

                td1.innerHTML = `${persona.username}`;
                td2.innerHTML = `${persona.punti}`;

                tr.appendChild(pos);
                tr.appendChild(td1);
                tr.appendChild(td2);
                tbody.appendChild(tr);
            }
        })
    }).catch(error => console.error(error));
}
loadClassifica();

function cercaUsername() {
    var id = document.getElementById("username").value;
    document.getElementById("datiUtente").style.visibility = "visible";

    fetch('api/v2/classifica/search?name=' + id)
    .then((resp) => resp.json()) 
    .then(function (data) {
        if(data.pos != undefined){
            var posizione = data.pos;
            var username = data.username;
            var punti = data.punti;
    
            var html = "<b>Username: <h3>" + username + "</h3></b><br>";
            html += "<b>Posizione: <h3>" + posizione + "°</h3></b><br>";
            html += "<b>Punti: <h3>" + punti + "</h3></b>";
    
            document.getElementById("nomeUtente").innerHTML = html;
            document.getElementById("username").value = "";
        }else{
            document.getElementById("nomeUtente").innerHTML = "<h5>Username insesistente!</h5>";
            document.getElementById("username").value = "";
        }
    }).catch(error => console.error(error));
};
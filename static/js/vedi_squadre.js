function loadPartite() {
  var i = 1;
  table = document.getElementById('utenti'); //Ottenere tabella in cui mettere le nostre partite
  fetch('/api/v2/aggiornaEsiti/get_partite')
      .then((resp) => resp.json()) // Trasformare dati in JSON
      .then(function (data) { //Otteniamo i dati da elaborare
          return data.map(function (Partite) { 
              let tr = document.createElement('tr');
              //Creazione tabella per l'inserimento degli esiti
              tr.innerHTML = "<td class=\"c\">" + `${Partite.squadre1[0].name}` + "</td><td> - </td><td class=\"t\">" + `${Partite.squadre2[0].name}` + "</td>";
              tr.innerHTML += "<td> <select name=\"e" + (i) + "\"><option>1</option><option>X</option><option>2</option><option>Annullata</option></select></td><td><input type=\"hidden\" name=\"idP" + (i++) +"\" value=\""+ `${Partite.idP}` + "\"></td>";
              // Append dei nostri elementi
              table.appendChild(tr);
          })
      })
      .catch(error => console.error(error));// If there is any error you will catch them here
}
loadPartite();
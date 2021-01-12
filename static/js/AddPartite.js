function IDSquadre()
{
    //get the form object
    var id = document.getElementById("idP").value;

    fetch('api/v2/addPartite/search?name=' + id)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        console.log(data);
        document.getElementById("match").innerHTML = JSON.stringify(data); //get squadra
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
};

function IDPartite()
{
    //get the form object
    var id = document.getElementById("idP").value;
    // console.log(email);

    fetch('api/v2/addPartite/search?idP=' + id)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        console.log(data);
        document.getElementById("match").innerHTML = JSON.stringify(data);//get partita
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

};

//NON DISPONIBILE (cercare per data)
function DataPartite()
{
    //get the form object
    var id = document.getElementById("idP").value;
    // console.log(email);

    fetch('api/v2/addPartite/search?date=' + id)
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please
        console.log(data);
        document.getElementById("match").innerHTML = JSON.stringify(data); 
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here

};

//Forza l'insert di 5 partite obbligatorie + controllo caselle vuote
function preInsert(){
    var sq1 = document.getElementById("sq1").value;
    var sq2 = document.getElementById("sq2").value;
    var date1 = document.getElementById("date1").value;
    var bool1=true;
    //controllo parti vuote form partita 1
    with(document.partiteform1) {

        if(sq1.value=="") {
            alert("Errore[1]: compilare il campo HOME");
            sq1.focus();
            bool1 = false;
        }
        if(sq2.value=="") {
            alert("Errore[1]: compilare il campo GUEST");
            sq2.focus();
            bool1 = false;
        }
        if(date1.value=="") {
            alert("Errore[1]: compilare il campo DATE");
            date1.focus();
            bool1 = false;
        }
    }

    sq3 = document.getElementById("sq3").value;
    sq4 = document.getElementById("sq4").value;
    date2 = document.getElementById("date2").value;
    bool2=true;
    //controllo parti vuote form partita 2
    with(document.partiteform2) {

        if(sq3.value=="") {
            alert("Errore[2]: compilare il campo HOME");
            sq3.focus();
            bool2 = false;
        }
        if(sq4.value=="") {
            alert("Errore[2]: compilare il campo GUEST");
            sq4.focus();
            bool2 = false;
        }
        if(date2.value=="") {
            alert("Errore[2]: compilare il campo DATE");
            date2.focus();
            bool2 = false;
        }
    }
    

    sq5 = document.getElementById("sq5").value;
    sq6 = document.getElementById("sq6").value;
    date3 = document.getElementById("date3").value;
    bool3=true;
    //controllo parti vuote form partita 3
    with(document.partiteform3) {

        if(sq5.value=="") {
            alert("Errore[3]: compilare il campo HOME");
            sq5.focus();
            bool3 = false;
        }
        if(sq6.value=="") {
            alert("Errore[3]: compilare il campo GUEST");
            sq6.focus();
            bool3 = false;
        }
        if(date3.value=="") {
            alert("Errore[3]: compilare il campo DATE");
            date3.focus();
            bool3 = false;
        }
    }


    sq7 = document.getElementById("sq7").value;
    sq8 = document.getElementById("sq8").value;
    date4 = document.getElementById("date4").value;
    bool4=true;
    //controllo parti vuote form partita 4
    with(document.partiteform4) {

        if(sq7.value=="") {
            alert("Errore[4]: compilare il campo HOME");
            sq7.focus();
            bool4 = false;
        }
        if(sq8.value=="") {
            alert("Errore[4]: compilare il campo GUEST");
            sq8.focus();
            bool4 = false;
        }
        if(date4.value=="") {
            alert("Errore[4]: compilare il campo DATE");
            date4.focus();
            bool4 = false;
        }
    }

    sq9 = document.getElementById("sq9").value;
    sq10 = document.getElementById("sq10").value;
    date5 = document.getElementById("date5").value;
    bool5=true;
    //controllo parti vuote form partita 5
    with(document.partiteform5) {

        if(sq9.value=="") {
            alert("Errore[5]: compilare il campo Home");
            sq9.focus();
            bool5 = false;
        }
        if(sq10.value=="") {
            alert("Errore[5]: compilare il campo GUEST");
            sq10.focus();
            bool5 = false;
        }
        if(date5.value=="") {
            alert("Errore[5]: compilare il campo DATE");
            date5.focus();
            bool5 = false;
        }
    }
    //se tutti i campi sono stati inseriti invia le chiamte alla funzione insertPartita
    if(bool1&&bool2&&bool3&&bool4&&bool5){
        insertPartita(sq1,sq2,date1,1);
        insertPartita(sq3,sq4,date2,2);
        insertPartita(sq5,sq6,date3,3);
        insertPartita(sq7,sq8,date4,4);
        insertPartita(sq9,sq10,date5,5);
        alert("Controllo effettuato con successo. I moduli sono stati inviati.");
        loadPartite();
    }else{
        alert("Something went wrong.");
    }


}

//chiamta alla pagina partite in post per inserire una singola partita
function insertPartita(sq1,sq2,date,num)
{
    console.log(sq1,sq2,date);

    //body per chiamata post
    fetch('api/v2/addPartite/partite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( 
            {   "sq1": sq1,
                "sq2": sq2,
                "esito": "X",
                "date": date,
                "num": num
            } ),
        })
    .then((resp) => {
        console.log(resp);
        //loadPartite();
        return;
    })
    .catch( error => console.error(error) ); // If there is any error you will catch them here
};

//carico le partite disponibile nella pagina index.html
function loadPartite() {

    const ul = document.getElementById('match'); // Get the list where we will place our authors

    ul.innerHTML = '';

    fetch('api/v2/addPartite/partite')
    .then((resp) => resp.json()) // Transform the data into json
    .then(function(data) { // Here you get the data to modify as you please 

        return data.map(function(partite) { // Map through the results and for each run the code below
            //stampo le partite
            let li = document.createElement('li');
            let span = document.createElement('span');
            span.innerHTML = `${partite.squadra1[0].name} vs ${partite.squadra2[0].name}`;
            span.innerHTML += ` at ${partite.date}`
            
            // Append all our elements
            li.appendChild(span);
            ul.appendChild(li);
        })
    })
    .catch( error => console.error(error) );// If there is any error you will catch them here
    
}

loadPartite();
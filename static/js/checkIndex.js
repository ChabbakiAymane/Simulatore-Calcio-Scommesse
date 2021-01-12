async function caricaPartiteDisponibili(){
    ul = document.getElementById('partiteDisponibili');
    await fetch('/api/v2/home/search_p')
    .then((resp) => resp.json())
    .then(async function (data) {
        tmp = data.map(async function (partite) {
            var match = `${partite.squadre1[0].name} vs ${partite.squadre2[0].name}`;
            var data_lontana;
            var dP;

            await fetch('/api/v2/home/search5_2')
            .then((resp) => resp.json())
            .then(function (data) {
                data_lontana = new Date(data.date).getTime();
            })
            .then(async function(dataPartita){
                await fetch('/api/v2/home/search5')
                .then((resp) => resp.json()) // Trasformo i dati in Json
                .then(function (data) {
                    //Creazione timer e seleziono la data del countdown
                    var countDownDate = new Date(data).getTime();

                    var li = document.createElement('li');
                    li.className = "list-group-item d-flex justify-content-between align-items-center column justify-content-center border rounded-pill";
                    li.innerHTML = match;
                    
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
                        li.appendChild(span);
                        ul.appendChild(li);   
                    }

                    // Aggiorna il count down ogni secondo
                    var x = setInterval(function () {
                        var now = new Date().getTime(); // Prendo il giorno di oggi e faccio la differenza
                        var distance = countDownDate - now;
                        var distance2 = dataPartita - now;

                        // Sistemo la data per giorni, ore, minuti e secondi
                        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                        if(distance > 0){
                            if(hours < 10) hours = "0" + hours;
                            if(minutes < 10) minutes = "0" + minutes;
                            if(seconds < 10) seconds = "0" + seconds;
                            
                            dP = days + " GIORNI | " + hours + ":" + minutes + ":" + seconds;

                            // Se il count down finisce scrivo tempo scaduto
                            if (distance < 0 && distance2 > 0) {
                                //Partite si stanno giocando
                                dP = 0;
                            }
                            if (distance < 0 && distance2 < 0) {
                                //Partite terminate, attendi admin
                                dP = -1;
                            }

                            var count = document.getElementById('countdown');
                            count.innerHTML = "<h4>Tempo rimasto per fare pronostici: <span style='color:red'>" + dP + "</span></h4>";
                            count.className = "list-group-item d-flex justify-content-between align-items-center column justify-content-center border rounded-pill";
                        }else{
                            var count = document.getElementById('countdown');
                            count.innerHTML = "<h4><span style='color:red'>LE PARTITE SI STANNO GIOCANDO</span></h4>";
                            count.className = "list-group-item d-flex justify-content-between align-items-center column justify-content-center border rounded-pill";
                            return;
                        }            
                    }, 1000)  
                })
            });
        })
    }).catch(error => console.error(error));
}
caricaPartiteDisponibili();
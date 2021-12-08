function rechercherTitre(entredTitle) {
    $("#infosTitle").hide();
    $("#spinner").show();
    //var entredTitle = document.getElementById("title").value;

    var searchedTitle = entredTitle.replace(/ /g,"_"); // turn " " to "_"

    var contenu_requete = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX : <http://dbpedia.org/resource/>
    PREFIX dbpedia2: <http://dbpedia.org/property/>
    PREFIX dbpedia: <http://dbpedia.org/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

    SELECT ?s, ?title, ?artistName, ?cover WHERE {
    ?s a dbo:Song;
    rdfs:label ?title;
    dbo:artist ?artist;
    dbp:cover ?cover.

    ?artist rdfs:label ?artistName.

    FILTER(
    regex(?s,"(?i)`+ searchedTitle +`") && 
    langMatches(lang(?title),"EN") && 
    langMatches(lang(?artistName),"EN")
    )
    }
    LIMIT 25`

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            $("#resultats").show();
            $("#spinner").hide();
            afficherResultats(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// Affichage des résultats dans un tableau
function afficherResultats(data){
    // Tableau pour mémoriser l'ordre des variables ; sans doute pas nécessaire
    // pour vos applications, c'est juste pour la démo sous forme de tableau
    var index = [];
    var urlRessource = "http://google.com/";
    var contenuTableau = "<tr>";

    data.head.vars.forEach((v, i) => {
      if(i!=0){
        contenuTableau += "<th>" + v + "</th>";
      }
      index.push(v);
    });

    data.results.bindings.forEach(r => {
      var isPhotoLoaded=false;

      contenuTableau += "<tr>";
        urlRessource =  r.s.value;
        // contenuTableau += "<td><a href="+ urlRessource +">" + r.title.value + "</a></td>";
        contenuTableau += "<td><a href=# onclick=infosTitle('"+ urlRessource +"')>" + r.title.value + "</a></td>";
        contenuTableau += "<td><a href="+ urlRessource +">" + r.artistName.value + "</a></td>";
        var rightCover = r.cover.value.replace(/ /g,"_"); // turn " " to "_"


        contenuTableau += '<td><img src="http://en.wikipedia.org/wiki/Special:FilePath/'+ rightCover + '" width="200" alt="'+ r.cover.value +'">';
      contenuTableau += "</tr>";
    });


    contenuTableau += "</tr>";

    document.getElementById("resultats").innerHTML = contenuTableau;
}
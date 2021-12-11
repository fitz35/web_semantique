function rechercherTitre(entredTitle) {
    $("#infosTitle").hide();
    $("#spinner").show();
    $("#resultats").hide();

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

  SELECT ?s, ?title, (GROUP_CONCAT(Distinct ?artistName; SEPARATOR=", ") AS ?feat) , (GROUP_CONCAT(Distinct ?cover; SEPARATOR=", ") AS ?covers) 
  WHERE {
  ?s a dbo:Song;
  rdfs:label ?title;
  dbo:artist ?artist;
  dbp:cover ?cover.

  ?artist rdfs:label ?artistName.

  FILTER(
  regex(?s,"(?i)`+searchedTitle +`") && 
  langMatches(lang(?title),"EN") && 
  langMatches(lang(?artistName),"EN") && 
  langMatches(lang(?cover),"EN")
  )
}LIMIT 25`

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
            //console.log('on est la')
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

// Affichage des résultats dans un tableau
function afficherResultats(data)
{
    // Tableau pour mémoriser l'ordre des variables ; sans doute pas nécessaire
    // pour vos applications, c'est juste pour la démo sous forme de tableau
    var index = [];

    var urlRessource = "http://google.com/";
    var contenuTableau = "<div id='containerTitle'>";
    var idImg = 0;

    var compteur=0;

    data.results.bindings.forEach(r => {
        compteur++;
    });
    document.getElementById("nbResultatsTitle").innerHTML = "Résultats ("+compteur+") :";
    var path = window.location.pathname;
    var page = path.replace("index.html","");
    var compteur=0;
    contenuTableau += "<tr><br>";

    data.results.bindings.forEach(r => {
        if(compteur%6==0){
            contenuTableau += "<tr>";
        }
        compteur++;
        contenuTableau += "<td>";
        contenuTableau += "<td class='element'>";

        //contenuTableau += "<div class='searchCard'>";
        urlRessource =  r.s.value;


        var rightCover = r.covers.value.replace(/ /g,"_"); // turn " " to "_"
        var rightTitle = r.s.value.replace(/ /g,"_"); // turn " " to "_"
        var path = 'http://en.wikipedia.org/wiki/Special:FilePath/'+ rightCover;
        var defaultPath = 'https://ae01.alicdn.com/kf/HTB1BuhPdL1H3KVjSZFHq6zKppXar/Record-Decal-Music-Note-Vinyl-Wall-Decals-Album-Stickers-Bedroom-Home-Decoration-Retro-Art-Murals-Living.jpg_Q90.jpg_.webp';

        //contenuTableau += '<object class="element" data="'+path+'" type="image/png">  <img class="element" src="'+defaultPath+'" width="200" height="250" alt=" "> </object>';
        //contenuTableau += '<div id='+idImg+'> <img class="element" src="'+path + '" width="200" height="250" alt=" "></div>';
        contenuTableau += '<object class="element" data="'+path+'" type="image/png" width="200" height="200">  <img class="element" src="'+defaultPath+'" width="200" height="200" alt=" "> </object>';
        contenuTableau += "<br>";
        contenuTableau += "<div><a href="+"file://"+page + "html/titres/titres_on_click.html?q="+ rightTitle+">" +r.title.value+ "</a></div>";
        contenuTableau += "<div><a href="+"file://"+page + "html/artistes/artistes.html?name="+ r.feat.value+">" +r.feat.value+ "</a></div>";

        //contenuTableau += '<div id='+idImg+'> <img class="element" src="'+defaultPath + '" width="200" height="250" alt=" "></div>';
        //contenuTableau += "<br><br><br>";

        contenuTableau += "</div></td>";
        idImg=idImg+1;
        if(compteur%6==0){
            contenuTableau += "</tr>";
        }

    });
    contenuTableau += "</tr>";
    contenuTableau += "</div>";
    document.getElementById("resultats").innerHTML = contenuTableau;

}

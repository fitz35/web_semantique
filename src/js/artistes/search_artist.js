function rechercherArtist(entredTitle) {
    //$("#infosTitle").hide();
    //$("#spinner").show();
    //var entredTitle = document.getElementById("title").value;

  var searchedArtist = entredTitle.replace(/ /g,"_"); // turn " " to "_"

  var contenu_requete = `
     PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
     PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
     PREFIX foaf: <http://xmlns.com/foaf/0.1/>
     PREFIX dc: <http://purl.org/dc/elements/1.1/>
     PREFIX : <http://dbpedia.org/resource/>
     PREFIX dbpedia2: <http://dbpedia.org/property/>
     PREFIX dbpedia: <http://dbpedia.org/>
     PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
     \n
     SELECT ?a ?name ?image WHERE {
        ?a dbo:abstract ?abstract.
        ?a  dbp:name ?name .
        ?a  a dbo:Person .
        OPTIONAL
        {
        ?a dbo:thumbnail ?image.
        }
        FILTER(regex ( ?name , "(?i)`+searchedArtist +`" ) && langMatches( lang( ?abstract ) ,"EN"))
        }`

  // Encodage de l'URL à transmettre à DBPedia
  var url_base = "http://dbpedia.org/sparql";
  var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";
  console.log(searchedArtist);
  // Requête HTTP et affichage des résultats
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var results = JSON.parse(this.responseText);
        afficherResultatsArtiste(results);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

// Affichage des résultats dans un tableau
function afficherResultatsArtiste(data)
{
  // Tableau pour mémoriser l'ordre des variables ; sans doute pas nécessaire
  // pour vos applications, c'est juste pour la démo sous forme de tableau
  var index = [];

  var urlRessource = "http://google.com/";
  var contenuTableau = "<div id='containerTitle'>";
  var idImg = 0;

  //Get URI
  var path = window.location.pathname;
  var page = path.replace("index.html","");
  var compteur=0;

  data.results.bindings.forEach(r => {
    compteur++;
  });
  document.getElementById("nbResultats").innerHTML = "Résultats ("+compteur+") :";
  //document.getElementById("nbResultats").innerHTML = "</br>";


  var compteur=0;
  contenuTableau += "<tr>";
  data.results.bindings.forEach(r => {
    compteur++;
    if(compteur%6==0){
      contenuTableau += "<tr>";
    }
    var rightCover = r.a.value.replace("http://dbpedia.org/resource/",""); // turn " " to "_"
    var newRightCover = r.name.value;

    contenuTableau += "<td>";
    contenuTableau += "<td class='element'>";
      urlRessource =  r.name.value;

      if(r.name.value.includes("resource")){
        newRightCover = rightCover.replace("_"," ");
      }
    var path;
    if(r.image!=undefined) {
      path = r.image.value;
    }else{
      //Image par défaut
      path="../img/imageNotFoundArtist.png";
    }
      //var path = 'http://en.wikipedia.org/wiki/Special:FilePath/'+ rightCover;
      contenuTableau += '<div id='+idImg+'> <img  src="'+path + '" width="200" height="250" alt=" "></div>';
      contenuTableau += "<div><a href="+"file://"+page + "html/artistes/artistes.html?name="+ rightCover+">" +newRightCover+ "</a></div>";
      //contenuTableau += "<div><a href=# onclick=infosTitle(\""+ urlRessource +"\")>" + r.feat.value + "</a></div>";
      idImg=idImg+1;

    contenuTableau += "</div></td>";
    if(compteur%6==0){
      contenuTableau += "</tr>";
    }
  });
  contenuTableau += "</tr>";
  //console.log(compteur);

  contenuTableau += "</div>";

  document.getElementById("resultatsArtist").innerHTML = contenuTableau;

}
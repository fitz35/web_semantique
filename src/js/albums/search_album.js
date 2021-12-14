function rechercherAlbum(entredAlbum) {
  $("#nbResultatsAlbum").hide();
  $("#infosAlbum").hide();
  $("#spinner").show();
  $("#resultatsAlbum").hide();

  var searchedAlbum = entredAlbum.replace(/ /g,"_"); // turn " " to "_"

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
      SELECT ?album ?name (max(?sales) as ?maxsales) ?id ?image WHERE {
      ?album a dbo:Album; dbp:name ?name; dbp:salesamount ?sales; dbo:wikiPageID ?id; dbp:cover ?image.
      filter regex(?name, "(?i).*`+searchedAlbum+`.*")
      }
      group by ?name ?album ?maxsales ?id ?image
      order by desc(?maxsales)
      limit 20`

  // Encodage de l'URL à transmettre à DBPedia
  var url_base = "http://dbpedia.org/sparql";
  var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";
  console.log(searchedAlbum);
  // Requête HTTP et affichage des résultats
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var results = JSON.parse(this.responseText);
        $("#nbResultatsAlbum").show();
        $("#infosAlbum").show();
        $("#spinner").hide();
        $("#resultatsAlbum").show();
        afficherResultatsAlbum(results, entredAlbum);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

// Affichage des résultats dans un tableau
function afficherResultatsAlbum(data, entredAlbum)
{

  var urlRessource = "http://google.com/";
  var contenuTableau = "<div id='containerTitle'>";

  var compteur=0;
  data.results.bindings.forEach(r => {
    compteur++;
  });
  if(compteur==0) {
    document.getElementById("nbResultatsAlbum").innerHTML = "No result found for: "+entredAlbum;
    $("#infosAlbum").hide();
    $("#resultatsAlbum").hide();
  }else{
    document.getElementById("nbResultatsAlbum").innerHTML = "Results (" + compteur + ") :";
  }
  $("#nbResultatsTitle").hide();
  $("#nbResultats").hide();

  //Get URI
  var path = window.location.pathname;
  var page = path.replace("index.html","");


  compteur=0;
  contenuTableau += "<tr><br><br>";
  data.results.bindings.forEach(r => {
    if(compteur%5==0){
      contenuTableau += "<tr>";
    }
    compteur++;
    contenuTableau += "<td>";
    contenuTableau += "<td class='element'>";

    urlRessource =  r.name.value;
    var rightCover = r.name.value.replace(/ /g,"_"); // turn " " to "_"
    var newRightCover = r.name.value;
    var idImg = 0;
    var pathImage;


    rightCover = r.album.value.replace("http://dbpedia.org/resource/","")
    newRightCover = rightCover.replaceAll("_"," ");

    if(r.image!=undefined) {
      pathImage = 'http://en.wikipedia.org/wiki/Special:FilePath/'+ r.image.value;
    }else{
      //Image par défaut
      pathImage="../img/defaultAlbum.jpg";
    }
    console.log(newRightCover)

    cover = "<object data='";
    cover += pathImage + "' type='image/png' width='200' height='250' alt=' '><img src='../img/defaultAlbum.jpg' width='200' height='250' alt=' '></object>";
    contenuTableau += "<br>";
    contenuTableau += '<div id='+idImg+'> ' + cover + '</div>';
    contenuTableau += "<br>";
    contenuTableau += "<div><a href="+"file://"+page + "html/albums/albums.html?name="+ rightCover+">" +newRightCover+ "</a></div>";
    idImg=idImg+1;

    contenuTableau += "</div></td>";
    if(compteur%5==0){
      contenuTableau += "</tr>";
    }
  });
  contenuTableau += "</tr></div>";
  document.getElementById("resultatsAlbum").innerHTML = contenuTableau;

}


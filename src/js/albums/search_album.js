function rechercherAlbum(entredAlbum) {
    //$("#infosTitle").hide();
    //$("#spinner").show();
    //var entredTitle = document.getElementById("title").value;

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
      SELECT ?album ?name (max(?sales) as ?maxsales) ?id WHERE {
      ?album a dbo:Album; dbp:name ?name; dbp:salesamount ?sales; dbo:wikiPageID ?id.
      filter regex(?name, "(?i)`+searchedAlbum +`")
      }
      group by ?name ?album ?maxsales ?id
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
        console.log(results);
        afficherResultatsAlbum(results);
      }
  };
  xmlhttp.open("GET", url, true);
  xmlhttp.send();
}

// Affichage des résultats dans un tableau
function afficherResultatsAlbum(data)
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

  compteur=0;
  data.results.bindings.forEach(r => {
    compteur++;
    if(compteur%6==0){
      contenuTableau += "<tr>";
    }
    var rightCover = r.name.value.replace(/ /g,"_"); // turn " " to "_"
    var newRightCover = r.name.value;

    contenuTableau += "<td>";
    contenuTableau += "<td class='element'>";
      urlRessource =  r.name.value;

      if(r.name.value.includes("resource")){
        rightCover = (r.name.value.replace("http://dbpedia.org/resource/",""))
        newRightCover = rightCover.replace("_"," ");
      }
      //var rightCover = r.name.value.replace(/ /g,"_"); // turn " " to "_"

    var pathImage;
    if(r.image!=undefined) {
      pathImage = 'http://en.wikipedia.org/wiki/Special:FilePath/'+ r;
    }else{
      //Image par défaut
      pathImage="../img/defaultAlbum.jpg";
    }
      var defaultPath = 'https://ae01.alicdn.com/kf/HTB1BuhPdL1H3KVjSZFHq6zKppXar/Record-Decal-Music-Note-Vinyl-Wall-Decals-Album-Stickers-Bedroom-Home-Decoration-Retro-Art-Murals-Living.jpg_Q90.jpg_.webp';
      contenuTableau += '<div id='+idImg+'> <img  src="'+pathImage + '" width="200" height="200" alt=" " ></div>';
      contenuTableau += "<div><a href="+"file://"+page + "html/albums/albums.html?name="+ rightCover+">" +newRightCover+ "</a></div>";
      //contenuTableau += "<div><a href=# onclick=infosTitle(\""+ urlRessource +"\")>" + r.feat.value + "</a></div>";
      idImg=idImg+1;
    contenuTableau += "</div></td>";
    if(compteur%6==0){
      contenuTableau += "</tr>";
    }

  });

  contenuTableau += "</tr>";

  contenuTableau += "</div>";

  document.getElementById("resultatsAlbum").innerHTML = contenuTableau;

}


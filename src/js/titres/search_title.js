function rechercherTitre(entredTitle) {
    $("#infosTitle").hide();
    $("#spinner").show();
    $("#resultats").hide();

  var entredTitle = document.getElementById("title").value;

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

  data.results.bindings.forEach(r => {
    contenuTableau += "<div class='element'>";
      var urlRessource =  r.s.value;

      var rightCover = r.covers.value.replace(/ /g,"_"); // turn " " to "_"
      var path = 'http://en.wikipedia.org/wiki/Special:FilePath/'+ rightCover; 

      var defaultPath = 'https://ae01.alicdn.com/kf/HTB1BuhPdL1H3KVjSZFHq6zKppXar/Record-Decal-Music-Note-Vinyl-Wall-Decals-Album-Stickers-Bedroom-Home-Decoration-Retro-Art-Murals-Living.jpg_Q90.jpg_.webp'; 
      contenuTableau += "<div id='"+idImg+"'> <img  src=\""+path + "\" width='200' alt='' ></div>";

      contenuTableau += "<div><a href=# onclick=infosTitle(\""+ urlRessource +"\",\""+path+"\")>" + r.title.value + "</a></div>";
      contenuTableau += "<div><a href=# onclick=infosTitle(\""+ urlRessource +"\",\""+path+"\")>" + r.feat.value + "</a></div>";
      idImg=idImg+1;
    contenuTableau += "</div>";
  });


  contenuTableau += "</div>";

  document.getElementById("resultats").innerHTML = contenuTableau;

}
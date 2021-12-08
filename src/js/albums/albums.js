//Global variables
var queryHeader = `PREFIX owl: <http://www.w3.org/2002/07/owl#>
PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
PREFIX foaf: <http://xmlns.com/foaf/0.1/>
PREFIX dc: <http://purl.org/dc/elements/1.1/>
PREFIX : <http://dbpedia.org/resource/>
PREFIX dbpedia2: <http://dbpedia.org/property/>
PREFIX dbpedia: <http://dbpedia.org/>
PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

`
//Appel de toutes les fonctions de recherche
function appel() {
  var albumId = window.location.search.substring(1);
  console.log(albumId)
  rechercherNom(albumId);
  rechercherDescription(albumId);
  rechercherArtiste(albumId);
  rechercherDateSortie(albumId);
  rechercherGenre(albumId);
  rechercherImage(albumId);
  rechercherProducteur(albumId);
  rechercherVentes(albumId);
  rechercherLabel(albumId);
  rechercherDuree(albumId);
  rechercherTitres(albumId);
  rechercherPrix(albumId);
}

function clean(str){
    str = str.replaceAll("*","<br>");
    str = str.replace("http://dbpedia.org/resource/","");
    str = str.replaceAll("_"," ");
    str = str.replaceAll("%22",'"');
    return str;
}
//
//
//Recuperer le nom de l album
//
function rechercherNom(idParam) {
    var contenu_requete = queryHeader + 
    `SELECT ?name WHERE {
    ?album dbp:name ?name; dbo:wikiPageID ?id.
    filter(?id = idParam)
    }
    limit 1`;
    contenu_requete = contenu_requete.replace("idParam", idParam);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherResultatsName(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  // Affichage des résultats dans un tableau
  function afficherResultatsName(data)
  {
    var name;
    data.results.bindings.forEach(r => {
      name = r.name.value;
    });

    document.getElementById("name").innerHTML = name;
  }

//
//
//Recuperer la description de l album
//
function rechercherDescription(idParam) {
    var contenu_requete = queryHeader + 
    `SELECT ?desc WHERE {
    ?album dbo:abstract ?desc; dbo:wikiPageID ?id.
    filter(?id = idParam && langMatches(lang(?desc),"EN"))
    }
    limit 1`;
    contenu_requete = contenu_requete.replace("idParam", idParam);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherResultatsDescription(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  // Affichage des résultats dans un tableau
  function afficherResultatsDescription(data)
  {
    var desc;
    data.results.bindings.forEach(r => {
      desc = r.desc.value;
    });

    document.getElementById("description").innerHTML = desc;
  }
//
//
//Recuperer le nom de l artiste de l album
//
function rechercherArtiste(idParam) {
    var contenu_requete = queryHeader + 
    `SELECT ?artist WHERE {
    ?album dbp:artist ?artist; dbo:wikiPageID ?id.
    filter(?id = idParam && langMatches(lang(?artist),"EN"))
    }
    limit 1`;
    contenu_requete = contenu_requete.replace("idParam", idParam);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

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
    var artist;
    data.results.bindings.forEach(r => {
      artist = r.artist.value;
    });

    document.getElementById("artist").innerHTML = artist;
  }
//
//
//Recuperer la de sortie de l album
//
function rechercherDateSortie(idParam) {
    var contenu_requete = queryHeader + 
    `SELECT ?released WHERE {
    ?album dbp:released ?released; dbo:wikiPageID ?id.
    filter(?id = idParam)
    }
    limit 1`;
    contenu_requete = contenu_requete.replace("idParam", idParam);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherResultatsDateSortie(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  // Affichage des résultats dans un tableau
  function afficherResultatsDateSortie(data)
  {
    var released;
    data.results.bindings.forEach(r => {
      released = r.released.value;
    });
    console.log("RELEASED");

    document.getElementById("released").innerHTML = released;
  }
//
//
//Recuperer l image de l album
//
function rechercherImage(idParam) {
    var contenu_requete = queryHeader + 
    `SELECT ?cover WHERE {
    ?album dbp:cover ?cover; dbo:wikiPageID ?id.
    filter(?id = idParam)
    }
    limit 1 `;
    contenu_requete = contenu_requete.replace("idParam", idParam);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherResultatsImage(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  // Affichage des résultats dans un tableau
  function afficherResultatsImage(data)
  {
    var cover;
    var link;
    link = "http://commons.wikimedia.org/wiki/Special:FilePath/";
    data.results.bindings.forEach(r => {
      link += r.cover.value;
    });
    link+= "?width=300"
    cover = "<img src='";
    cover += link + "'>";
    console.log("COVER");

    document.getElementById("cover").innerHTML = cover;
  }

//
//
//Recuperer le producteur de l album
//
function rechercherProducteur(idParam) {
    var contenu_requete = queryHeader + 
    `SELECT ?producer WHERE {
    ?album a dbo:Album; dbo:wikiPageID ?id; dbp:producer ?producer.
    FILTER(?id = idParam)
    }`;
    contenu_requete = contenu_requete.replace("idParam", idParam);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherResultatsProducteur(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  // Affichage des résultats dans un tableau
  function afficherResultatsProducteur(data)
  {
    var producer;
    data.results.bindings.forEach(r => {
      producer = r.producer.value;
    });
    
    producer = clean(producer);
    document.getElementById("producer").innerHTML = producer;
  }
//
//
//Recuperer les ventes de l album
//
function rechercherVentes(idParam) {
    var contenu_requete = queryHeader + 
    `SELECT (max(?salesamount) as ?sales) WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:salesamount ?salesamount.
    FILTER(?id = idParam)
    }
    group by ?name ?album ?sales`;
    contenu_requete = contenu_requete.replace("idParam", idParam);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherResultatsVentes(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  // Affichage des résultats dans un tableau
  function afficherResultatsVentes(data)
  {
    var sales;
    data.results.bindings.forEach(r => {
      sales = r.sales.value;
    });

    document.getElementById("sales").innerHTML = sales;
  }
//
//
//Recuperer le label de l album
//
function rechercherLabel(idParam) {
    var contenu_requete = queryHeader + 
    `SELECT ?label WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:label ?label.
    FILTER(?id = idParam)
    }`;
    contenu_requete = contenu_requete.replace("idParam", idParam);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherResultatsLabel(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  // Affichage des résultats dans un tableau
  function afficherResultatsLabel(data)
  {
    var label;
    data.results.bindings.forEach(r => {
      label = r.label.value;
    });

    label = clean(label);
    document.getElementById("label").innerHTML = label;
  }
//
//
//Recuperer le genre de l album
//
function rechercherGenre(idParam) {
    var contenu_requete = queryHeader + 
    `SELECT ?genre WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:genre ?genre.
    FILTER(?id = idParam &&  langMatches (lang(?genre) , "EN"))
    }`;
    contenu_requete = contenu_requete.replace("idParam", idParam);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherResultatsGenre(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  // Affichage des résultats dans un tableau
  function afficherResultatsGenre(data)
  {
    var genre;
    data.results.bindings.forEach(r => {
      genre = r.genre.value;
    });

    genre = clean(genre);
    document.getElementById("genre").innerHTML = genre;
  }
//
//
//Recuperer la duree de l album
//
function rechercherDuree(idParam) {
    var contenu_requete = queryHeader + 
    `SELECT (max(?length) as ?totallength) WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:totalLength ?length.
    FILTER(?id = idParam)
    }
    group by ?name ?album ?totallength`;
    contenu_requete = contenu_requete.replace("idParam", idParam);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherResultatsDuree(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  // Affichage des résultats dans un tableau
  function afficherResultatsDuree(data)
  {
    var totallength;
    data.results.bindings.forEach(r => {
      totallength = r.totallength.value;
    });

    document.getElementById("totallength").innerHTML = totallength;
  }
//
//
//Recuperer les titres de l album 
//
function rechercherTitres(idParam) {
    var contenu_requete = queryHeader + 
    `SELECT ?Songtitle WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:title ?Songtitle.
    FILTER(?id = idParam)
    }`;
    contenu_requete = contenu_requete.replace("idParam", idParam);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherResultatsTitres(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  // Affichage des résultats dans un tableau
  function afficherResultatsTitres(data)
  {
    var listeTitres;
    listeTitres = "<ul>"
    data.results.bindings.forEach(r => {
        var title = r.Songtitle.value;
        title = clean(title);
        listeTitres += "<li>" + title + "</li>";
    });
      
    listeTitres += "</ul>"
    document.getElementById("titres").innerHTML = listeTitres;
  }

//
//
//Recuperer les prix de l album 
//
function rechercherPrix(idParam) {
    var contenu_requete = queryHeader + 
    `SELECT ?awards WHERE {
    ?album a dbo:Album; dbp:award ?awards; dbo:wikiPageID ?id.
    FILTER(?id = idParam &&  langMatches (lang(?awards) , "EN"))
    }`;
    contenu_requete = contenu_requete.replace("idParam", idParam);
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherResultatsPrix(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
  }

  // Affichage des résultats dans un tableau
  function afficherResultatsPrix(data)
  {
    var listePrix;
    listePrix = "<ul>"
    data.results.bindings.forEach(r => {
      listePrix += "<li>" + r.awards.value + "</li>";
    });
      
    listePrix += "</ul>"
    document.getElementById("awards").innerHTML = listePrix;
  }
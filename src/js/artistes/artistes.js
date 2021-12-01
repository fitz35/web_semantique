function getListArtists(search){

}

function getArtist(name){
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
        \n
        SELECT ?name ?birthDay ?birthName ?titleSing WHERE {
            ?personne dbp:name ?name;
                dbo:birthName ?birthName;
                dbo:birthDate ?birthDay.

            ?titleSing  dbo:artist ?personne.

            FILTER(regex(?name, "^(${name})$"))
        }`;

    const url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";
    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            displayResult(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function displayResult(data){
    console.log(data.results.bindings);
    var listSong = "<ul>";
    data.results.bindings.forEach((element, index, array) => {
        document.getElementById("name").innerHTML = element.name.value;
        document.getElementById("birthDay").innerHTML = element.birthDay.value;
        document.getElementById("birthName").innerHTML = element.birthName.value;

        if (element.titleSing.type === "uri")
        {
            console.log("test");
          contenuTableau += "<li><a href='" + element.titleSing.value + "' target='_blank'>" + element.titleSing.value + "</a></li>";
        }
        else {
          contenuTableau += "<li>" + element.titleSing.value + "</li>";
        }
    });
    listSong += "</ul>";

    document.getElementById("titleSing").innerHTML = listSong;
}
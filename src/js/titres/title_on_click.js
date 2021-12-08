function getRessource(uri){
    indexSlash=uri.lastIndexOf("/");
    ressource=uri.substring(indexSlash+1);
    ressource=ressource.replace('(','\\(');
    ressource=ressource.replace(')','\\)');
    ressource=ressource.replace('?','\\?');
    ressource=ressource.replace('!','\\!');
    ressource=ressource.replace(':','\\:');
    ressource=ressource.replace('$','\\$');
    return ressource;
}

function infosTitle(uri) {
    $("#resultats").hide();
    $("#infosTitle").show();
    document.getElementById("infosTitle").innerHTML="<div id='generalInfos'>"+
                                                        "<div id='pochetteAlbum'>"+
                                                            "<img src='https://images.ladepeche.fr/api/v1/images/view/6130fc52d286c25f4a342194/full/image.jpg?v=1' width='200' />"+  
                                                        "</div>"+
                                                        "<div>"+
                                                            "<h1 id='musicTitle'></h1>"+
                                                            "<h2 id='artistName'></h2>"+
                                                            "<h2 id='albumTitle'></h2>"+
                                                            "<p id='releaseDate'></p>"+
                                                            "<p id='genreMusical'></p>"+
                                                        "</div>"+
                                                    "</div>"+
                                                    "<div>"+
                                                        "<h4>Abstract :</h4>"+
                                                        "<p id='abstract'></p>"+
                                                    "</div>";
    ressource=getRessource(uri);
    getInfosGeneralTitle(ressource);
    getAlbum(ressource);
    getArtistAndGenre(ressource);
    getAbstract(ressource);
}

function afficherInfosTitle(data){
    var title="";
    var pochette="";
    var releaseDate="";
    data.results.bindings.forEach(r => {
        if(r.pochette && r.pochette.value!=""){
            // document.getElementById("pochette").innerHTML=r.pochette.value;
            document.getElementById("pochetteAlbum").innerHTML="<img "+ 
                                                            "src=\"https://images.ladepeche.fr/api/v1/images/view/6130fc52d286c25f4a342194/full/image.jpg?v=1\"' "+
                                                            "width='200' alt='No album photo'/>" ;
        }else{
            document.getElementById("pochetteAlbum").innerHTML="<img "+ 
                                                            "src=\"https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty.jpg\"' "+
                                                            "width='200' alt='No album photo'/>" ;
        }

        if(r.title && !title.includes(r.title.value)){
            title+=r.title.value;
        }
        if(r.releaseDate && !releaseDate.includes(r.releaseDate.value)){
            releaseDate+=r.releaseDate.value;
        }
    });

    if(releaseDate!=""){
        document.getElementById("musicTitle").innerHTML="Title : "+title;
    }else{
        document.getElementById("musicTitle").innerHTML="Title : ";
    }

    
    if(releaseDate!=""){
        document.getElementById("releaseDate").innerHTML="Release date : "+releaseDate;
    }else{
        document.getElementById("releaseDate").innerHTML="Release date : Unknown.";
    }
}

function afficherGenreMusical(data) {
    var genreMusical="";
    var artistName="";
    data.results.bindings.forEach(r => {
        if(r.genreMusical && !genreMusical.includes(r.genreMusical.value)){
            genreMusical+=r.genreMusical.value;
        } 

        if(r.artistName && !artistName.includes(r.artistName.value)){
            artistName+=r.artistName.value;
        }
    });
    if(genreMusical!=""){
        document.getElementById("genreMusical").innerHTML="Musical style : "+genreMusical;
    }else{
        document.getElementById("genreMusical").innerHTML="Musical style : Unknown";
    }

    if(artistName!=""){
        document.getElementById("artistName").innerHTML="Artist : "+artistName;
    }else{
        document.getElementById("artistName").innerHTML="Artist : Unknown";
    }
}

function afficherAbstract(data){
    var abstract="";
    data.results.bindings.forEach(r => { 
        if(r.abs && !abstract.includes(r.abs.value)){
            abstract+=r.abs.value;
        }
    });

    if(abstract!=""){
        document.getElementById("abstract").innerHTML=abstract;
    }else{
        document.getElementById("abstract").innerHTML="Nothing to say about this title.";
    }
}

function afficherAlbum(data){
    var albumTitle="";
    data.results.bindings.forEach(r => { 
        if(r.albumTitle && !albumTitle.includes(r.albumTitle.value)){
            albumTitle+=r.albumTitle.value;
        }  
    });

    if(albumTitle!=""){
        document.getElementById("albumTitle").innerHTML="Album : "+albumTitle;
    }else{
        document.getElementById("albumTitle").innerHTML="Album : Unknown";
    }
}

function getInfosGeneralTitle(ressource){
    document.getElementById("linkMoreInfos").style.visibility="visible";

    var contenu_requete = `
    PREFIX owl: <http://www.w3.org/2002/07/owl#>
    PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
    PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
    PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
    PREFIX foaf: <http://xmlns.com/foaf/0.1/>
    PREFIX dc: <http://purl.org/dc/elements/1.1/>
    PREFIX dbr: <http://dbpedia.org/resource/>
    PREFIX dbpedia2: <http://dbpedia.org/property/>
    PREFIX dbpedia: <http://dbpedia.org/>
    PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

    SELECT DISTINCT ?title,
                    ?releaseDate
    WHERE {
        ?s a dbo:Song.

        OPTIONAL {
            ?s rdfs:label ?title.
        }OPTIONAL {
            ?s foaf:name ?title.
        }OPTIONAL {
            ?s dbp:name ?title.
        }

        OPTIONAL {
            ?s dbo:releaseDate ?releaseDate.
        } OPTIONAL {
            ?s dbp:released ?releaseDate.
        }  

        FILTER(
            ?s = dbr:`+ressource+` &&
            langMatches(lang(?title),"EN")
        )
    }`;

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherInfosTitle(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getAlbum(ressource) {
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

    SELECT DISTINCT (GROUP_CONCAT(DISTINCT ?albumName;SEPARATOR=", ") AS ?albumTitle)
    WHERE {
        ?s a dbo:Song.

        OPTIONAL{
            ?s dbp:album ?album.
            ?album rdfs:label ?albumName.
        } OPTIONAL {
            ?s dbp:album ?albumName.
        }OPTIONAL {
            ?s dbo:album ?album.   
            ?album rdfs:label ?albumName.
        }OPTIONAL {
            ?s dbo:album ?albumName.
        }
        
        FILTER(
            ?s = dbr:`+ressource+` &&
            langMatches(lang(?albumName),"EN")
        )
    }`;
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherAlbum(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getAbstract(ressource) {
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

    SELECT DISTINCT ?abs
    WHERE {
        ?s a dbo:Song.

        OPTIONAL {
            ?s dbo:abstract ?abs.
        } OPTIONAL {
            ?s rdfs:comment ?abs.
        }
        
        FILTER(
            ?s = dbr:`+ressource+` &&
            langMatches(lang(?abs),"EN")
        )
    }`;
    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherAbstract(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function getArtistAndGenre(ressource) {
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

    SELECT DISTINCT (GROUP_CONCAT(DISTINCT ?genreMusic;SEPARATOR=", ") AS ?genreMusical),
                    (GROUP_CONCAT(DISTINCT ?artistN;SEPARATOR=", ") AS ?artistName)
    WHERE {
        ?s a dbo:Song.

        OPTIONAL {
            ?s dbo:genre ?genre.
            ?genre rdfs:label ?genreMusic.
        } OPTIONAL {
            ?s dbp:genre ?genre.
            ?genre rdfs:label ?genreMusic.
        }

        OPTIONAL {
            ?s dbp:artist ?artist.
            ?artist rdfs:label ?artistN.
        } OPTIONAL {
            ?s dbo:artist ?artist.
            ?artist rdfs:label ?artistN.
        }
        
        FILTER(
            ?s = dbr:`+ressource+` &&
            langMatches(lang(?genreMusic),"EN") &&
            langMatches(lang(?artistN),"EN")
        )
    }`;

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherGenreMusical(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function moreSingles (artistName)
{
    console.log(artistName);
    //console.log(document.getElementById("artistName").innerText.substring(document.getElementById("artistName").innerText.lastIndexOf(":")+1));
    var query = `
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX foaf: <http://xmlns.com/foaf/0.1/>
        PREFIX dc: <http://purl.org/dc/elements/1.1/>
        PREFIX dbr: <http://dbpedia.org/resource/>
        PREFIX dbpedia2: <http://dbpedia.org/property/>
        PREFIX dbpedia: <http://dbpedia.org/>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>

        SELECT DISTINCT ?songName
        WHERE {
            ?artistName a dbo:Band.
            ?artistName rdfs:label ?artist.
            ?artistName ^dbo:artist ?song.
            ?song dbp:name ?songName.
            FILTER(langMatches(lang(?artist),"EN") && regex(?artist, "`+artistName+`") )
        }LIMIT 20`;
    var url = "https://dbpedia.org/sparql/?query="+encodeURIComponent(query)+"&format=json";
    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherMoreSingles(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function afficherMoreSingles(data){
    var songName="";
    console.log(data);
    data.results.bindings.forEach(r => {
        if(r.songName && !songName.includes(r.songName.value)){
            songName+=r.songName.value +" | ";
        }
    });

    if(songName!=""){
        document.getElementById("moreInfos").innerHTML=songName;
    }else{
        document.getElementById("moreInfos").innerHTML="Not found";
    }
}
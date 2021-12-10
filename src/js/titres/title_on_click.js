function getRessource(uri){
    indexSlash=uri.lastIndexOf("/");
    ressource=uri.substring(indexSlash+1);
    ressource=ressource.replace('(','\\(');
    ressource=ressource.replace(')','\\)');
    ressource=ressource.replace('?','\\?');
    ressource=ressource.replace(/!/g,'\\!');
    ressource=ressource.replace(/:/g,'\\:');
    ressource=ressource.replace('$','\\$');
    ressource=ressource.replace(/,/g,'\\,');
    ressource=ressource.replace(/'/g,'\\\'');

    return ressource;
}

function handleRequest(){
    var queryString = window.location.search;
    var urlParams = new URLSearchParams(queryString);

    var ressource=urlParams.get('q');
    infosTitle(ressource,'');

}

function infosTitle(uri,urlImage) {
    ressource=getRessource(uri);
    getInfosGeneralTitle(ressource);
    getAlbum(ressource);
    getArtistAndGenre(ressource);
    getAbstract(ressource);
    getPochette(ressource);
}

function afficherInfosTitle(data){
    var title="";
    var pochette="";
    var releaseDate="";
    data.results.bindings.forEach(r => {
        if(r.title && !title.includes(r.title.value)){
            title+=r.title.value;
        }
        if(r.releaseDate && !releaseDate.includes(r.releaseDate.value)){
            releaseDate+=r.releaseDate.value;
        }
    });

    if(title!=""){
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

function afficherArtistAndGenre(data) {
    var genreMusical="";
    var artistName="";
    var artistURI="";
    data.results.bindings.forEach(r => {
        if(r.genreMusical && !genreMusical.includes(r.genreMusical.value)){
            genreMusical+=r.genreMusical.value;
        } 

        if(r.artistName && !artistName.includes(r.artistName.value)){
            artistName+=r.artistName.value;
        }
        if(r.artistURI && !artistURI.includes(r.artistURI.value)){
            artistURI+=r.artistURI.value;
        }
    });
    if(genreMusical!=""){
        document.getElementById("genreMusical").innerHTML="Musical style : "+genreMusical;
    }else{
        document.getElementById("genreMusical").innerHTML="Musical style : Unknown";
    }

    if(artistName!=""){
        if(artistURI.includes(',')){
            indexVirg=artistURI.indexOf(',');
            artistURI=artistURI.substring(0,indexVirg);
        }
        indexSlash=artistURI.lastIndexOf("/");
        artistURI=artistURI.substring(indexSlash+1);
        console.log("artistURI",artistURI);
        document.getElementById("artistName").innerHTML="Artist : <a href=\"../artistes/artistes.html?name="+artistURI+"\">"+artistName+"</a>";
        moreSingles(artistName);
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
    var albumURI="";
    data.results.bindings.forEach(r => { 
        if(r.albumTitle && !albumTitle.includes(r.albumTitle.value)){
            albumTitle+=r.albumTitle.value;
        }  
        if(r.albumURI && !albumURI.includes(r.albumURI.value)){
            albumURI+=r.albumURI.value;
        }
    });

    if(albumTitle!=""){
        if(albumURI.includes(',')){
            indexVirg=albumURI.indexOf(',');
            albumURI=albumURI.substring(0,indexVirg);
        }
        indexSlash=albumURI.lastIndexOf("/");
        albumURI=albumURI.substring(indexSlash+1);
        console.log("albumURI",albumURI);
        document.getElementById("albumTitle").innerHTML="Album : <a href=\"../albums/albums.html?name="+albumURI+"\">"+albumTitle+"</a>";
    }else{
        document.getElementById("albumTitle").innerHTML="Album : Unknown";
    }
}
function afficherPochette(data){
    var cover="";
    data.results.bindings.forEach(r => { 
        if(r.cover && !cover.includes(r.cover.value)){
            cover=r.cover.value;
        }  
    });

    // cover=data.results.bindings[0].cover.value;

    var rightCover = cover.replace(/ /g,"_"); // turn " " to "_"
    var path = 'http://en.wikipedia.org/wiki/Special:FilePath/'+ rightCover; 
    var defaultPath = 'https://ae01.alicdn.com/kf/HTB1BuhPdL1H3KVjSZFHq6zKppXar/Record-Decal-Music-Note-Vinyl-Wall-Decals-Album-Stickers-Bedroom-Home-Decoration-Retro-Art-Murals-Living.jpg_Q90.jpg_.webp'; 

    var contenuTableau = '<object class="element" data="'+path+'" type="image/png">  <img class="element" src="'+defaultPath+'" alt=" "> </object>';

    document.getElementById("pochetteAlbum").innerHTML=contenuTableau;
}


function getPochette(ressource){

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

    SELECT DISTINCT ?cover
    WHERE {
        ?s a dbo:Song;
        dbp:cover ?cover.

        FILTER(
            ?s = dbr:`+ressource+`
        )
    }
    LIMIT 1`;

    // Encodage de l'URL à transmettre à DBPedia
    var url_base = "http://dbpedia.org/sparql";
    var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";

    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            afficherPochette(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}


function getInfosGeneralTitle(ressource){
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

    SELECT DISTINCT (GROUP_CONCAT(DISTINCT ?album2;SEPARATOR=", ") AS ?albumURI), (GROUP_CONCAT(DISTINCT ?albumName;SEPARATOR=", ") AS ?albumTitle)
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
        OPTIONAL{
            ?s dbo:album ?album2.
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
                    (GROUP_CONCAT(DISTINCT ?artist;SEPARATOR=", ") AS ?artistURI), 
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
            ?s dbp:artist ?artistN.
        }OPTIONAL {
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
            afficherArtistAndGenre(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function moreSingles (artist)
{
    // artist=document.getElementById("artistName").innerText;
    // artist=artist.substring(9);
    if(artist.includes(',')){
        indexVirg=artist.indexOf(',');
        artist=artist.substring(0,indexVirg);
    }
    artist=artist.replace(/'/g,'\\\'');
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

        SELECT DISTINCT ?s AS ?song,?songName,(GROUP_CONCAT(Distinct ?pochette; SEPARATOR=", ") AS ?cover) 
        WHERE {
            ?artistName a dbo:Band.
            ?artistName rdfs:label ?artist.
            ?artistName ^dbo:artist ?s.
            ?s dbp:name ?songName;            
            dbp:cover ?pochette.
            FILTER(langMatches(lang(?artist),"EN") && regex(?artist, "`+artist+`"))
        }
        LIMIT 20`;
    var url = "https://dbpedia.org/sparql/?query="+encodeURIComponent(query)+"&format=json";
    // Requête HTTP et affichage des résultats
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var results = JSON.parse(this.responseText);
            // afficherMoreSingles(results);
            afficherResultats(results);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();

}

function afficherMoreSingles(data){
    var songName="";
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

function afficherResultats(data)
{
    // Tableau pour mémoriser l'ordre des variables ; sans doute pas nécessaire
    // pour vos applications, c'est juste pour la démo sous forme de tableau
    var index = [];

    var urlRessource = "http://google.com/";
  var contenuTableau = "<div id='containerTitle'>";

    data.results.bindings.forEach(r => {
        urlRessource =  r.song.value;

        contenuTableau += "<div class='searchCard'>";
      
        var rightCover = r.cover.value.replace(/ /g,"_"); // turn " " to "_"
        var path = 'http://en.wikipedia.org/wiki/Special:FilePath/'+ rightCover; 
        var defaultPath = 'https://ae01.alicdn.com/kf/HTB1BuhPdL1H3KVjSZFHq6zKppXar/Record-Decal-Music-Note-Vinyl-Wall-Decals-Album-Stickers-Bedroom-Home-Decoration-Retro-Art-Murals-Living.jpg_Q90.jpg_.webp'; 
           
        contenuTableau += '<object class="element" data="'+path+'" type="image/png">  <img class="element" src="'+defaultPath+'" alt=" "> </object>';
        contenuTableau += "<div><a href=\"?q="+urlRessource+"\" >"+ r.songName.value + "</a></div>";
        contenuTableau += "</div>";
    });

    contenuTableau += "</div>";
    // document.getElementById("resultats").innerHTML = contenuTableau;
    carousselItem="";
    carousselIndicators="";
    tabLength=data.results.bindings.length;
    console.log("size",tabLength);
    for(var i=0;i<tabLength;i++){
        if(i==0){
            carousselIndicators+="<button type='button' data-bs-target='#carouselSimilarTitle' "+
                            "data-bs-slide-to='0' class='active' aria-current='true' aria-label='Slide "+(i+1)+"'>"+
                            "</button>";
        }else{
            carousselIndicators+="<button type='button' data-bs-target='#carouselSimilarTitle' "+
                            "data-bs-slide-to='"+i+"' aria-label='Slide "+(i+1)+"'></button>";
        }
        if(i==tabLength-1){
            carousselIndicators+="</div>";
        }
    }
    document.getElementById("indicatorsCarousel").innerHTML=carousselIndicators;

    data.results.bindings.forEach(function(r,index){
        var urlRessource =  r.song.value;
        indexSlash=urlRessource.lastIndexOf("/");
        urlRessource=urlRessource.substring(indexSlash+1);

        var rightCover = r.cover.value.replace(/ /g,"_"); // turn " " to "_"
        var path = 'http://en.wikipedia.org/wiki/Special:FilePath/'+ rightCover; 
        var defaultPath = 'https://ae01.alicdn.com/kf/HTB1BuhPdL1H3KVjSZFHq6zKppXar/Record-Decal-Music-Note-Vinyl-Wall-Decals-Album-Stickers-Bedroom-Home-Decoration-Retro-Art-Murals-Living.jpg_Q90.jpg_.webp'; 

        if(index==0){
            carousselItem+="<div class='carousel-item active'>";
        }else{
            carousselItem+="<div class='carousel-item'>";
        }
        carousselItem += "<div class='col d-block w-100'>";
        carousselItem += '<object class="element" data="'+path+'" type="image/png">  <img class="element" src="'+defaultPath+'" alt=" "> </object>';
        carousselItem += "<div><a href=\"?q="+urlRessource+"\" >"+ r.songName.value + "</a></div>";
        carousselItem += "</div>";
        carousselItem+="</div>";

    });
    if(carousselItem!=""){
        document.getElementById("moreTitle").innerHTML = carousselItem;

    }else{
        document.getElementById("moreTitle").innerHTML="Not found";
    }


    // <div class="carousel-item active">
    //     <div class="row">
    //         <div class="col">
    //             <img src="..." class="d-block w-100" alt="coucou1">
    //         </div>
    //         <div class="col">
    //             <img src="..." class="d-block w-100" alt="coucou1">
    //         </div>
    //         <div class="col">
    //             <img src="..." class="d-block w-100" alt="coucou1">
    //         </div>
    //         <div class="col">
    //             <img src="..." class="d-block w-100" alt="coucou1">
    //         </div>
    //     </div>
    // </div>
}




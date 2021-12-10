function getListArtists(search){

};

function getArtistDetails(name){
    var contenu_requete =     
    `PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
     PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
     PREFIX foaf: <http://xmlns.com/foaf/0.1/>
     PREFIX dc: <http://purl.org/dc/elements/1.1/>
     PREFIX : <http://dbpedia.org/resource/>
     PREFIX dbpedia2: <http://dbpedia.org/property/>
     PREFIX dbpedia: <http://dbpedia.org/>
     PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
     \n
        SELECT ?abstract ?name ?dateOfBirth ?startDate ?birthName  ?job ?image ?description WHERE {
         dbr:${name} dbo:abstract ?abstract.
         dbr:${name} dbo:birthDate ?dateOfBirth.
         dbr:${name} dbo:birthName ?birthName.
         dbr:${name} dbo:activeYearsStartYear ?startDate.
         dbr:${name} dbp:name ?name.
         
         OPTIONAL
         {
            dbr:${name} gold:hypernym ?j.
             ?j rdfs:label ?job.
         }
         OPTIONAL
         {
            dbr:${name} dbo:thumbnail ?image.
            dbr:${name} dbp:caption ?description.
         }
       
         FILTER(langMatches( lang( ?abstract ) ,"EN") && langMatches( lang( ?job ) ,"EN") && langMatches( lang( ?description), "EN")   )
         }
         LIMIT 50`
         
 
     // Encodage de l'URL à transmettre à DBPedia
     var url_base = "http://dbpedia.org/sparql";
     var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";
 
     // Requête HTTP et affichage des résultats
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             var results = JSON.parse(this.responseText);
             afficherResultats(results);
         }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};


function getArtistSongs(name){
    var contenu_requete =     
    `PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
     PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
     PREFIX foaf: <http://xmlns.com/foaf/0.1/>
     PREFIX dc: <http://purl.org/dc/elements/1.1/>
     PREFIX : <http://dbpedia.org/resource/>
     PREFIX dbpedia2: <http://dbpedia.org/property/>
     PREFIX dbpedia: <http://dbpedia.org/>
     PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
     \n
     SELECT ?songName ?song WHERE {
        dbr:${name}  dbp:name ?name .
        ?song dbo:artist dbr:${name}.
        ?song gold:hypernym dbr:Song.
        ?song dbp:name ?songName.
        }
        `
       // Encodage de l'URL à transmettre à DBPedia
     var url_base = "http://dbpedia.org/sparql";
     var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";
 
     // Requête HTTP et affichage des résultats
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             var results = JSON.parse(this.responseText);
             afficherListeResultats(results);
         }
}
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};

function getArtistAlbums(name){
    var contenu_requete =     
    `PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
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
        ?album a dbo:Album.
        ?album dbp:name ?name.
        ?album dbp:salesamount ?sales.
        ?album dbo:wikiPageID ?id.
        ?album dbp:artist dbr:${name} .
        
        }
        `
       // Encodage de l'URL à transmettre à DBPedia
     var url_base = "http://dbpedia.org/sparql";
     var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";
 
     // Requête HTTP et affichage des résultats
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             var results = JSON.parse(this.responseText);
             afficherListeAlbums(results);
         }
}
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};


function getArtistAwards(name){
    var contenu_requete =     
    `PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
     PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
     PREFIX foaf: <http://xmlns.com/foaf/0.1/>
     PREFIX dc: <http://purl.org/dc/elements/1.1/>
     PREFIX : <http://dbpedia.org/resource/>
     PREFIX dbpedia2: <http://dbpedia.org/property/>
     PREFIX dbpedia: <http://dbpedia.org/>
     PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
     \n
     SELECT ?awardListName ?awardList WHERE {
        dbr:${name}  dbp:name ?name .
        dbr:${name}  dbp:awards ?awardLink.
        ?awardLink dbo:wikiPageWikiLink ?awardList.
       ?awardList foaf:name ?awardListName

        }
        `
       // Encodage de l'URL à transmettre à DBPedia
     var url_base = "http://dbpedia.org/sparql";
     var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";
 
     // Requête HTTP et affichage des résultats
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             var results = JSON.parse(this.responseText);
             afficherListeAwards(results);
         }
}
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};



function getNumberOfSongs(name){
    var contenu_requete =     
    `PREFIX xsd: <http://www.w3.org/2001/XMLSchema#>
     PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
     PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
     PREFIX foaf: <http://xmlns.com/foaf/0.1/>
     PREFIX dc: <http://purl.org/dc/elements/1.1/>
     PREFIX : <http://dbpedia.org/resource/>
     PREFIX dbpedia2: <http://dbpedia.org/property/>
     PREFIX dbpedia: <http://dbpedia.org/>
     PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
     \n
     SELECT (COUNT (?songName) AS ?total) WHERE {
        dbr:${name}  dbp:name ?name .
        ?song dbo:artist dbr:${name}.
        ?song gold:hypernym dbr:Song.
        ?song dbp:name ?songName.
        }
        `
       // Encodage de l'URL à transmettre à DBPedia
     var url_base = "http://dbpedia.org/sparql";
     var url = url_base + "?query=" + encodeURIComponent(contenu_requete) + "&format=json";
 
     // Requête HTTP et affichage des résultats
     var xmlhttp = new XMLHttpRequest();
     xmlhttp.onreadystatechange = function() {
         if (this.readyState == 4 && this.status == 200) {
             var results = JSON.parse(this.responseText);
             afficherTotal(results);
         }
}
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
};



function afficherListeResultats(data){
    console.log(data);
    data.results.bindings.forEach((v, i) => {
        
            var resultTableList=document.getElementsByClassName("titleSing");
            for(let parcours of resultTableList)
            {
                parcours.innerHTML+=
                `<li> 
                     <a href="${v.song.value}">${v.songName.value}
                     <img alt="Redirection Image" src="../../../img/redirect.png"
                     width="15" height="10">
                     </a>
                </li>`;
                
            }
        
      }
)};


function afficherListeAwards(data){
    console.log(data);
    data.results.bindings.forEach((v, i) => {
        
            var resultTableList=document.getElementsByClassName("awards");
            for(let parcours of resultTableList)
            {
               if(v.awardListName.value!= "")
               {
                parcours.innerHTML+=`<li> <a href="${v.awardList.value}">${v.awardListName.value}</a></li>`;
               }
               else
               {
                parcours.innerHTML+=`<li> <a href="${v.awardList.value}">${v.awardList.value}</a></li>`; 
               }
                
                
            }
        
      }
)};

function afficherListeAlbums(data){
    console.log(data);
    data.results.bindings.forEach((v, i) => {
        
            var resultTableList=document.getElementsByClassName("albums");
            for(let parcours of resultTableList)
            {
               if(v.name.value!= "")
               {
                parcours.innerHTML+=`<li> <a href="${v.album.value}">${v.name.value}</a></li>`;
               }
               else
               {
                parcours.innerHTML+=`<li> <a href="${v.album.value}">${v.album.value}</a></li>`; 
               }
                
                
            }
        
      }
)};



function afficherResultats(data){
    console.log(data);
    data.results.bindings.forEach((v, i) => {
        
            afficheDansToutesClasses("birthDay", v.dateOfBirth.value);

            var resutTable=document.getElementsByClassName("image");
            for(let parcours of resutTable)
            {
                if(v.image!=undefined && v.description!=null)
                {
                    parcours.innerHTML="<img src=\""+ v.image.value+ "\" alt=\""+ v.description.value +"\">";
                }
                else if(v.description!=null)
                {
                    parcours.innerHTML="<img src=\"../../../img/inconue.jpg\" alt=\""+ v.description.value +"\">";
                }else{
                    parcours.innerHTML="<img src=\"../../../img/inconue.jpg\" alt=\"photo de l'artiste\">";
                }
               
            }
            
            afficheDansToutesClasses("details", v.abstract.value);
            afficheDansToutesClasses("birthName", v.birthName.value);
            afficheDansToutesClasses("name", v.name.value);
            if (v.job != undefined)
            {
                afficheDansToutesClasses("job", v.job.value);
            }
        
      }
)};

function afficherTotal(data){
    console.log(data);
    data.results.bindings.forEach((v, i) => {
            afficheDansToutesClasses("total", v.total.value);
        }
)};

function afficheDansToutesClasses(classe, aAfficher){
    var resutTable=document.getElementsByClassName(classe);
    for(let parcours of resutTable)
    {
        parcours.innerHTML=aAfficher;
                
    }
}

   
    

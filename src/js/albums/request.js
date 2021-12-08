/*
//Requete pour chercher un album
SELECT ?album ?name (max(?sales) as ?maxsales) ?id WHERE {
?album a dbo:Album; dbp:name ?name; dbp:salesamount ?sales; dbo:wikiPageID ?id.
filter regex(?name,"(?i)black")
}
group by ?name ?album ?maxsales ?id
order by desc(?maxsales)
limit 50

//name
SELECT ?name WHERE {
?album dbp:name ?name; dbo:wikiPageID ?id.
filter(?id = PARAMID)
}
limit 1


//description
SELECT ?desc WHERE {
?album dbo:abstract ?desc; dbo:wikiPageID ?id.
filter(?id = PARAMID && langMatches(lang(?desc),"EN"))
}
limit 1

//name of artist
SELECT ?artist WHERE {
?album dbp:artist ?artist; dbo:wikiPageID ?id.
filter(?id = PARAMID && langMatches(lang(?artist),"EN"))
}
limit 1

//link of artist

//Date de sortie
SELECT ?released WHERE {
?album dbp:released ?released; dbo:wikiPageID ?id.
filter(?id = PARAMID)
}
limit 1


//Image de l album
SELECT ?cover WHERE {
?album dbp:cover ?cover; dbo:wikiPageID ?id.
filter(?id = 7615743)
}
limit 1

//Requete pour le producer
SELECT ?producer WHERE {
    ?album a dbo:Album; dbo:wikiPageID ?id; dbp:producer ?producer.
    FILTER(?id = 7615743)
    }

//Requete pour les ventes d'un album
SELECT (max(?salesamount) as ?sales) WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:salesamount ?salesamount.
    FILTER(?id = 7615743)
    }
    group by ?name ?album ?sales
    
//Requete pour le label
SELECT ?label WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:label ?label.
    FILTER(?id = 7615743)
    }

    //Requete pour Genre
SELECT ?genre WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:genre ?genre.
    FILTER(?id = 7615743 &&  langMatches (lang(?genre) , "EN"))
    }
    
    
//Requete pour la duree de l'album
SELECT (max(?length) as ?totallength) WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:totalLength ?length.
    FILTER(?id = 7615743)
    }
    group by ?name ?album ?totallength
    


//Requete pour les titres
SELECT ?Songtitle WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:title ?Songtitle.
    FILTER(?id = 7615743)
    }
    
    
//Requete pour retrouver les prix de l'album
SELECT ?awards WHERE {
    ?album a dbo:Album; dbp:award ?awards; dbo:wikiPageID ?id.
    FILTER(?id = 7615743 &&  langMatches (lang(?awards) , "EN"))
}

*/




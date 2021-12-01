//Requete pour chercher un album
SELECT ?album ?name (max(?sales) as ?maxsales) ?id WHERE {
?album a dbo:Album; dbp:name ?name; dbp:salesamount ?sales; dbo:wikiPageID ?id.
filter regex(?name,"PARAM_SEARCH")
}
group by ?name ?album ?maxsales
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
filter(?id = PARAMID)
}
limit 1


//Requete pour retrouver les prix de l'album
SELECT ?name ?album ?awards WHERE {
    ?album a dbo:Album; dbp:name ?name; dbp:award ?awards; dbo:wikiPageID ?id.
    FILTER(?id = PARAMID &&  langMatches (lang(?awards) , "EN"))
}

//Requete pour les ventes d'un album
SELECT ?name ?album (max(?salesamount) as ?sales) WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:salesamount ?salesamount.
    FILTER(?id = 196945)
    }
    group by ?name ?album ?sales

//Requete pour la duree de l'album
SELECT ?name ?album (max(?length) as ?totallength) WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:totalLength ?length.
    FILTER(?id = 196945)
    }
    group by ?name ?album ?totallength

//Requete pour le producer
SELECT ?name ?album ?producer WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:producer ?producer.
    FILTER(?id = 196945)
    }

//Requete pour le label
SELECT ?name ?album ?label WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:label ?label.
    FILTER(?id = 196945)
    }
//Requete pour Genre
SELECT ?name ?album ?genre WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:genre ?genre.
    FILTER(?id = 196945 &&  langMatches (lang(?genre) , "EN"))
    }
//Requete pour les titres
SELECT ?name ?album ?Songtitle ?SongLength WHERE {
    ?album a dbo:Album; dbp:name ?name; dbo:wikiPageID ?id; dbp:title ?Songtitle.
    FILTER(?id = 196945)
    }
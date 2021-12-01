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








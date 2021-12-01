//Requete pour chercher un album
SELECT ?album ?name (max(?sales) as ?maxsales) WHERE {
?album a dbo:Album; dbp:name ?name; dbp:salesamount ?sales.
filter regex(?name,".*(?i)black.*")
}
group by ?name ?album ?maxsales
order by desc(?maxsales)
limit 50





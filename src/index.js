function repaintResearch() {
    document.getElementById("searchbar").style.visibility="visible"; // cache
    document.getElementById("sousTitre").style.visibility="visible"; // cache
    document.getElementById("monBtn").style.visibility="visible"; // cache
    document.getElementById("album").style.visibility="visible"; // cache
    document.getElementById("albumLabel").style.visibility="visible"; // cache
    document.getElementById("artist").style.visibility="visible"; // cache
    document.getElementById("artistLabel").style.visibility="visible"; // cache
    document.getElementById("title").style.visibility="visible"; // cache
    document.getElementById("titleLabel").style.visibility="visible"; // cache

    document.getElementById("resultats").style.visibility="hidden"; // cache
    document.getElementById("infosTitle").style.visibility="hidden"; // cache

    document.getElementById("linkMoreInfos").style.visibility="hidden"; // cache
    document.getElementById("moreInfos").style.visibility="hidden"; // cache

    document.getElementById("btnSearch").style.visibility="hidden"; // cache
}

function hideSearchPage(){
    //Hide element
    document.getElementById("searchbar").style.visibility="hidden";
    document.getElementById("sousTitre").style.visibility="hidden"; // cache
    document.getElementById("monBtn").style.visibility="hidden"; // cache
    document.getElementById("album").style.visibility="hidden"; // cache
    document.getElementById("albumLabel").style.visibility="hidden"; // cache

    document.getElementById("artist").style.visibility="hidden"; // cache
    document.getElementById("artistLabel").style.visibility="hidden"; // cache

    document.getElementById("title").style.visibility="hidden"; // cache
    document.getElementById("titleLabel").style.visibility="hidden"; // cache

    document.getElementById("address").style.visibility="hidden"; // cache


    document.getElementById("btnSearch").style.visibility="visible"; // cache
    document.getElementById("resultats").style.visibility="visible"; // cache
    document.getElementById("infosTitle").style.visibility="visible"; // cache

    document.getElementById("linkMoreInfos").style.visibility="hidden"; // cache
    document.getElementById("moreInfos").style.visibility="hidden"; // cache
}

function validateResearch(){
    hideSearchPage();

    var value = search_music(); //The value in the search bar
    if(document.getElementById("artist").checked==true){
        console.log("Rechercher l'artiste : "+value);

    }
    if(document.getElementById("album").checked==true){
        console.log("Rechercher l'album : "+value);
    }
    if(document.getElementById("title").checked==true){
        console.log("Rechercher le titre : "+value);
        rechercherTitre(value);

    }
    document.getElementById("artist").checked=false;
    document.getElementById("album").checked=false;
    document.getElementById("title").checked=false;
    return document.getElementById("searchbar").value="";

}

function search_music(){
    return document.getElementById("searchbar").value;
}

function checkBox(){
    /*
    if(document.getElementById("artist").checked==true){
        document.getElementById("album").checked=false;
        document.getElementById("title").checked=false;
    }
    if(document.getElementById("album").checked==true){
        document.getElementById("artist").checked=false;
        document.getElementById("title").checked=false;
    }
    if(document.getElementById("title").checked==true){
        document.getElementById("album").checked=false;
        document.getElementById("artist").checked=false;
    }
     */
}

function repaintResearch() {
    document.body.style.backgroundImage = "url('../img/background.png')";
    document.body.style.backgroundColor = "#c9d6ee";

    document.getElementById("titre").style.visibility="hidden"; // cache

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
    document.getElementById("nbResultats").style.visibility="hidden"; // cache
    document.getElementById("nbResultatsTitle").style.visibility="hidden"; // cache

    document.getElementById("resultatsArtist").style.visibility="hidden"; // cache
    document.getElementById("resultatsAlbum").style.visibility="hidden"; // cache



    document.getElementById("linkMoreInfos").style.visibility="hidden"; // cache
    document.getElementById("moreInfos").style.visibility="hidden"; // cache

    document.getElementById("btnSearch").style.visibility="hidden"; // cache
    //window.location.reload();

}

function hideSearchPage(){
    //Hide element

    document.body.style.backgroundColor = "#c9d6ee";
    document.body.style.backgroundImage = "none";

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

    document.getElementById("nbResultats").style.visibility="visible"; // cache
    document.getElementById("nbResultatsTitle").style.visibility="visible"; // cache


    document.getElementById("btnSearch").style.visibility="visible"; // cache
    document.getElementById("resultats").style.visibility="hidden"; // cache
    document.getElementById("infosTitle").style.visibility="hidden"; // cache

    document.getElementById("resultatsArtist").style.visibility="hidden"; // cache
    document.getElementById("resultatsAlbum").style.visibility="hidden"; // cache



    document.getElementById("titre").style.visibility="visible"; // cache

    document.getElementById("linkMoreInfos").style.visibility="hidden"; // cache
    document.getElementById("moreInfos").style.visibility="hidden"; // cache
}

function validateResearch(){
    hideSearchPage();

    var value = search_music(); //The value in the search bar
    if(document.getElementById("artist").checked==true){
        console.log("Rechercher l'artiste : "+value);
        document.getElementById("resultatsArtist").style.visibility="visible"; // cache
        rechercherArtist(value);

    }
    if(document.getElementById("album").checked==true){
        console.log("Rechercher l'album : "+value);
        document.getElementById("resultatsAlbum").style.visibility="visible"; // cache
        rechercherAlbum(value);
    }
    if(document.getElementById("title").checked==true){
        console.log("Rechercher le titre : "+value);
        document.getElementById("resultats").style.visibility="visible"; // cache
        document.getElementById("infosTitle").style.visibility="visible"; // cache
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

function checkBox(obj) {
    var tvNodes = document.getElementById("trvMenu");
    var chBoxes = tvNodes.getElementsByTagName("input");
    for (var i = 0; i < chBoxes.length; i++) {
        chBoxes[i].checked = false;
    }
    obj.checked = true;
}

function handle(e){
    var boxArtist = document.getElementById("artist").checked;
    var boxAlbum = document.getElementById("album").checked;
    var boxTitle = document.getElementById("title").checked;

    if(e.key === "Enter"){
        if(document.getElementById("searchbar").value!="" &&
            (boxArtist!=false || boxAlbum!=false || boxTitle!=false)){
            validateResearch();
        }
        if(boxArtist==false && boxAlbum==false && boxTitle==false){
            console.log("Faut faire qlqch")
        }
    }
    return false;
}

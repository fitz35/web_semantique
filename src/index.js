function repaintResearch() {
    $("#address").addClass("initial");

    document.body.style.backgroundImage = "url('../img/background.png')";
    document.body.style.backgroundColor = "#c9d6ee";

    $("#titre").hide(); // cache

    $("#searchbar").show(); // cache
    $("#sousTitre").show(); // cache
    $("#monBtn").show(); // cache
    $("#album").show(); // cache
    $("#albumLabel").show(); // cache
    $("#artist").show(); // cache
    $("#artistLabel").show(); // cache
    $("#title").show(); // cache
    $("#titleLabel").show(); // cache

    $("#resultats").hide(); // cache
    $("#nbResultats").hide(); // cache
    $("#nbResultatsTitle").hide(); // cache
    $("#nbResultatsAlbum").hide(); // cache

    $("#resultatsArtist").hide(); // cache
    $("#resultatsAlbum").hide(); // cache



    $("#linkMoreInfos").hide(); // cache
    $("#moreInfos").hide(); // cache

    $("#btnSearch").hide(); // cache
    //window.location.reload();

}

function hideSearchPage(){
    //Hide element
    $("#address").removeClass("initial");

    document.body.style.backgroundColor = "#c9d6ee";
    document.body.style.backgroundImage = "none";

    $("#searchbar").hide();
    $("#sousTitre").hide(); // cache
    $("#monBtn").hide(); // cache
    $("#album").hide(); // cache
    $("#albumLabel").hide(); // cache

    $("#artist").hide(); // cache
    $("#artistLabel").hide(); // cache

    $("#title").hide(); // cache
    $("#titleLabel").hide(); // cache

    $("#nbResultats").show(); // cache
    $("#nbResultatsTitle").show(); // cache
    $("#nbResultatsAlbum").show(); // cache


    $("#btnSearch").show(); // cache
    $("#resultats").hide(); // cache

    $("#resultatsArtist").hide(); // cache
    $("#resultatsAlbum").hide(); // cache



    $("#titre").show(); // cache
}

function validateResearch(){
    

    var value = search_music(); //The value in the search bar
    if(value!=""){
        hideSearchPage();
        if(document.getElementById("artist").checked==true){
            console.log("Rechercher l'artiste : "+value);
            $("#resultatsArtist").show(); // cache
            rechercherArtist(value);

        }
        if(document.getElementById("album").checked==true){
            console.log("Rechercher l'album : "+value);
            $("#resultatsAlbum").show(); // cache
            rechercherAlbum(value);
        }
        if(document.getElementById("title").checked==true){
            console.log("Rechercher le titre : "+value);
            $("#resultats").show(); // cache
            $("#infosTitle").show(); // cache
            rechercherTitre(value);
        }
    }
        
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

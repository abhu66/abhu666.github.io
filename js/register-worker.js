 // REGISTER SERVICE WORKER
 if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/service-worker.js")
            .then(function () {
                console.log("Pendaftaran ServiceWorker berhasil");
            })
            .catch(function () {
                console.log("Pendaftaran ServiceWorker gagal");
            });
    });
} else {
    console.log("ServiceWorker belum didukung browser ini.");
}

document.addEventListener("DOMContentLoaded", function () {
   var urlParams   = new URLSearchParams(window.location.search);
   var isFromSaved = urlParams.get("saved");
   var idTim       = urlParams.get("id");
   var btnSave     = document.getElementById("save");
   var btnDelete   = document.getElementById("delete");
    if (isFromSaved) {
        // Hide fab jika dimuat dari indexed db
        btnSave.style.display = 'none';
        btnDelete.style.display = 'display';
        // ambil team lalu tampilkan
        getSavedTeamById();
        console.log("masuk sini");
    } else {
        btnSave.style.display = 'display';
        btnDelete.style.display = 'none';
        var item = getTeamById();
    }
    
    btnSave.onclick = function() {
        console.log("Tombol FAB Save di klik.");
        item.then(function(team) {
          saveForLater(team);
        });
    };
    btnDelete.onclick = function() {
        console.log("Tombol FAB Delete di klik.");
        console.log("id : "+idTim);
        deletFromDb(idTim);
    };
});
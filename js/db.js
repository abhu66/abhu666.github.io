var dbPromised = idb.open("sepakbola-db-pwa", 1, function(upgradeDb) {
    var articlesObjectStore = upgradeDb.createObjectStore("teams", {
      keyPath: "id"
    });
    articlesObjectStore.createIndex("name", "name", { unique: false });
  });

  function saveForLater(team) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(team);
        store.add(team);
        return tx.complete;
      })
      .then(function() {
        M.toast({html: 'Tim berhasil di simpan.',classes: 'rounded'})
        console.log("Tim berhasil di simpan.");
      });
  }
  
  function getAll() {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.getAll();
        })
        .then(function(teams) {
          resolve(teams);
        });
    });
  }
  
  function getById(id) {
    return new Promise(function(resolve, reject) {
      dbPromised
        .then(function(db) {
          var tx = db.transaction("teams", "readonly");
          var store = tx.objectStore("teams");
          return store.get(parseInt(id));
        })
        .then(function(team) {
          resolve(team);
        });
    });
  }

  function deletFromDb(id) {
    dbPromised.then(function(db) {
        var tx = db.transaction("teams", "readwrite");
        var store = tx.objectStore("teams");
        console.log(id);
        store.delete(parseInt(id));
        return tx.complete;
      })
      .then(function() {
        M.toast({html: 'Tim berhasil di dihapus.',classes: 'rounded'})
        console.log("Tim berhasil di dihapus.");
      });
  }
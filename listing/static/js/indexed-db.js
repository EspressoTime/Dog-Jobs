function idbInit(companyData) {
  window.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;

  if (!window.indexedDB) {
      console.log("Your browser doesn't support IndexedDB.");
  }

  var db;
  var request = window.indexedDB.open("companies", 1);

  request.onerror = function(event) {
    console.log("IndexedDB error.");
  };

  request.onupgradeneeded = function(event) {
    var db = event.target.result;
    // Create an objectStore for the database
    var objectStore = db.createObjectStore("companies", { keyPath: "company"});
    console.log('Called onupgradeneeded. Adding companyData to IndexedDB');
    objectStore.transaction.oncomplete = function(event) {
      // Store values in the newly created objectStore.
      var companyObjectStore = db.transaction("companies", "readwrite").objectStore("companies");
      companyData.forEach(function(company) {
        companyObjectStore.add(company);
      });
    };
  };

  // Access database once successfully opened
  request.onsuccess = function(event) {
    var db = event.target.result;
    console.log('onsuccess succeeded.');
    // Create new trasaction to getAll from database
    var tx = db.transaction(['companies']);
    var objectStore = tx.objectStore('companies');
    var requestAll = objectStore.getAll();

    requestAll.onerror = function(event) {
      console.log('getAll from objectStore failed.');
    };

    requestAll.onsuccess = function(event) {
      console.log('get success. requestAll.result is:');
      console.log(requestAll.result);

      requestAll.result.forEach(function(company) {
        //Add listing to page
        var all_locations = '';
        for (var i = 0; i < company.locations.length; i++) { 
          all_locations += '📍 ';
          all_locations += company.locations[i];
          all_locations += '<br />';
        }

        var listing_template = '<div class="listingcontainer w-clearfix"><section class="article-text-wrapper"><a href="' + company.url + '" class="link-block w-inline-block" target="_blank"><h2 class="thumbnail-title">' + company.company + '</h2></a><h4>' + all_locations + '<br></h4><p>' + company.description + '</p><a href="' + company.url + '"class="w-inline-block" target="_blank"><div class="article-info-text tag">Careers</div></a></section></div>'

        //$('.navbar.w-nav').after(listing_template);
        //$(listing_template).insertAfter('.navbar.w-nav');
        listing_add = document.getElementsByClassName('main-column content');
        listing_add[0].innerHTML += listing_template
      })
    };
  };
}
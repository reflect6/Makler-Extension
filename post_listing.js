let counter = 0;

document.addEventListener("DOMContentLoaded", function() {
  const submitButton = document.getElementById('submitListing');
  if (counter === 0) {
    submitButton.addEventListener('click', (event) => {
      counter = 1;
      let listingType = document.getElementById("listingType").value;
      var propertyType = document.getElementById("propertyType").value;
      var buildType = document.getElementById("buildType").value;
      var city = document.getElementById("location_select").value;
      var address = document.getElementById("address").value;
      var floor = document.getElementById("floor").value;
      var rooms = document.getElementById("rooms").value;
      var price = document.getElementById("price").value;
      var comment = document.getElementById("comment").value;
      var listing = {
        "listingType": listingType,
        "propertyType": propertyType,
        "buildType": buildType,
        "city": city,
        "address": address,
        "floor": floor,
        "rooms": rooms,
        "price": price,
        "comment": comment
      };
      // Save the listing to a database or do other operations with it here
      console.log(listing);

      // Send the information to the extension script
      chrome.runtime.sendMessage({ action: 'postListing', listing });
      window.close()
    });
  }
});
